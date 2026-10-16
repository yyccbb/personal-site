<script setup lang="ts">
const { reading, profile } = useSiteContent()
const { t } = useSitePreferences()
const filter = ref<string>('All')
const kinds = ['All', 'Book', 'Paper', 'Article'] as const
const filters = computed(() => kinds.map(kind => ({
  value: kind,
  label: t(kind),
  count: kind === 'All' ? reading.value.length : reading.value.filter(item => item.kind === kind).length,
})))
const visibleItems = computed(() => reading.value
  .filter(item => filter.value === 'All' || item.kind === filter.value)
  .sort((a, b) => {
    if (a.status !== b.status) return a.status === 'Reading' ? -1 : 1
    return (b.finishedAt ?? '').localeCompare(a.finishedAt ?? '')
  }))
const readingList = useTemplateRef<HTMLElement>('reading-list')

async function goToCurrentReads() {
  filter.value = 'All'
  await nextTick()
  const list = readingList.value
  if (!list) return
  window.scrollTo({
    top: list.getBoundingClientRect().top + window.scrollY - 24,
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  })
}

useHead({ title: () => `${t('Reading')} — ${profile.value.displayName}` })
</script>

<template>
  <div class="editorial-page reading-page">
    <div class="eyebrow"><span class="eyebrow-line" />{{ t('Reading / 003') }}</div>
    <header class="page-intro">
      <h1>{{ t('Reading') }}<br><em>{{ t('and reflections.') }}</em></h1>
      <p>{{ t('Books, papers, and articles I’m exploring, with a few thoughts to return to.') }}</p>
    </header>

    <section class="library-section" :aria-label="t('Reading list')">
      <div class="collection-toolbar">
        <div class="collection-filter-group">
          <p class="section-index">{{ t('Browse by type') }}</p>
          <ContentFilters v-model="filter" :options="filters" :label="t('Filter reading list')" />
        </div>
        <div class="library-caption" aria-live="polite" aria-atomic="true">
          <span>{{ t('Reading notes') }}</span>
          <span>{{ String(visibleItems.length).padStart(2, '0') }}</span>
        </div>
      </div>
      <div class="library-layout">
        <ReadingTimeline :items="visibleItems" :list-element="readingList" @current-reads="goToCurrentReads" />
        <div ref="reading-list" class="library-list">
          <article v-for="item in visibleItems" :key="item.url" class="library-entry">
            <div class="library-marker">
              <img v-if="item.image" :src="item.image.src" :alt="item.image.alt" loading="lazy" :class="{ 'library-logo': item.kind === 'Paper' }" />
              <span v-else class="library-text-symbol" aria-hidden="true">¶</span>
              <span class="library-kind">{{ t(item.kind) }}</span>
            </div>
            <div class="library-copy">
              <h2>{{ item.title }}</h2>
              <p class="library-creator">{{ item.creator }}</p>
              <p class="library-note">{{ item.note }}</p>
              <a v-if="!item.isSample" class="library-source" :href="item.url" :aria-label="`${t('Open source')}: ${item.title}`">
                {{ t('Open source') }} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
