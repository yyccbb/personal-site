<script setup lang="ts">
import { posts } from '~/content/site'

useHead({ title: 'Blogs — Alex Chen' })
</script>

<template>
  <div class="editorial-page listing-page">
    <div class="eyebrow"><span class="eyebrow-line" />Journal / 002</div>
    <header class="page-intro"><p class="small-intro">Occasional notes</p><h1>Ideas in<br><em>progress.</em></h1><p>Short essays about design, making things, and paying attention along the way.</p></header>
    <section class="post-list" aria-label="Blog posts">
      <NuxtLink v-for="(post, index) in posts" :key="post.slug" :to="`/blogs/${post.slug}`" class="post-card">
        <div class="post-card-top"><span>0{{ index + 1 }} / {{ post.category }}</span><span>{{ post.date }}</span></div>
        <h2>{{ post.title }}</h2><p>{{ post.excerpt }}</p>
        <div class="post-card-bottom"><span>{{ post.readingTime }}</span><span class="round-arrow" aria-hidden="true">↗</span></div>
      </NuxtLink>
    </section>
    <p class="end-note">More notes are on their way. Thanks for reading.</p>
  </div>
</template>
