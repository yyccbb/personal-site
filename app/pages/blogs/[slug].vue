<script setup lang="ts">
definePageMeta({ key: route => String(route.params.slug) })

const { profile } = useSiteContent()
const { t } = useSitePreferences()
const { posts, ready, error } = useJournal()
await ready
if (error.value) throw error.value

const route = useRoute()
const router = useRouter()
const post = computed(() => posts.value.find(item => item.slug === String(route.params.slug)))
if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Post not found' })
const { data: article, error: articleError } = await useAsyncData(
  () => `journal-article:${post.value?.language}:${post.value?.slug}`,
  () => {
    if (!post.value) return Promise.resolve(null)
    return queryCollection(post.value.language === 'zh' ? 'journalZh' : 'journalEn').path(post.value.path).first()
  },
)
if (articleError.value) throw articleError.value
if (!article.value) throw createError({ statusCode: 404, statusMessage: 'Post not found' })
const postIndex = computed(() => posts.value.findIndex(item => item.slug === post.value?.slug))

function adjacentPost(direction: -1 | 1) {
  if (postIndex.value < 0 || posts.value.length < 2) return undefined
  return posts.value[(postIndex.value + direction + posts.value.length) % posts.value.length]
}

const previousPost = computed(() => adjacentPost(-1))
const nextPost = computed(() => adjacentPost(1))

function onArticleKeydown(event: KeyboardEvent) {
  if (event.defaultPrevented || event.repeat || !event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
  const target = event.target
  if (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select, [role="textbox"]'))) return
  const destination = event.key === 'ArrowLeft' ? previousPost.value : nextPost.value
  if (!destination) return
  event.preventDefault()
  router.push(`/blogs/${destination.slug}`)
}

onMounted(() => window.addEventListener('keydown', onArticleKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onArticleKeydown))

useSeoMeta({ title: () => `${post.value?.title} — ${profile.value.displayName}`, description: () => post.value?.subtitle })
</script>

<template>
  <article v-if="post" class="editorial-page article-page">
    <NuxtLink to="/blogs" class="pill-link button-primary back-link"><span aria-hidden="true">←</span>{{ t("Back to journal") }}</NuxtLink>
    <header class="article-header"><p class="eyebrow"><span class="eyebrow-line" />{{ t(post.category) }} / {{ post.readingTime }}</p><h1>{{ post.title }}</h1><p class="article-deck">{{ post.subtitle }}</p><div class="article-meta"><span>{{ t("By") }} {{ post.author }}</span><time :datetime="post.publishedAt">{{ post.date }}</time></div></header>
    <div class="article-rule" />
    <ContentRenderer v-if="article" :key="article.id" :value="article" class="article-body" :lang="post.language" />
    <nav v-if="previousPost || nextPost" class="article-end" :aria-label="t('Article navigation')">
      <NuxtLink v-if="previousPost" class="article-nav-link" :to="`/blogs/${previousPost.slug}`" rel="prev" aria-keyshortcuts="Shift+ArrowLeft" :title="t('Previous article (Shift + Left Arrow)')">
        <span class="article-nav-meta">
          <span class="article-nav-shortcut" aria-hidden="true"><kbd>Shift</kbd><span>+</span><kbd>←</kbd></span>
          <span class="article-nav-label">{{ t('Previous') }}</span>
        </span>
        <span class="article-nav-title">{{ previousPost.title }}</span>
      </NuxtLink>
      <NuxtLink v-if="nextPost" class="article-nav-link article-next" :to="`/blogs/${nextPost.slug}`" rel="next" aria-keyshortcuts="Shift+ArrowRight" :title="t('Next article (Shift + Right Arrow)')">
        <span class="article-nav-meta">
          <span class="article-nav-label">{{ t('Next') }}</span>
          <span class="article-nav-shortcut" aria-hidden="true"><kbd>Shift</kbd><span>+</span><kbd>→</kbd></span>
        </span>
        <span class="article-nav-title">{{ nextPost.title }}</span>
      </NuxtLink>
    </nav>
  </article>
</template>
