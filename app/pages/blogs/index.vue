<script setup lang="ts">
import { NuxtLink } from '#components'

const { profile } = useSiteContent()
const { t } = useSitePreferences()
const { posts, ready, error } = useJournal()
await ready
if (error.value) throw error.value
const previews = [
  { slug: 'preview-tools', title: 'Small tools, useful discoveries', category: 'research' },
  { slug: 'preview-weekend', title: 'A weekend without a checklist', category: 'travelling' },
  { slug: 'preview-experiment', title: 'Questions for the next experiment', category: 'research' },
] as const
const cards = computed(() => [
  ...posts.value.map(post => ({ ...post, isPreview: false })),
  ...previews.map(post => ({
    ...post,
    title: t(post.title),
    date: t('Coming soon'),
    subtitle: '',
    readingTime: t('Preview card'),
    image: undefined,
    isPreview: true,
  })),
])
const category = ref('all')
const categories = ['all', 'research', 'travelling'] as const
const options = computed(() => categories.map(value => ({
  value,
  label: t(value === 'all' ? 'All' : value),
  count: cards.value.filter(post => value === 'all' || post.category === value).length,
})))
const visiblePosts = computed(() => cards.value.filter(post => category.value === 'all' || post.category === category.value))
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
  const firstCard = list.children[0] as HTMLElement | undefined
  const secondCard = list.children[1] as HTMLElement | undefined
  if (!firstCard) return
  const step = secondCard ? secondCard.offsetLeft - firstCard.offsetLeft : firstCard.offsetWidth
  list.scrollTo({
    left: Math.min(list.scrollWidth - list.clientWidth, Math.max(0, list.scrollLeft + direction * step)),
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  })
}

function onPageKeydown(event: KeyboardEvent) {
  if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
  const target = event.target
  if (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select, [role="textbox"]'))) return
  event.preventDefault()
  scrollPosts(event.key === 'ArrowLeft' ? -1 : 1)
}

onMounted(() => {
  updateScrollControls()
  resizeObserver = new ResizeObserver(updateScrollControls)
  if (postList.value) resizeObserver.observe(postList.value)
  window.addEventListener('keydown', onPageKeydown)
})
onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('keydown', onPageKeydown)
})
watch(visiblePosts, async () => {
  await nextTick()
  postList.value?.scrollTo({ left: 0, behavior: 'instant' })
  updateScrollControls()
})

useHead({ title: () => `${t('Journal')} — ${profile.value.displayName}` })
</script>

<template>
  <div class="editorial-page listing-page">
    <div class="eyebrow"><span class="eyebrow-line" />{{ t('Journal / 002') }}</div>
    <header class="page-intro">
      <h1>{{ t('Notes from') }}<br><em>{{ t('everywhere.') }}</em></h1>
      <p>{{ t('Reflections on new technology, notes from research, and stories from places I’ve been.') }}</p>
    </header>
    <div class="collection-toolbar">
      <div class="collection-filter-group">
        <p class="section-index">{{ t('Browse by category') }}</p>
        <ContentFilters v-model="category" :options="options" :label="t('Filter journal entries')" />
      </div>
      <div class="scroll-controls">
        <span class="scroll-caption">{{ t('Scroll to explore') }}</span>
        <button type="button" class="button-surface" :disabled="!canScrollLeft" :aria-label="t('Scroll journal entries left')" @click="scrollPosts(-1)">←</button>
        <button type="button" class="button-surface" :disabled="!canScrollRight" :aria-label="t('Scroll journal entries right')" @click="scrollPosts(1)">→</button>
      </div>
    </div>
    <section
      ref="post-list"
      class="post-list"
      tabindex="0"
      :aria-label="t('Journal entries')"
      aria-keyshortcuts="ArrowLeft ArrowRight"
      aria-live="polite"
      @scroll.passive="updateScrollControls"
    >
      <component
        :is="post.isPreview ? 'article' : NuxtLink"
        v-for="post in visiblePosts"
        :key="post.slug"
        :to="post.isPreview ? undefined : `/blogs/${post.slug}`"
        class="post-card"
      >
        <div class="post-card-image">
          <img v-if="post.image?.src" :src="post.image.src" :alt="post.image.alt" loading="lazy" />
        </div>
        <div class="post-card-copy">
          <div class="post-card-top"><span>{{ t(post.category) }}</span><span>{{ post.date }}</span></div>
          <h2>{{ post.title }}</h2>
          <p v-if="post.subtitle">{{ post.subtitle }}</p>
          <div class="post-card-bottom"><span>{{ post.readingTime }}</span><span v-if="!post.isPreview" class="round-arrow" aria-hidden="true">↗</span></div>
        </div>
      </component>
    </section>
  </div>
</template>
