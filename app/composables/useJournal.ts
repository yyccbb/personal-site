import type { Collections } from '@nuxt/content'
import type { JournalPost } from '~/content/journal'
import type { SiteLanguage } from './useSitePreferences'
import { englishContent } from '~/content/site'
import { chineseContent } from '~/content/zh'

const fields = ['slug', 'path', 'title', 'subtitle', 'author', 'date', 'category', 'readingMinutes', 'image'] as const
type JournalDocument = Pick<Collections['journalEn'] | Collections['journalZh'], typeof fields[number]>

export function useJournal() {
  const { locale } = useSitePreferences()
  const request = useAsyncData('journal-metadata', async () => {
    const [en, zh] = await Promise.all([
      queryCollection('journalEn').select(...fields).all(),
      queryCollection('journalZh').select(...fields).all(),
    ])
    return { en, zh }
  })

  const posts = computed<JournalPost[]>(() => {
    if (!request.data.value) return []
    const selected = locale.value
    const fallback = selected === 'en' ? 'zh' : 'en'
    const entries = new Map<string, { document: JournalDocument; language: SiteLanguage }>()
    for (const language of [fallback, selected] as const) {
      for (const document of request.data.value[language]) entries.set(document.slug, { document, language })
    }
    const formatter = new Intl.DateTimeFormat(selected === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
    })
    return [...entries.values()].map(({ document, language }) => ({
      slug: document.slug,
      path: document.path,
      language,
      title: document.title,
      subtitle: document.subtitle,
      author: document.author ?? (language === 'zh' ? chineseContent : englishContent).profile.name,
      publishedAt: document.date,
      date: formatter.format(new Date(`${document.date}T00:00:00Z`)),
      category: document.category,
      readingMinutes: document.readingMinutes,
      readingTime: selected === 'zh' ? `阅读约${document.readingMinutes}分钟` : `${document.readingMinutes} min read`,
      image: document.image,
    })).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug))
  })

  return { posts, ready: request, error: request.error }
}
