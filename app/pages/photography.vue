<script setup lang="ts">
import type { PhotoCollection, PhotoAlbum } from '../../shared/types/photography'
import { photographySiteUrl } from '~/content/photography'
const { profile } = useSiteContent()
const { t } = useSitePreferences()
const route = useRoute()
const router = useRouter()
const { data, status, error, refresh } = await useFetch<PhotoCollection>('/api/photography')
const albums = computed(() => data.value?.albums || [])
const selected = computed(() => albums.value.find(album => album.id === route.query.album))
const viewerIndex = ref<number | null>(null)
const backButton = useTemplateRef<HTMLButtonElement>('back-button')
let openedFrom: HTMLElement | null = null
let overviewScroll = 0

async function openAlbum(album: PhotoAlbum) {
  openedFrom = document.activeElement as HTMLElement
  overviewScroll = window.scrollY
  await router.push({ query: { ...route.query, album: album.id } })
}
async function closeAlbum() {
  const { album: _album, ...query } = route.query
  await router.push({ query })
}
watch(() => selected.value?.id, async (id, previousId) => {
  viewerIndex.value = null
  await nextTick()
  if (id) { window.scrollTo({ top: 0, behavior: 'instant' }); backButton.value?.focus({ preventScroll: true }) }
  else if (previousId) { window.scrollTo({ top: overviewScroll, behavior: 'instant' }); openedFrom?.focus({ preventScroll: true }) }
})
function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape' && selected.value && viewerIndex.value === null && !event.defaultPrevented) closeAlbum()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
useHead({ title: () => `${t('Photography')} — ${profile.value.displayName}` })
</script>

<template>
  <div class="editorial-page photography-page" :class="{ 'album-is-open': selected }">
    <div class="eyebrow"><span class="eyebrow-line" />{{ t('Photography / 004') }}</div>
    <header v-if="!selected" class="page-intro">
      <div class="photography-title-row">
        <h1>{{ t('Ways of') }}<br><em>{{ t('seeing.') }}</em></h1>
        <component
          :is="photographySiteUrl ? 'a' : 'button'"
          :href="photographySiteUrl || undefined"
          :type="photographySiteUrl ? undefined : 'button'"
          :aria-disabled="photographySiteUrl ? undefined : true"
          :aria-label="t(photographySiteUrl ? 'Photography site' : 'Photography site — coming soon')"
          class="pill-link button-primary photography-site-link"
        >{{ t('Photography site') }} <span aria-hidden="true">↗</span></component>
      </div>
      <p>{{ t('Between open landscapes and quiet portraits.') }}</p>
    </header>
    <header v-else class="album-toolbar"><button ref="back-button" class="pill-link button-primary" @click="closeAlbum"><span aria-hidden="true">←</span> {{ t('Back to albums') }}</button><p>{{ String(selected.photos.length).padStart(2, '0') }} {{ t('photographs') }}</p></header>
    <div v-if="status === 'pending'" class="photography-empty" role="status">{{ t('Loading photographs…') }}</div>
    <div v-else-if="error" class="photography-empty" role="status"><p>{{ t('The photographs could not be loaded.') }}</p><button class="pill-link button-primary" @click="refresh()">{{ t('Try again') }}</button></div>
    <div v-else-if="!albums.length" class="photography-empty"><span class="empty-frame" aria-hidden="true">↗</span><h2>{{ t('Photographs are on their way.') }}</h2><p>{{ t('Please come back for a closer look.') }}</p></div>
    <template v-else>
      <div v-show="!selected"><PhotographyAlbums :albums="albums" @open="openAlbum" /></div>
      <PhotographyAlbum v-if="selected" :key="selected.id" :album="selected" @view="viewerIndex = $event" />
    </template>
    <PhotoViewer v-if="selected && viewerIndex !== null" :photos="selected.photos" :index="viewerIndex" @close="viewerIndex = null" />
  </div>
</template>

<style>
.photography-page{padding-bottom:40px;max-width:1800px}
.photography-title-row{display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap}
.photography-title-row h1,.photography-site-link{flex-shrink:0}
.album-toolbar{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:28px 0 36px}
.album-toolbar p{font-size:11px;color:var(--color-muted);letter-spacing:.06em;margin:0}
.photography-page button{cursor:pointer}
.photo-trigger{display:block;border:0;padding:0;background:transparent;color:inherit;text-align:left}
.photo-trigger:focus-visible{outline:2px solid var(--color-accent);outline-offset:6px}
.photo-print-frame{background:var(--color-background);border:1px solid var(--color-border);box-shadow:var(--photo-frame-shadow,0 5px 12px color-mix(in srgb,var(--color-shadow) 35%,transparent));transition:background-color .3s,border-color .3s,box-shadow .3s,transform .4s ease}
.photo-trigger:focus-visible .photo-print-frame,.photo-trigger.photo-print-frame:focus-visible{background:var(--color-surface);border-color:var(--color-accent);box-shadow:8px 8px 0 var(--color-shadow)}
@media(hover:hover){.photo-trigger:hover .photo-print-frame,.photo-trigger.photo-print-frame:hover{background:var(--color-surface);border-color:var(--color-accent);box-shadow:8px 8px 0 var(--color-shadow)}}
@media(prefers-reduced-motion:reduce){.photo-print-frame{transition:none}}
.photography-empty{min-height:360px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:var(--color-muted);gap:12px}
.photography-empty h2{font:400 30px Georgia,serif;color:var(--color-text);margin:16px 0 0}
.photography-empty p{font-size:13px;margin:0 0 8px}
.empty-frame{width:120px;height:85px;border:1px solid var(--color-border);display:grid;place-items:center;font:32px Georgia,serif;transform:rotate(-7deg)}
@media(max-width:760px){.photography-page{padding-inline:24px}.photography-title-row{gap:20px}.album-toolbar{padding:24px 0 30px}}
@media(prefers-reduced-motion:no-preference){.album-is-open .album-gallery{animation:album-arrive .45s ease both}@keyframes album-arrive{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}}
</style>
