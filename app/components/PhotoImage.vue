<script setup lang="ts">
import type { Photograph } from '../../shared/types/photography'
import { photoUrl, photoSources } from '~/utils/photography'

const props = withDefaults(defineProps<{ photo: Photograph; sizes?: string; eager?: boolean; decorative?: boolean }>(), { sizes: '(max-width: 760px) 90vw, 50vw', eager: false, decorative: false })
const { t } = useSitePreferences()
const failed = ref(false)
watch(() => props.photo.url, () => { failed.value = false })
</script>

<template>
  <span class="photo-image" :class="{ 'photo-image--failed': failed }" :style="{ aspectRatio: `${photo.width} / ${photo.height}` }">
    <img v-if="!failed" :src="photoUrl(photo.url, 960)" :srcset="photoSources(photo.url)" :sizes="sizes" :alt="decorative ? '' : photo.alt" :width="photo.width" :height="photo.height" :loading="eager ? 'eager' : 'lazy'" :fetchpriority="eager ? 'high' : 'auto'" decoding="async" draggable="false" @error="failed = true">
    <span v-else class="photo-image-fallback">{{ t('Image unavailable') }}</span>
  </span>
</template>

<style scoped>
.photo-image{display:block;position:relative;width:100%;overflow:hidden;background:var(--color-surface)}
img{display:block;width:100%;height:100%;object-fit:cover}
.photo-image-fallback{display:grid;place-items:center;min-height:100%;padding:24px;font-size:12px;color:var(--color-muted)}
</style>
