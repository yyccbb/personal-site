<script setup lang="ts">
import type { Photograph } from '../../shared/types/photography'
import { photoUrl, photoSources } from '~/utils/photography'
const props = defineProps<{ photos: Photograph[]; index: number }>()
const emit = defineEmits<{ close: [] }>()
const { t } = useSitePreferences()
const current = ref(props.index)
const photo = computed(() => props.photos[current.value]!)
const dialog = useTemplateRef<HTMLDialogElement>('dialog')
let previousFocus: HTMLElement | null = null
let originalOverflow = ''
const move = (direction: number) => { current.value = (current.value + direction + props.photos.length) % props.photos.length }
function onKey(event: KeyboardEvent) {
  if (event.altKey || event.ctrlKey || event.metaKey) return
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1) }
}
onMounted(() => {
  previousFocus = document.activeElement as HTMLElement | null
  originalOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  dialog.value?.showModal()
})
onBeforeUnmount(() => {
  dialog.value?.close()
  document.body.style.overflow = originalOverflow
  previousFocus?.focus({ preventScroll: true })
})
</script>

<template>
  <Teleport to="body">
    <dialog ref="dialog" class="photo-viewer" :aria-label="t('Photograph {number}').replace('{number}', String(current + 1))" @cancel.prevent="emit('close')" @keydown="onKey" @click.self="emit('close')">
      <div class="viewer-top"><span>{{ String(current + 1).padStart(2, '0') }} / {{ String(photos.length).padStart(2, '0') }}</span><button class="button-surface button-circle" :aria-label="t('Close photograph')" autofocus @click="emit('close')">×</button></div>
      <img :key="photo.id" :src="photoUrl(photo.url, 2000)" :srcset="photoSources(photo.url)" sizes="95vw" :alt="photo.alt || t('Photograph {number}').replace('{number}', String(current + 1))" :width="photo.width" :height="photo.height">
      <div class="viewer-bottom"><button class="button-surface button-circle" :disabled="photos.length < 2" :aria-label="t('Previous photograph')" @click="move(-1)">←</button><p>{{ photo.alt }}</p><button class="button-surface button-circle" :disabled="photos.length < 2" :aria-label="t('Next photograph')" @click="move(1)">→</button></div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.photo-viewer{position:fixed;inset:0;border:0;width:100vw;max-width:none;height:100dvh;max-height:none;margin:0;padding:20px 32px;background:var(--color-background);color:var(--color-text)}
.photo-viewer[open]{display:grid;grid-template-rows:44px minmax(0,1fr) 48px;gap:16px}
.photo-viewer::backdrop{background:var(--color-background)}
.viewer-top,.viewer-bottom{display:flex;justify-content:space-between;align-items:center;gap:20px}
.viewer-top>span{font-size:11px;letter-spacing:.15em;font-variant-numeric:tabular-nums}
.photo-viewer>img{width:100%;height:100%;min-height:0;object-fit:contain}
.viewer-bottom p{font-size:12px;color:var(--color-muted);text-align:center;max-width:70ch;overflow:auto;max-height:48px}
.button-circle{width:40px;height:40px;flex-shrink:0;font-size:20px;cursor:pointer}
.button-circle:disabled{opacity:.35;cursor:default}
@media(max-width:760px){.photo-viewer{padding:14px}.photo-viewer[open]{gap:12px}}
</style>
