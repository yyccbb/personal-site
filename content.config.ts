import { defineCollection, defineContentConfig } from '@nuxt/content'
import { journalSchema } from './shared/journal-schema'

export default defineContentConfig({
  collections: {
    journalEn: defineCollection({ type: 'page', source: 'journal/en/*.md', schema: journalSchema }),
    journalZh: defineCollection({ type: 'page', source: 'journal/zh/*.md', schema: journalSchema }),
  },
})
