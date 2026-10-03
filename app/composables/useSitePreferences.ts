import { chineseCopy, englishCopy } from '~/content/translations'

export type ThemePreference = 'system' | 'light' | 'dark'
export type SiteLanguage = 'en' | 'zh'

export function useSitePreferences() {
  const themeCookie = useCookie<ThemePreference>('site-theme')
  const languageCookie = useCookie<SiteLanguage>('site-language')
  const theme = useState<ThemePreference>('site-theme-preference', () => ['system', 'light', 'dark'].includes(themeCookie.value ?? '') ? themeCookie.value : 'system')
  const locale = useState<SiteLanguage>('site-language-preference', () => languageCookie.value === 'zh' ? 'zh' : 'en')
  const t = (key: string) => locale.value === 'zh' ? (chineseCopy[key] ?? key) : (englishCopy[key] ?? key)
  const cycleTheme = () => { theme.value = theme.value === 'system' ? 'light' : theme.value === 'light' ? 'dark' : 'system' }
  const toggleLanguage = () => { locale.value = locale.value === 'en' ? 'zh' : 'en' }
  return { theme, locale, t, cycleTheme, toggleLanguage }
}
