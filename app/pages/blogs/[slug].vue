<script setup lang="ts">
const { posts, profile } = useSiteContent()
const { t } = useSitePreferences()

const route = useRoute()
const post = computed(() => posts.value.find(item => item.slug === String(route.params.slug)))
if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Post not found' })
const nextPost = computed(() => posts.value.find(item => item.slug !== post.value?.slug))
useSeoMeta({ title: () => `${post.value?.title} — ${profile.value.displayName}`, description: () => post.value?.excerpt })
</script>

<template>
  <article v-if="post" class="editorial-page article-page">
    <NuxtLink to="/blogs" class="back-link">{{ t("← Back to blogs") }}</NuxtLink>
    <header class="article-header"><p class="eyebrow"><span class="eyebrow-line" />{{ t(post.category) }} / {{ post.readingTime }}</p><h1>{{ post.title }}</h1><p class="article-deck">{{ post.excerpt }}</p><div class="article-meta"><span>{{ t("By") }} {{ profile.name }}</span><span>{{ post.date }}</span></div></header>
    <div class="article-rule" />
    <div class="article-body"><section v-for="section in post.sections" :key="section.heading"><h2>{{ section.heading }}</h2><p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p></section></div>
    <div class="article-end"><span>{{ t("Thanks for spending time here.") }}</span><NuxtLink v-if="nextPost" :to="`/blogs/${nextPost.slug}`">{{ t("Read next:") }} {{ nextPost.title }} ↗</NuxtLink></div>
  </article>
</template>
