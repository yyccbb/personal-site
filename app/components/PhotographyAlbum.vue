<script setup lang="ts">
import type { PhotoAlbum } from '../../shared/types/photography'
defineProps<{ album: PhotoAlbum }>()
defineEmits<{ view: [index: number] }>()
const { t } = useSitePreferences()
const tilts = [-2, 2, 0, -1, 3, -2]
</script>

<template>
  <section class="album-gallery print-album" :aria-label="t('Photographs')">
    <p class="album-invitation">{{ t('Scroll to wander') }} <span aria-hidden="true">↓</span></p>
    <div class="loose-prints">
      <button v-for="(photo, index) in album.photos" :key="photo.id" class="photo-trigger loose-print" :class="{ 'loose-print--portrait': photo.height > photo.width }" :style="{ '--tilt': `${tilts[index % tilts.length]}deg` }" :aria-label="t('View photograph {number}').replace('{number}', String(index + 1))" @click="$emit('view', index)">
        <PhotoImage :photo="photo" :eager="index < 2" sizes="(max-width: 600px) 85vw, 42vw" /><span class="loose-print-caption"><span>{{ String(index + 1).padStart(2, '0') }}</span><span aria-hidden="true">↗</span></span>
      </button>
    </div>
    <div class="gallery-footnote"><span>{{ t('A collection of moments, kept in photographs.') }}</span><span aria-hidden="true">↥</span></div>
  </section>
</template>

<style scoped>
.album-invitation{display:flex;justify-content:space-between;margin:0;padding:0 0 20px;border-bottom:1px solid var(--color-border);font-size:11px;color:var(--color-muted)}
.loose-prints{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));align-items:start;gap:80px 65px;padding:55px 18px 60px}
.loose-print{padding:12px 12px 0;background:var(--color-background);border:1px solid var(--color-border);box-shadow:0 7px 18px color-mix(in srgb,var(--color-shadow) 35%,transparent);transform:rotate(var(--tilt));transition:transform .35s;width:100%}
.loose-print:nth-child(even){margin-top:85px}
.loose-print--portrait{width:80%;justify-self:center}
.loose-print-caption{display:flex;justify-content:space-between;align-items:center;padding:14px 2px;font-size:10px;letter-spacing:.1em;color:var(--color-muted)}
.loose-print-caption>span:last-child{font-size:17px;color:var(--color-accent)}
@media(hover:hover){.loose-print:hover{transform:rotate(0deg) translateY(-4px)}}
@media(max-width:600px){.loose-prints{grid-template-columns:1fr;gap:40px;padding:36px 8px 32px}.loose-print:nth-child(even){margin-top:0}.loose-print{padding:9px 9px 0}}
@media(prefers-reduced-motion:reduce){.loose-print{transition:none}}
</style>
