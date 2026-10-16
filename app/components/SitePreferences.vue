<script setup lang="ts">
const { theme, locale, t, toggleTheme, toggleLanguage } = useSitePreferences()
const languageLabel = computed(() => t(locale.value === 'en' ? 'Switch to Chinese' : 'Switch to English'))
const systemDark = ref(false)
const isDark = computed(() => theme.value === 'dark' || (theme.value === 'system' && systemDark.value))
let systemAppearance: MediaQueryList | undefined

function syncSystemAppearance() {
  systemDark.value = systemAppearance?.matches ?? false
}

onMounted(() => {
  systemAppearance = window.matchMedia('(prefers-color-scheme: dark)')
  syncSystemAppearance()
  systemAppearance.addEventListener('change', syncSystemAppearance)
})
onBeforeUnmount(() => systemAppearance?.removeEventListener('change', syncSystemAppearance))
</script>

<template>
  <div class="site-preferences" :aria-label="t('Site preferences')">
    <button type="button" class="preference-control appearance-control button-surface" role="switch" :aria-checked="isDark" :aria-label="t('Dark mode')" :title="t('Toggle light and dark mode')" @click="toggleTheme">
      <span class="preference-thumb button-surface" aria-hidden="true">
        <svg class="theme-icon-light" viewBox="0 0 20 20"><circle cx="10" cy="10" r="3.5" /><path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.6 3.6 5 5M15 15l1.4 1.4M3.6 16.4 5 15M15 5l1.4-1.4" /></svg>
        <svg class="theme-icon-dark" viewBox="0 0 20 20"><path d="M17.5 11.6A7.5 7.5 0 0 1 8.4 2.5 7.5 7.5 0 1 0 17.5 11.6Z" /></svg>
      </span>
    </button>
    <button type="button" class="preference-control language-control button-surface" :class="{ 'is-chinese': locale === 'zh' }" role="switch" :aria-checked="locale === 'zh'" :aria-label="t('Chinese language')" :title="languageLabel" @click="toggleLanguage">
      <span class="preference-thumb button-surface" aria-hidden="true">
        <svg class="language-icon-english" viewBox="0 0 20 20"><path d="m4 16 6-12 6 12M6.5 11h7" /></svg>
        <svg class="language-icon-chinese" viewBox="0 0 20 20"><path d="m9 2 2 2M3 5h14M6 5c.6 6.2 4.8 10 11 12M14 5C13.4 11.2 9.2 15 3 17" /></svg>
      </span>
    </button>
  </div>
</template>
