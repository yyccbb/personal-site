<script setup lang="ts">
import type { PhotoAlbum } from '../../shared/types/photography'
import { formatAlbumCity, formatAlbumMonth } from '~/utils/photography'
const props = defineProps<{ albums: PhotoAlbum[] }>()
defineEmits<{ open: [album: PhotoAlbum] }>()
const { t, locale } = useSitePreferences()
const tilts = [-5, 4, -3, 5, -4, 2]
const albumStrip = useTemplateRef<HTMLElement>('album-strip')
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
const overflowing = computed(() => canScrollLeft.value || canScrollRight.value)
let resizeObserver: ResizeObserver | undefined

function updateScrollControls() {
  const strip = albumStrip.value
  if (!strip) return
  canScrollLeft.value = strip.scrollLeft > 1
  canScrollRight.value = strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 1
}

function scrollAlbums(direction: -1 | 1) {
  const strip = albumStrip.value
  const first = strip?.children[0] as HTMLElement | undefined
  const second = strip?.children[1] as HTMLElement | undefined
  if (!strip || !first) return
  const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth
  strip.scrollTo({
    left: Math.max(0, Math.min(strip.scrollWidth - strip.clientWidth, strip.scrollLeft + direction * step)),
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  })
}

function onStripKeydown(event: KeyboardEvent) {
  if (!overflowing.value || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault()
    scrollAlbums(event.key === 'ArrowLeft' ? -1 : 1)
  } else if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault()
    const strip = albumStrip.value
    strip?.scrollTo({ left: event.key === 'Home' ? 0 : strip.scrollWidth, behavior: 'instant' })
  }
}

function onStripWheel(event: WheelEvent) {
  const strip = albumStrip.value
  if (!strip || event.defaultPrevented || event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return
  if (event.deltaY > 0 ? !canScrollRight.value : !canScrollLeft.value) return
  event.preventDefault()
  strip.scrollLeft += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? strip.clientWidth : 1)
}

onMounted(() => {
  updateScrollControls()
  resizeObserver = new ResizeObserver(updateScrollControls)
  if (albumStrip.value) {
    resizeObserver.observe(albumStrip.value)
    albumStrip.value.addEventListener('wheel', onStripWheel, { passive: false })
  }
})
onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  albumStrip.value?.removeEventListener('wheel', onStripWheel)
})
watch(() => props.albums, async () => { await nextTick(); updateScrollControls() })
</script>

<template>
  <section class="print-collection" :aria-label="t('Albums')">
    <div class="print-collection-heading">
      <span>{{ String(albums.length).padStart(2, '0') }} {{ t('Albums') }}</span>
      <div v-if="overflowing" class="scroll-controls album-scroll-controls">
        <span class="scroll-caption">{{ t('Scroll to explore') }}</span>
        <button type="button" class="button-surface" :disabled="!canScrollLeft" :aria-label="t('Previous albums')" aria-controls="photography-album-strip" @click="scrollAlbums(-1)">←</button>
        <button type="button" class="button-surface" :disabled="!canScrollRight" :aria-label="t('Next albums')" aria-controls="photography-album-strip" @click="scrollAlbums(1)">→</button>
      </div>
      <span v-else class="print-collection-arrow" aria-hidden="true">↙</span>
    </div>
    <div ref="album-strip" id="photography-album-strip" class="print-stacks" role="region" :tabindex="overflowing ? 0 : undefined" :aria-label="t('Browse albums')" aria-keyshortcuts="ArrowLeft ArrowRight Home End" @scroll.passive="updateScrollControls" @keydown="onStripKeydown">
      <button v-for="(album, index) in albums" :key="album.id" class="photo-trigger print-stack" :style="{ '--tilt': `${tilts[index % tilts.length]}deg` }" :aria-label="t('Open album: {city}, {date}').replace('{city}', formatAlbumCity(album.city, locale)).replace('{date}', formatAlbumMonth(album.month, locale))" @click="$emit('open', album)">
        <span class="print-stack-back print-stack-back--far photo-print-frame" aria-hidden="true"><PhotoImage :photo="album.photos[2] || album.cover" decorative sizes="30vw" /></span>
        <span class="print-stack-back photo-print-frame" aria-hidden="true"><PhotoImage :photo="album.photos[1] || album.cover" decorative sizes="30vw" /></span>
        <span class="print-stack-front photo-print-frame"><PhotoImage :photo="album.cover" :eager="index < 3" sizes="(max-width: 600px) 75vw, (max-width: 1050px) 38vw, 25vw" decorative /><span class="print-stack-caption"><span class="print-city">{{ formatAlbumCity(album.city, locale) }}</span><span class="print-meta"><time :datetime="album.month">{{ formatAlbumMonth(album.month, locale) }}</time><span aria-hidden="true">↗</span></span></span></span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.print-collection-heading{display:flex;justify-content:space-between;align-items:center;gap:16px;min-height:57px;border-top:1px solid var(--color-border);padding-top:16px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-muted)}
.print-collection-arrow{font:24px Georgia,serif;color:var(--color-accent)}
.album-scroll-controls{margin-left:auto;font-size:1rem;letter-spacing:normal;text-transform:none}
.print-stacks{--stack-gap:50px;position:relative;display:flex;align-items:flex-start;gap:var(--stack-gap);overflow-x:auto;overflow-y:hidden;overscroll-behavior-x:contain;scroll-snap-type:x proximity;scroll-padding-inline:32px;padding:70px 32px 80px;margin-inline:-16px;scrollbar-width:thin;scrollbar-color:var(--color-accent) var(--color-surface)}
.print-stacks:focus-visible{outline:2px solid var(--color-accent);outline-offset:5px}
.print-stack{position:relative;isolation:isolate;flex:0 0 calc((100% - var(--stack-gap) * 2) / 3);min-width:0;scroll-snap-align:start;transform:rotate(var(--tilt));transition:transform .4s ease}
.print-stack:nth-child(3n+2){margin-top:70px}
.print-stack-front,.print-stack-back{display:block;padding:10px 10px 0}
.print-stack-front{position:relative;z-index:2}
.print-stack-front :deep(.photo-image){aspect-ratio:4/3!important}
.print-stack-back{position:absolute;inset:0 3px 0 3px;transform:rotate(7deg);z-index:1;padding-bottom:30px}
.print-stack-back--far{transform:rotate(-6deg);z-index:0}
.print-stack-back :deep(.photo-image){height:100%}
.print-stack-caption{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 4px;color:var(--color-muted)}
.print-city{min-width:0;overflow-wrap:anywhere;font:16px Georgia,serif;letter-spacing:-.02em;color:var(--color-text)}
.print-meta{display:flex;align-items:center;gap:14px;flex-shrink:0}
.print-meta time{font-size:10px;letter-spacing:.04em;white-space:nowrap;font-variant-numeric:tabular-nums}
.print-meta>span{color:var(--color-accent);font-size:17px}
@media(hover:hover){.print-stack:hover{z-index:1;transform:translateY(-8px) rotate(0deg)}.print-stack:hover .print-stack-back{transform:rotate(11deg) translateX(6px)}.print-stack:hover .print-stack-back--far{transform:rotate(-11deg) translateX(-5px)}}
.print-stack:focus-visible{z-index:1}
@media(max-width:1200px){.print-stacks{--stack-gap:40px;padding-block:60px}.print-stack{flex-basis:calc((100% - var(--stack-gap)) / 2)}.print-stack:nth-child(3n+2){margin-top:0}.print-stack:nth-child(even){margin-top:65px}}
@media(max-width:600px){.print-stacks{--stack-gap:48px;padding-block:50px 60px}.print-stack{flex-basis:86%;max-width:370px}.print-stack:nth-child(even){margin-top:30px}.print-stack-front,.print-stack-back{padding:9px 9px 0}.print-stack-caption{padding:13px 3px}.print-stack-back{padding-bottom:30px}.album-scroll-controls .scroll-caption{display:none}}
@media(prefers-reduced-motion:reduce){.print-stack,.print-stack-back{transition:none}}
</style>
