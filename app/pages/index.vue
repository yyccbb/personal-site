<script setup lang="ts">
const { profile } = useSiteContent()
const { t, locale } = useSitePreferences()
const { posts, ready, error } = useJournal()
await ready
if (error.value) throw error.value

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
        <div class="hero-actions flex flex-wrap items-center gap-3">
          <NuxtLink class="pill-link button-primary" to="/blogs">{{ t("Browse my journal") }} <span aria-hidden="true">↗</span></NuxtLink>
          <ContactLinks :email="profile.email" variant="static" />
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
        <h2>
          <em>{{ t("Research") }}</em>{{ locale === 'zh' ? '，' : ',' }}<br>
          {{ t("and the") }}{{ locale === 'zh' ? '' : ' ' }}<em>{{ t("life") }}</em>{{ locale === 'zh' ? '' : ' ' }}{{ t("around it.") }}
        </h2>
        <p>{{ [profile.biography, profile.workingStyle].join(locale === 'zh' ? '' : ' ') }}</p>
        <p>{{ profile.aside }}</p>
        <p>{{ profile.personalInterests }}</p>
        <p>{{ profile.connectionInvitation }}</p>
      </div>
    </section>
    <section class="latest-section section-divider">
      <div class="section-heading"><p class="section-index">{{ t("From the journal") }}</p><NuxtLink class="pill-link button-primary" to="/blogs">{{ t("All entries") }} <span aria-hidden="true">↗</span></NuxtLink></div>
      <NuxtLink v-for="post in posts" :key="post.slug" :to="`/blogs/${post.slug}`" class="latest-row">
        <span>{{ post.date }}</span><strong>{{ post.title }}</strong><span class="latest-arrow">↗</span>
      </NuxtLink>
    </section>
  </div>
</template>
