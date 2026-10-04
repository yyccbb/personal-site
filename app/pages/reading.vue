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
const visibleItems = computed(() => reading.value.filter(item => filter.value === 'All' || item.kind === filter.value))

useHead({ title: () => `${t('Reading')} — ${profile.value.name}` })
</script>

<template>
  <div class="editorial-page reading-page">
    <div class="eyebrow"><span class="eyebrow-line" />{{ t('Library / 003') }}</div>
    <header class="page-intro">
      <p class="small-intro">{{ t('Notes from the shelf') }}</p>
      <h1>{{ t('The reading') }}<br><em>{{ t('shelf.') }}</em></h1>
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
      <div class="library-list">
        <article v-for="item in visibleItems" :key="item.url" class="library-entry">
          <div class="library-marker" aria-hidden="true">
            <span>{{ t(item.kind) }}</span>
            <strong>{{ item.year }}</strong>
            <span class="library-marker-plus">＋</span>
          </div>
          <div class="library-copy">
            <p class="library-meta">{{ t(item.kind) }} <span aria-hidden="true">·</span> {{ item.year }}</p>
            <h2>{{ item.title }}</h2>
            <p class="library-creator">{{ item.creator }}</p>
            <p class="library-note">{{ item.note }}</p>
            <a class="library-source" :href="item.url" :aria-label="`${t('Open source')}: ${item.title}`">
              {{ t('Open source') }} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
