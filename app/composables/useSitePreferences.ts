import { chineseCopy, englishCopy } from '~/content/translations'

export type ThemePreference = 'system' | 'light' | 'dark'
export type SiteLanguage = 'en' | 'zh'

export function useSitePreferences() {
  // Read cookies once during initialization. The app plugin owns cookie writes,
  // so a page's disposal cannot restore an older preference during navigation.
  const theme = useState<ThemePreference>('site-theme-preference', () => {
    const value = useCookie<ThemePreference>('site-theme', { readonly: true, watch: false }).value
    return value && ['system', 'light', 'dark'].includes(value) ? value : 'system'
  })
  const locale = useState<SiteLanguage>('site-language-preference', () =>
    useCookie<SiteLanguage>('site-language', { readonly: true, watch: false }).value === 'zh' ? 'zh' : 'en',
  )
  const t = (key: string) => locale.value === 'zh' ? (chineseCopy[key] ?? key) : (englishCopy[key] ?? key)
  const cycleTheme = () => { theme.value = theme.value === 'system' ? 'light' : theme.value === 'light' ? 'dark' : 'system' }
  const toggleLanguage = () => { locale.value = locale.value === 'en' ? 'zh' : 'en' }
  return { theme, locale, t, cycleTheme, toggleLanguage }
}
