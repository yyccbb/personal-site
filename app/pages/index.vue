<script setup lang="ts">
const { posts, profile } = useSiteContent()
const { t } = useSitePreferences()

useHead({ title: () => `${t('About')} — ${profile.value.displayName}` })
</script>

<template>
  <div class="editorial-page about-page">
    <div class="eyebrow"><span class="eyebrow-line" />{{ t("About / 001") }}</div>
    <section class="about-hero">
      <div class="hero-copy">
        <p class="small-intro profile-greeting">{{ t("Hello, I'm {name}.").replace('{name}', profile.displayName) }}</p>
        <h1 class="personal-tags">
          <span v-for="(tag, index) in profile.tags" :key="tag.id" class="personal-tag" :class="`personal-tag--${tag.id}`" :style="{ '--tag-delay': `${index * 120}ms` }">
            <span class="personal-tag-card">
              <span class="personal-tag-index" aria-hidden="true">0{{ index + 1 }}</span>
              <span class="personal-tag-label">{{ tag.label }}</span>
            </span>
          </span>
        </h1>
        <p class="hero-lede">{{ profile.introduction }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink class="pill-link" to="/blogs">{{ t("Explore my writing") }} <span>↗</span></NuxtLink>
          <a class="text-link" :href="`mailto:${profile.email}`">{{ t("Say hello") }} <span>↗</span></a>
        </div>
      </div>
      <figure class="portrait-frame">
        <img :src="profile.image.src" :alt="profile.image.alt" width="1280" height="853" />
        <figcaption>{{ t("Fig. 01 — Portrait") }}</figcaption>
      </figure>
    </section>
    <section class="about-details section-divider">
      <p class="section-index">{{ t("A little about me") }} <span>↘</span></p>
      <div>
        <h2>{{ t("Curious by design.") }}<br><em>{{ t("Considered") }}</em> {{ t("by default.") }}</h2>
        <p>{{ profile.biography }}</p>
        <p>{{ profile.aside }}</p>
        <div class="detail-row"><span>{{ t("Currently") }}</span><strong>{{ t("Available for select collaborations") }}</strong></div>
        <div class="detail-row"><span>{{ t("Based in") }}</span><strong>{{ profile.location }}</strong></div>
      </div>
    </section>
    <section class="latest-section section-divider">
      <div class="section-heading"><p class="section-index">{{ t("From the journal") }}</p><NuxtLink class="text-link" to="/blogs">{{ t("All writing ↗") }}</NuxtLink></div>
      <NuxtLink v-for="post in posts" :key="post.slug" :to="`/blogs/${post.slug}`" class="latest-row">
        <span>{{ post.date }}</span><strong>{{ post.title }}</strong><span class="latest-arrow">↗</span>
      </NuxtLink>
    </section>
  </div>
</template>
