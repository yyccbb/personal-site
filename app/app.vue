<script setup lang="ts">
const { profile } = useSiteContent()
const { t } = useSitePreferences()

const route = useRoute()
const links = [
  { label: 'About', to: '/' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Reading', to: '/reading' },
]
</script>

<template>
  <div class="site-shell">
    <aside class="site-rail">
      <NuxtLink to="/" class="wordmark" :aria-label="t('Alex Chen, home')">AC<span class="wordmark-dot">.</span></NuxtLink>
      <div class="rail-middle">
        <span class="rail-caption">{{ t("Independent practice") }}<br>{{ t("Brooklyn, NY") }}</span>
        <nav :aria-label="t('Main navigation')" class="site-nav">
          <NuxtLink v-for="(link, index) in links" :key="link.to" :to="link.to" :class="{ active: route.path === link.to || (link.to === '/blogs' && route.path.startsWith('/blogs/')) }">
            <span class="nav-number">0{{ index + 1 }}</span>{{ t(link.label) }}
          </NuxtLink>
        </nav>
      </div>
      <SitePreferences />
      <a class="rail-email" :href="`mailto:${profile.email}`">{{ t("Let's connect") }} <span aria-hidden="true">↗</span></a>
    </aside>
    <div class="page-area">
      <main><NuxtPage /></main>
      <footer class="site-footer"><span>© {{ new Date().getFullYear() }} Alex Chen</span><span>{{ t("Made with intention.") }}</span><a :href="`mailto:${profile.email}`">{{ t("Get in touch ↗") }}</a></footer>
    </div>
  </div>
</template>
