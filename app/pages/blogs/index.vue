<script setup lang="ts">
const { posts, profile } = useSiteContent()
const { t } = useSitePreferences()
const category = ref('all')
const categories = ['all', 'research', 'travelling'] as const
const options = computed(() => categories.map(value => ({
  value,
  label: t(value === 'all' ? 'All' : value),
  count: posts.value.filter(post => value === 'all' || post.category === value).length,
})))
const visiblePosts = computed(() => posts.value.filter(post => category.value === 'all' || post.category === category.value))
const postList = useTemplateRef<HTMLElement>('post-list')
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
let resizeObserver: ResizeObserver | undefined

function updateScrollControls() {
  const list = postList.value
  if (!list) return
  canScrollLeft.value = list.scrollLeft > 1
  canScrollRight.value = list.scrollLeft + list.clientWidth < list.scrollWidth - 1
}

function scrollPosts(direction: -1 | 1) {
  const list = postList.value
  if (!list) return
  list.scrollBy({
    left: direction * list.clientWidth * .8,
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  })
}

onMounted(() => {
  updateScrollControls()
  resizeObserver = new ResizeObserver(updateScrollControls)
  if (postList.value) resizeObserver.observe(postList.value)
})
onBeforeUnmount(() => resizeObserver?.disconnect())
watch(visiblePosts, async () => {
  await nextTick()
  postList.value?.scrollTo({ left: 0, behavior: 'instant' })
  updateScrollControls()
})

useHead({ title: () => `${t('Blogs')} — ${profile.value.name}` })
</script>

<template>
  <div class="editorial-page listing-page">
    <div class="eyebrow"><span class="eyebrow-line" />{{ t('Journal / 002') }}</div>
    <header class="page-intro">
      <p class="small-intro">{{ t('Occasional notes') }}</p>
      <h1>{{ t('Notes from') }}<br><em>{{ t('everywhere.') }}</em></h1>
      <p>{{ t('Reflections on new technology, notes from research, and stories from places I’ve been.') }}</p>
    </header>
    <div class="collection-toolbar">
      <div class="collection-filter-group">
        <p class="section-index">{{ t('Browse by category') }}</p>
        <ContentFilters v-model="category" :options="options" :label="t('Filter blog posts')" />
      </div>
      <div class="scroll-controls">
        <span class="scroll-caption">{{ t('Scroll to explore') }}</span>
        <button type="button" :disabled="!canScrollLeft" :aria-label="t('Scroll blog posts left')" @click="scrollPosts(-1)">←</button>
        <button type="button" :disabled="!canScrollRight" :aria-label="t('Scroll blog posts right')" @click="scrollPosts(1)">→</button>
      </div>
    </div>
    <section
      ref="post-list"
      class="post-list"
      tabindex="0"
      :aria-label="t('Blog posts')"
      aria-live="polite"
      @scroll.passive="updateScrollControls"
    >
      <NuxtLink v-for="post in visiblePosts" :key="post.slug" :to="`/blogs/${post.slug}`" class="post-card">
        <div class="post-card-image">
          <img v-if="post.image?.src" :src="post.image.src" :alt="post.image.alt" loading="lazy" />
        </div>
        <div class="post-card-copy">
          <div class="post-card-top"><span>{{ t(post.category) }}</span><span>{{ post.date }}</span></div>
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt }}</p>
          <div class="post-card-bottom"><span>{{ post.readingTime }}</span><span class="round-arrow" aria-hidden="true">↗</span></div>
        </div>
      </NuxtLink>
    </section>
    <p class="end-note">{{ t('More notes are on their way. Thanks for reading.') }}</p>
  </div>
</template>
