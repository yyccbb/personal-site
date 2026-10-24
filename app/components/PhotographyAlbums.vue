<script setup lang="ts">
import type { PhotoAlbum } from '../../shared/types/photography'
import { formatAlbumCity, formatAlbumMonth } from '~/utils/photography'
defineProps<{ albums: PhotoAlbum[] }>()
defineEmits<{ open: [album: PhotoAlbum] }>()
const { t, locale } = useSitePreferences()
const tilts = [-5, 4, -3, 5, -4, 2]
</script>

<template>
  <section class="print-collection" :aria-label="t('Albums')">
    <div class="print-collection-heading"><span>{{ String(albums.length).padStart(2, '0') }} {{ t('Albums') }}</span><span aria-hidden="true">↙</span></div>
    <div class="print-stacks">
      <button v-for="(album, index) in albums" :key="album.id" class="photo-trigger print-stack" :style="{ '--tilt': `${tilts[index % tilts.length]}deg` }" :aria-label="t('Open album: {city}, {date}').replace('{city}', formatAlbumCity(album.city, locale)).replace('{date}', formatAlbumMonth(album.month, locale))" @click="$emit('open', album)">
        <span class="print-stack-back print-stack-back--far" aria-hidden="true"><PhotoImage :photo="album.photos[2] || album.cover" decorative sizes="30vw" /></span>
        <span class="print-stack-back" aria-hidden="true"><PhotoImage :photo="album.photos[1] || album.cover" decorative sizes="30vw" /></span>
        <span class="print-stack-front"><PhotoImage :photo="album.cover" :eager="index < 3" sizes="(max-width: 600px) 75vw, (max-width: 1050px) 38vw, 25vw" decorative /><span class="print-stack-caption"><span class="print-city">{{ formatAlbumCity(album.city, locale) }}</span><span class="print-meta"><time :datetime="album.month">{{ formatAlbumMonth(album.month, locale) }}</time><span aria-hidden="true">↗</span></span></span></span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.print-collection-heading{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--color-border);padding-top:16px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-muted)}
.print-collection-heading>span:last-child{font:24px Georgia,serif;color:var(--color-accent)}
.print-stacks{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:50px;row-gap:85px;padding:70px 16px 80px}
.print-stack{position:relative;isolation:isolate;align-self:center;transform:rotate(var(--tilt));transition:transform .4s ease;width:100%}
.print-stack:nth-child(3n+2){margin-top:70px}
.print-stack-front,.print-stack-back{display:block;padding:10px 10px 0;background:var(--color-background);border:1px solid var(--color-border);box-shadow:0 5px 12px color-mix(in srgb,var(--color-shadow) 35%,transparent)}
.print-stack-front{position:relative;z-index:2}
.print-stack-front :deep(.photo-image){aspect-ratio:4/3!important}
.print-stack-back{position:absolute;inset:0 3px 0 3px;transform:rotate(7deg);z-index:1;padding-bottom:30px;transition:transform .4s ease}
.print-stack-back--far{transform:rotate(-6deg);z-index:0}
.print-stack-back :deep(.photo-image){height:100%}
.print-stack-caption{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 4px;color:var(--color-muted)}
.print-city{min-width:0;overflow-wrap:anywhere;font:16px Georgia,serif;letter-spacing:-.02em;color:var(--color-text)}
.print-meta{display:flex;align-items:center;gap:14px;flex-shrink:0}
.print-meta time{font-size:10px;letter-spacing:.04em;white-space:nowrap;font-variant-numeric:tabular-nums}
.print-meta>span{color:var(--color-accent);font-size:17px}
@media(hover:hover){.print-stack:hover{transform:translateY(-8px) rotate(0deg)}.print-stack:hover .print-stack-back{transform:rotate(11deg) translateX(6px)}.print-stack:hover .print-stack-back--far{transform:rotate(-11deg) translateX(-5px)}}
@media(max-width:1200px){.print-stacks{gap:60px 40px;grid-template-columns:repeat(2,minmax(0,1fr));padding:60px 14px}.print-stack:nth-child(3n+2){margin-top:0}.print-stack:nth-child(even){margin-top:65px}}
@media(max-width:600px){.print-stacks{grid-template-columns:1fr;gap:65px;padding:50px 25px 60px}.print-stack{max-width:370px;justify-self:center}.print-stack:nth-child(even){margin-top:0}.print-stack-front,.print-stack-back{padding:9px 9px 0}.print-stack-caption{padding:13px 3px}.print-stack-back{padding-bottom:30px}}
@media(prefers-reduced-motion:reduce){.print-stack,.print-stack-back{transition:none}}
</style>
