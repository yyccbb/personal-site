<script setup lang="ts">
import type { PhotoCollection, PhotoAlbum } from '../../shared/types/photography'
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
    <header v-if="!selected" class="photography-intro"><div><p class="photography-kicker">{{ t('Collected light') }}</p><h1>{{ t('Ways of') }} <em>{{ t('seeing.') }}</em></h1></div><p class="photography-lede">{{ t('Between open landscapes and quiet portraits.') }}<span>{{ t('Choose a photograph. Step into a memory.') }}</span></p></header>
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
.photography-intro{padding:40px 0 50px;display:flex;align-items:flex-end;justify-content:space-between;gap:32px}
.photography-kicker{font-size:10px;text-transform:uppercase;letter-spacing:.2em;color:var(--color-accent);margin:0 0 16px}
.photography-intro h1{font-family:Georgia,serif;font-size:clamp(44px,5.4vw,80px);font-weight:400;line-height:1.04;letter-spacing:-.055em;margin:0}
.photography-intro h1 em{font-weight:400;color:var(--color-accent)}
.photography-lede{max-width:235px;color:var(--color-body);font-size:13px;line-height:1.7;margin:0 0 4px}
.photography-lede span{display:block;font-size:11px;color:var(--color-muted);margin-top:8px}
.album-toolbar{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:28px 0 36px}
.album-toolbar p{font-size:11px;color:var(--color-muted);letter-spacing:.06em;margin:0}
.photography-page button{cursor:pointer}
.photo-trigger{display:block;border:0;padding:0;background:transparent;color:inherit;text-align:left}
.photo-trigger:focus-visible{outline:2px solid var(--color-accent);outline-offset:6px}
.photography-empty{min-height:360px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:var(--color-muted);gap:12px}
.photography-empty h2{font:400 30px Georgia,serif;color:var(--color-text);margin:16px 0 0}
.photography-empty p{font-size:13px;margin:0 0 8px}
.empty-frame{width:120px;height:85px;border:1px solid var(--color-border);display:grid;place-items:center;font:32px Georgia,serif;transform:rotate(-7deg)}
.gallery-footnote{display:flex;justify-content:space-between;gap:16px;padding-top:22px;margin-top:24px;border-top:1px solid var(--color-border);font-size:10px;letter-spacing:.1em;color:var(--color-muted)}
@media(max-width:1050px){.photography-intro{align-items:flex-start;flex-direction:column;gap:20px}.photography-lede{max-width:none}.photography-lede span{display:none}}
@media(max-width:760px){.photography-page{padding-inline:24px}.photography-intro{padding:32px 0 36px;gap:16px}.photography-intro h1{font-size:clamp(44px,10vw,68px)}.photography-kicker{margin-bottom:12px}.album-toolbar{padding:24px 0 30px}.gallery-footnote{letter-spacing:.03em}}
@media(prefers-reduced-motion:no-preference){.album-is-open .album-gallery{animation:album-arrive .45s ease both}@keyframes album-arrive{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}}
</style>
