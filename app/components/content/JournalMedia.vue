<script setup lang="ts">
defineProps<{
  kind: 'image' | 'video' | 'audio'
  src: string
  alt?: string
  caption?: string
  poster?: string
}>()
</script>

<template>
  <figure class="journal-media">
    <img v-if="kind === 'image'" :src="src" :alt="alt ?? caption ?? ''" loading="lazy" />
    <video v-else-if="kind === 'video'" :src="src" :poster="poster" :aria-label="caption" controls preload="metadata" playsinline />
    <audio v-else-if="kind === 'audio'" :src="src" :aria-label="caption" controls preload="metadata" />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
