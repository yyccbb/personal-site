<script setup lang="ts">
import { getPost, posts } from '~/content/site'

const route = useRoute()
const post = getPost(String(route.params.slug))
if (!post) throw createError({ statusCode: 404, statusMessage: 'Post not found' })
const nextPost = posts.find(item => item.slug !== post.slug)
useHead({ title: `${post.title} — Alex Chen`, meta: [{ name: 'description', content: post.excerpt }] })
</script>

<template>
  <article class="editorial-page article-page">
    <NuxtLink to="/blogs" class="back-link">← Back to writing</NuxtLink>
    <header class="article-header"><p class="eyebrow"><span class="eyebrow-line" />{{ post.category }} / {{ post.readingTime }}</p><h1>{{ post.title }}</h1><p class="article-deck">{{ post.excerpt }}</p><div class="article-meta"><span>By Alex Chen</span><span>{{ post.date }}</span></div></header>
    <div class="article-rule" />
    <div class="article-body"><section v-for="section in post.sections" :key="section.heading"><h2>{{ section.heading }}</h2><p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p></section></div>
    <div class="article-end"><span>Thanks for spending time here.</span><NuxtLink v-if="nextPost" :to="`/blogs/${nextPost.slug}`">Read next: {{ nextPost.title }} ↗</NuxtLink></div>
  </article>
</template>
