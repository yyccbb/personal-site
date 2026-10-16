<script setup lang="ts">
const { profile } = useSiteContent()
const { t } = useSitePreferences()
const railUtilities = useTemplateRef<HTMLElement>('rail-utilities')
const railControlHeight = ref<number>()
let contactResizeObserver: ResizeObserver | undefined

onMounted(() => {
  const contact = railUtilities.value?.querySelector<HTMLElement>('.rail-connect')
  if (!contact) return
  // Share the contact pill's measured height with both preference controls.
  railControlHeight.value = contact.getBoundingClientRect().height
  contactResizeObserver = new ResizeObserver(([entry]) => {
    if (entry) railControlHeight.value = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
  })
  contactResizeObserver.observe(contact)
})
onBeforeUnmount(() => contactResizeObserver?.disconnect())

const route = useRoute()
const links = [
  { label: 'About', to: '/' },
  { label: 'Journal', to: '/blogs' },
  { label: 'Reading', to: '/reading' },
]
</script>

<template>
  <div class="site-shell">
    <aside class="site-rail">
      <div class="rail-brand">
        <NuxtLink to="/" class="wordmark" :aria-label="`${profile.displayName}, ${t('Home')}`">YC<span class="wordmark-dot">.</span></NuxtLink>
        <span class="rail-caption">{{ t("To research,") }}<br>{{ t("to music,") }}<br>{{ t("to life.") }}</span>
      </div>
      <div class="rail-middle">
        <nav :aria-label="t('Main navigation')" class="site-nav">
          <NuxtLink v-for="(link, index) in links" :key="link.to" :to="link.to" active-class="active" :class="{ active: link.to === '/blogs' && route.path.startsWith('/blogs/') }">
            <span class="nav-number">0{{ index + 1 }}</span>{{ t(link.label) }}
          </NuxtLink>
        </nav>
      </div>
      <div ref="rail-utilities" class="rail-utilities" :style="railControlHeight ? { '--rail-control-height': `${railControlHeight}px` } : undefined">
        <SitePreferences />
        <ContactLinks :email="profile.email" />
      </div>
    </aside>
    <div class="page-area">
      <main><NuxtPage /></main>
      <footer class="site-footer"><span>© {{ new Date().getFullYear() }} {{ profile.name }}</span><a :href="`mailto:${profile.email}`">{{ t("Get in touch ↗") }}</a></footer>
    </div>
  </div>
</template>
