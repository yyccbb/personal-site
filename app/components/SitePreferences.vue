<script setup lang="ts">
const { locale, t, toggleTheme, toggleLanguage } = useSitePreferences()
const languageLabel = computed(() => t(locale.value === 'en' ? 'Switch to Chinese' : 'Switch to English'))
</script>

<template>
  <div class="site-preferences" :aria-label="t('Site preferences')">
    <button type="button" class="preference-button" :aria-label="t('Toggle light and dark mode')" :title="t('Toggle light and dark mode')" @click="toggleTheme">
      <svg class="theme-icon-light" aria-hidden="true" viewBox="0 0 20 20"><circle cx="10" cy="10" r="3.5" /><path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.6 3.6 5 5M15 15l1.4 1.4M3.6 16.4 5 15M15 5l1.4-1.4" /></svg>
      <svg class="theme-icon-dark" aria-hidden="true" viewBox="0 0 20 20"><path d="M17.5 11.6A7.5 7.5 0 0 1 8.4 2.5 7.5 7.5 0 1 0 17.5 11.6Z" /></svg>
    </button>
    <button type="button" class="preference-button language-button" :aria-label="languageLabel" :title="languageLabel" @click="toggleLanguage">
      <svg aria-hidden="true" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7.5" /><path d="M2.9 7.5h14.2M2.9 12.5h14.2M10 2.5c4 4.5 4 10.5 0 15M10 2.5c-4 4.5-4 10.5 0 15" /></svg>
    </button>
  </div>
</template>
