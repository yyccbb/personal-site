export default defineNuxtPlugin(() => {
  const { theme } = useSitePreferences()
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const applyTheme = () => {
    const resolved = theme.value === 'system' ? (media.matches ? 'dark' : 'light') : theme.value
    document.documentElement.dataset.theme = resolved
    document.documentElement.style.colorScheme = resolved
  }
  watch(theme, applyTheme, { immediate: true })
  media.addEventListener('change', applyTheme)
})
