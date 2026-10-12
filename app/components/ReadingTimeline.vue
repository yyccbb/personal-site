<script setup lang="ts">
import type { ReadingItem } from '~/content/site'

const props = defineProps<{ items: ReadingItem[]; listElement: HTMLElement | null }>()
const emit = defineEmits<{ currentReads: [] }>()
const { t, locale } = useSitePreferences()
const spine = useTemplateRef<HTMLElement>('timeline-spine')
type Entry = { item: ReadingItem; top: number; bottom: number }
const metrics = shallowRef<Entry[]>([])
const scrollY = ref(0)
const viewportHeight = ref(0)
const documentHeight = ref(0)
const dragging = ref(false)
const inset = 24
const headingSpacing = 32
const labelSpacing = 28
const thumbHeight = 36
let dragOffset = 0
let dragTrackTop = 0
let dragTravel = 0
let frame = 0
let resizeObserver: ResizeObserver | undefined

const years = computed(() => [...new Set(props.items.flatMap(item => item.finishedAt ? [item.finishedAt.slice(0, 4)] : []))].sort().reverse())
const listTop = computed(() => metrics.value[0]?.top ?? 0)
const listBottom = computed(() => metrics.value.at(-1)?.bottom ?? 0)
const frameTop = computed(() => Math.max(listTop.value, scrollY.value + inset))
// Shrinking at the end keeps the navigation visible without entering the footer.
const frameHeight = computed(() => Math.max(0, Math.min(viewportHeight.value - inset * 2, listBottom.value - frameTop.value)))
const minScroll = computed(() => Math.max(0, listTop.value - inset))
const maxScroll = computed(() => Math.max(minScroll.value, Math.min((metrics.value.at(-1)?.top ?? 0) - inset, documentHeight.value - viewportHeight.value)))
const scrollRange = computed(() => maxScroll.value - minScroll.value)
const progress = computed(() => scrollRange.value ? Math.min(1, Math.max(0, (scrollY.value - minScroll.value) / scrollRange.value)) : 0)
const thumbTop = computed(() => progress.value * Math.max(0, frameHeight.value - thumbHeight))
const inView = computed(() => {
  const bottom = Math.min(frameTop.value + frameHeight.value, scrollY.value + viewportHeight.value - inset)
  return metrics.value.filter(entry => entry.bottom > frameTop.value && entry.top < bottom)
})
const nearestEntry = computed(() => {
  const center = scrollY.value + viewportHeight.value / 2
  return metrics.value.reduce<Entry | undefined>((nearest, entry) =>
    !nearest || Math.abs((entry.top + entry.bottom) / 2 - center) < Math.abs((nearest.top + nearest.bottom) / 2 - center) ? entry : nearest, undefined)
})

const layout = computed(() => {
  const visibleBottom = Math.min(frameHeight.value, scrollY.value + viewportHeight.value - inset - frameTop.value)
  const spacing = Math.min(headingSpacing, Math.max(0, (frameHeight.value - 24) / years.value.length))
  // Each heading starts in the gap before its year's newest card. Headings
  // outside the viewport stay in chronological order at the top or bottom.
  const headings = [
    { year: null, anchor: listTop.value + 12 },
    ...years.value.map(year => {
      const index = metrics.value.findIndex(entry => entry.item.finishedAt?.startsWith(year))
      const first = metrics.value[index]
      const previous = metrics.value[index - 1]
      const anchor = first ? previous ? (previous.bottom + first.top) / 2 : first.top : listTop.value
      return { year, anchor }
    }),
  ].map((heading, index, all) => ({
    ...heading,
    position: Math.max(12 + index * spacing, Math.min(frameHeight.value - 12 - (all.length - index - 1) * spacing, heading.anchor - frameTop.value)),
    active: inView.value.some(entry => heading.year ? entry.item.finishedAt?.startsWith(heading.year) : entry.item.status === 'Reading'),
  }))
  const dates = inView.value.flatMap(entry => {
    const group = entry.item.status === 'Reading' ? 0 : years.value.indexOf(entry.item.finishedAt?.slice(0, 4) ?? '') + 1
    const heading = headings[group]
    const nextHeading = headings[group + 1]
    const low = Math.max((heading?.position ?? 12) + labelSpacing, entry.top - frameTop.value + 10)
    const high = Math.min((nextHeading?.position ?? visibleBottom + labelSpacing - 10) - labelSpacing, visibleBottom - 10, entry.bottom - frameTop.value - 10)
    if (low > high) return []
    return [{ entry, position: Math.min(high, Math.max(low, (entry.top + entry.bottom) / 2 - frameTop.value)) }]
  })
  return { headings, dates }
})

function dateLabel(item: ReadingItem) {
  if (item.status === 'Reading') return t('In hand')
  if (!item.finishedAt) return t('Finished')
  const [year = 0, month = 1] = item.finishedAt.split('-').map(Number)
  return new Intl.DateTimeFormat(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)))
}

function measure() {
  if (!props.listElement) return
  const cards = Array.from(props.listElement.querySelectorAll<HTMLElement>('.library-entry'))
  metrics.value = cards.flatMap((card, index) => {
    const item = props.items[index]
    if (!item) return []
    let top = 0
    for (let element: HTMLElement | null = card; element; element = element.offsetParent as HTMLElement | null) top += element.offsetTop
    return [{ item, top, bottom: top + card.offsetHeight }]
  })
  viewportHeight.value = window.innerHeight
  documentHeight.value = document.documentElement.scrollHeight
  scrollY.value = window.scrollY
}

function scheduleMeasure() {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(measure)
}

function onScroll() {
  scrollY.value = window.scrollY
}

function jumpTo(entry: Entry) {
  window.scrollTo({
    top: entry.top - inset,
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  })
}

function jumpToYear(year: string) {
  const anchor = scrollY.value + viewportHeight.value / 2
  const candidates = metrics.value.filter(entry => entry.item.finishedAt?.startsWith(year))
  const currentYear = nearestEntry.value?.item.finishedAt?.slice(0, 4)
  const nearest = currentYear && year > currentYear ? candidates.at(-1)
    : !currentYear || year < currentYear ? candidates[0]
    : candidates.reduce<Entry | undefined>((result, entry) =>
      !result || Math.abs(entry.top - anchor) < Math.abs(result.top - anchor) ? entry : result, undefined)
  if (nearest) jumpTo(nearest)
}

function dragTo(clientY: number) {
  if (dragTravel <= 0 || !scrollRange.value) return
  const nextProgress = Math.min(1, Math.max(0, (clientY - dragTrackTop - dragOffset) / dragTravel))
  window.scrollTo({ top: minScroll.value + nextProgress * scrollRange.value, behavior: 'instant' })
}

function startDrag(event: PointerEvent) {
  if (event.button !== 0 || !scrollRange.value) return
  const element = spine.value
  if (!element) return
  event.preventDefault()
  dragTrackTop = element.getBoundingClientRect().top
  dragTravel = frameHeight.value - thumbHeight
  dragOffset = (event.target as HTMLElement).closest('.reading-timeline-thumb')
    ? event.clientY - element.getBoundingClientRect().top - thumbTop.value
    : thumbHeight / 2
  dragging.value = true
  element.focus({ preventScroll: true })
  element.setPointerCapture(event.pointerId)
  dragTo(event.clientY)
}

function moveDrag(event: PointerEvent) {
  if (dragging.value) dragTo(event.clientY)
}

function endDrag(event: PointerEvent) {
  dragging.value = false
  if (spine.value?.hasPointerCapture(event.pointerId)) spine.value.releasePointerCapture(event.pointerId)
}

function onKeydown(event: KeyboardEvent) {
  let next = scrollY.value
  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next += viewportHeight.value / 3
  else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next -= viewportHeight.value / 3
  else if (event.key === 'PageDown') next += viewportHeight.value * .85
  else if (event.key === 'PageUp') next -= viewportHeight.value * .85
  else if (event.key === 'Home') next = minScroll.value
  else if (event.key === 'End') next = maxScroll.value
  else return
  event.preventDefault()
  window.scrollTo({ top: Math.min(maxScroll.value, Math.max(minScroll.value, next)), behavior: 'instant' })
}

onMounted(() => {
  resizeObserver = new ResizeObserver(scheduleMeasure)
  if (props.listElement) resizeObserver.observe(props.listElement)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', scheduleMeasure)
  measure()
})
watch(() => [props.items, props.listElement], async () => {
  await nextTick()
  resizeObserver?.disconnect()
  if (props.listElement) resizeObserver?.observe(props.listElement)
  measure()
})
onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', scheduleMeasure)
})
</script>

<template>
  <aside class="reading-timeline" :aria-label="t('Reading timeline')">
    <div class="reading-timeline-frame" :class="{ dragging }" :style="{ height: `${frameHeight}px` }">
      <div ref="timeline-spine" class="reading-timeline-spine" role="slider" tabindex="0" aria-orientation="vertical" :aria-label="t('Drag to browse readings')" :aria-valuemin="0" :aria-valuemax="100" :aria-valuenow="Math.round(progress * 100)" :aria-valuetext="layout.dates.map(date => `${dateLabel(date.entry.item)}: ${date.entry.item.title}`).join(', ')" @pointerdown="startDrag" @pointermove="moveDrag" @pointerup="endDrag" @pointercancel="endDrag" @keydown="onKeydown">
        <span class="reading-timeline-thumb" :style="{ top: `${thumbTop}px` }" aria-hidden="true" />
      </div>
      <nav class="reading-timeline-headings" :aria-label="t('Browse reading history')">
        <button v-for="heading in layout.headings" :key="heading.year ?? 'current'" type="button" class="reading-timeline-heading" :class="{ active: heading.active }" :style="{ top: `${heading.position}px` }" :aria-label="heading.year ? `${t('Jump to year')} ${heading.year}` : t('Current reads')" :aria-current="heading.active ? 'true' : undefined" @click="heading.year ? jumpToYear(heading.year) : emit('currentReads')">{{ heading.year ?? t('Curr.') }}</button>
      </nav>
      <button v-for="date in layout.dates" :key="date.entry.item.url" type="button" class="reading-timeline-date" :style="{ top: `${date.position}px` }" :aria-label="`${dateLabel(date.entry.item)}: ${date.entry.item.title}`" @click="jumpTo(date.entry)">
        <span>{{ dateLabel(date.entry.item) }}</span>
        <span class="reading-date-node" aria-hidden="true" />
        <span class="reading-date-connector" aria-hidden="true" />
      </button>
    </div>
  </aside>
</template>
