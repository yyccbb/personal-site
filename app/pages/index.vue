<script setup lang="ts">
const { posts, profile } = useSiteContent()
const { t } = useSitePreferences()

useHead({ title: () => t('About') + ' — Alex Chen' })
</script>

<template>
  <div class="editorial-page about-page">
    <div class="eyebrow"><span class="eyebrow-line" />{{ t("About / 001") }}</div>
    <section class="about-hero">
      <div class="hero-copy">
        <p class="small-intro">{{ t("Hello, I'm Alex.") }}</p>
        <h1>{{ t("Making room") }}<br>{{ t("for") }} <em>{{ t("better") }}</em><br>{{ t("things.") }}</h1>
        <p class="hero-lede">{{ profile.introduction }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink class="pill-link" to="/blogs">{{ t("Explore my writing") }} <span>↗</span></NuxtLink>
          <a class="text-link" :href="`mailto:${profile.email}`">{{ t("Say hello") }} <span>↗</span></a>
        </div>
      </div>
      <figure class="portrait-frame">
        <img src="/profile-editorial.svg" :alt="t('Portrait placeholder for Alex Chen')" />
        <figcaption><span>{{ t("Fig. 01 — A portrait to come") }}</span><span>{{ t("Brooklyn, 2026") }}</span></figcaption>
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
