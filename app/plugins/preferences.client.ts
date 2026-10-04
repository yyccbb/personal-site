export default defineNuxtPlugin(() => {
  const { theme } = useSitePreferences()
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const applyTheme = () => {
    const resolved = theme.value === 'system' ? (media.matches ? 'dark' : 'light') : theme.value
    document.documentElement.dataset.theme = resolved
    document.documentElement.style.colorScheme = resolved
  }
  watch(theme, applyTheme, { immediate: true, flush: 'sync' })
  media.addEventListener('change', () => {
    // A system appearance change resumes automatic following after a toggle.
    theme.value = 'system'
    applyTheme()
  })
})
