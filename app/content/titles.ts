import type { SiteLanguage } from '~/composables/useSitePreferences'

// Each language owns the complete title, including emphasis (*) and breaks (|).
// See docs/title-templates.md for syntax and examples.
export const titleTemplates = {
  journal: {
    en: 'Notes from|*everywhere.*',
    zh: '沿途的|*思考。*',
  },
  reading: {
    en: 'Reading|*and reflections.*',
    zh: '阅读与|*感悟。*',
  },
  photography: {
    en: 'Ways of|*seeing.*',
    zh: '目光|*所至。*',
  },
  aboutDetails: {
    en: '*Research,*|and the *life* around it.',
    zh: '*科研，*|和我的*生活*。',
  },
} satisfies Record<string, Record<SiteLanguage, string>>

export type TitleName = keyof typeof titleTemplates
