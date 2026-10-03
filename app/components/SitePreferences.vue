<script setup lang="ts">
const { theme, locale, t, cycleTheme, toggleLanguage } = useSitePreferences()
const themeLabel = computed(() => t(theme.value === 'system' ? 'System' : theme.value === 'light' ? 'Light' : 'Dark'))
</script>

<template>
  <div class="site-preferences" :aria-label="t('Site preferences')">
    <button type="button" class="preference-button" :aria-label="`${t('Change color mode')}: ${themeLabel}`" :title="t('Cycle System, Light, and Dark')" @click="cycleTheme">
      <svg v-if="theme === 'system'" aria-hidden="true" viewBox="0 0 20 20"><rect x="2.5" y="3" width="15" height="10" rx="2" /><path d="M7 17h6M10 13v4" /></svg>
      <svg v-else-if="theme === 'light'" aria-hidden="true" viewBox="0 0 20 20"><circle cx="10" cy="10" r="3.5" /><path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.6 3.6 5 5M15 15l1.4 1.4M3.6 16.4 5 15M15 5l1.4-1.4" /></svg>
      <svg v-else aria-hidden="true" viewBox="0 0 20 20"><path d="M17.5 11.6A7.5 7.5 0 0 1 8.4 2.5 7.5 7.5 0 1 0 17.5 11.6Z" /></svg>
      <span>{{ themeLabel }}</span>
    </button>
    <button type="button" class="preference-button language-button" :aria-label="t('Switch site language')" :title="locale === 'en' ? '切换为中文' : 'Switch to English'" @click="toggleLanguage"><span aria-hidden="true">文/A</span><span>{{ locale === 'en' ? '中文' : 'English' }}</span></button>
  </div>
</template>
