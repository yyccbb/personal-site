<script setup lang="ts">
import { posts, profile } from '~/content/site'

useHead({ title: 'About — Alex Chen' })
</script>

<template>
  <div class="editorial-page about-page">
    <div class="eyebrow"><span class="eyebrow-line" />About / 001</div>
    <section class="about-hero">
      <div class="hero-copy">
        <p class="small-intro">Hello, I'm Alex.</p>
        <h1>Making room<br>for <em>better</em><br>things.</h1>
        <p class="hero-lede">{{ profile.introduction }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink class="pill-link" to="/blogs">Explore my writing <span>↗</span></NuxtLink>
          <a class="text-link" :href="`mailto:${profile.email}`">Say hello <span>↗</span></a>
        </div>
      </div>
      <figure class="portrait-frame">
        <img src="/profile-editorial.svg" alt="Illustrated portrait placeholder for Alex Chen" />
        <figcaption><span>Fig. 01 — A portrait to come</span><span>Brooklyn, 2026</span></figcaption>
      </figure>
    </section>
    <section class="about-details section-divider">
      <p class="section-index">A little about me <span>↘</span></p>
      <div>
        <h2>Curious by design.<br><em>Considered</em> by default.</h2>
        <p>{{ profile.biography }}</p>
        <p>{{ profile.aside }}</p>
        <div class="detail-row"><span>Currently</span><strong>Available for select collaborations</strong></div>
        <div class="detail-row"><span>Based in</span><strong>{{ profile.location }}</strong></div>
      </div>
    </section>
    <section class="latest-section section-divider">
      <div class="section-heading"><p class="section-index">From the journal</p><NuxtLink class="text-link" to="/blogs">All writing ↗</NuxtLink></div>
      <NuxtLink v-for="post in posts" :key="post.slug" :to="`/blogs/${post.slug}`" class="latest-row">
        <span>{{ post.date }}</span><strong>{{ post.title }}</strong><span class="latest-arrow">↗</span>
      </NuxtLink>
    </section>
  </div>
</template>
