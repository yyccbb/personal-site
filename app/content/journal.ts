import type { SiteLanguage } from '~/composables/useSitePreferences'

export interface JournalPost {
  slug: string
  path: string
  language: SiteLanguage
  title: string
  subtitle: string
  author: string
  publishedAt: string
  date: string
  category: 'research' | 'travelling'
  readingMinutes: number
  readingTime: string
  image?: { src: string; alt: string }
}
