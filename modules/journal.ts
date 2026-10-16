import { readFile, readdir } from 'node:fs/promises'
import { basename, join, relative } from 'node:path'
import { defineNuxtModule } from '@nuxt/kit'
import type { MarkdownRoot, MinimalElement, MinimalNode } from '@nuxt/content'
import { parseDocument } from 'yaml'
import { journalSchema } from '../shared/journal-schema'

function validateArticle(filename: string, source: string) {
  const fail = (message: string): never => { throw new Error(`Journal article ${filename}: ${message}`) }
  const match = basename(filename).match(/^(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/)
  if (!match) return fail('use a YYYY-MM-DD-slug.md filename')
  const date = match[1]!
  const slug = match[2]!
  const frontmatter = source.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (!frontmatter) return fail('a YAML frontmatter block is required')
  const document = parseDocument(frontmatter[1]!)
  if (document.errors.length) return fail(document.errors.map(error => error.message).join('; '))
  const metadata = document.toJSON()
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) return fail('frontmatter must contain named fields')
  const result = journalSchema.safeParse({ ...metadata, slug })
  if (!result.success) return fail(result.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('; '))
  if (result.data.date !== date) return fail(`frontmatter date ${result.data.date} must match filename date ${date}`)
  const parsedDate = new Date(`${date}T00:00:00Z`)
  if (!Number.isFinite(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) return fail(`invalid publication date ${date}`)
  return result.data
}

// Group H2 sections so existing spacing and paragraph drop caps stay intact.
function groupSections(body: MarkdownRoot) {
  const nodes: MinimalNode[] = []
  let section: MinimalElement | undefined
  for (const node of body.value) {
    if (Array.isArray(node) && node[0] === 'h2') {
      section = ['section', {}]
      nodes.push(section)
    }
    if (section) section.push(node)
    else nodes.push(node)
  }
  body.value = nodes
}

export default defineNuxtModule({
  meta: { name: 'journal-validation' },
  async setup(_options, nuxt) {
    const pairedFilenames = new Map<string, string>()
    for (const language of ['en', 'zh']) {
      const directory = join(nuxt.options.rootDir, 'content/journal', language)
      const filenames = await readdir(directory).catch((error: NodeJS.ErrnoException) => {
        if (error.code === 'ENOENT') return []
        throw error
      })
      const slugs = new Set<string>()
      for (const filename of filenames.filter(name => name.endsWith('.md'))) {
        const path = join(directory, filename)
        const metadata = validateArticle(relative(nuxt.options.rootDir, path), await readFile(path, 'utf8'))
        if (slugs.has(metadata.slug)) throw new Error(`Journal article ${path}: duplicate slug ${metadata.slug}`)
        slugs.add(metadata.slug)
        const paired = pairedFilenames.get(metadata.slug)
        if (paired && paired !== filename) throw new Error(`Journal article ${path}: translations must use the same filename as ${paired}`)
        pairedFilenames.set(metadata.slug, filename)
      }
    }

    nuxt.hook('content:file:beforeParse', ({ file, collection }) => {
      if (collection.name === 'journalEn' || collection.name === 'journalZh') validateArticle(file.path, file.body)
    })
    nuxt.hook('content:file:afterParse', ({ file, content, collection }) => {
      if (collection.name !== 'journalEn' && collection.name !== 'journalZh') return
      const metadata = validateArticle(file.path, file.body)
      Object.assign(content, metadata, { description: metadata.subtitle })
      const body = content.body as MarkdownRoot
      if (body?.type === 'minimark') groupSections(body)
    })
  },
})
