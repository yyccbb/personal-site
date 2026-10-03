<script setup lang="ts">
import { reading } from '~/content/site'

useHead({ title: 'Reading — Alex Chen' })
const current = reading.filter(item => item.status === 'Reading')
const finished = reading.filter(item => item.status === 'Finished')
</script>

<template>
  <div class="editorial-page reading-page">
    <div class="eyebrow"><span class="eyebrow-line" />Library / 003</div>
    <header class="page-intro"><p class="small-intro">The open shelf</p><h1>What I'm<br><em>reading.</em></h1><p>A changing collection of books and articles that have given me something to think about.</p></header>
    <section class="reading-group"><div class="reading-heading"><h2>On my desk</h2><span>Currently reading / 0{{ current.length }}</span></div><div v-for="item in current" :key="item.title" class="reading-entry"><span class="reading-kind">{{ item.kind }} · {{ item.year }}</span><div><h3>{{ item.title }}</h3><p>{{ item.creator }}</p></div><p class="reading-note">{{ item.note }}</p></div></section>
    <section class="reading-group"><div class="reading-heading"><h2>Recently finished</h2><span>From the archive / 0{{ finished.length }}</span></div><div v-for="item in finished" :key="item.title" class="reading-entry"><span class="reading-kind">{{ item.kind }} · {{ item.year }}</span><div><h3>{{ item.title }}</h3><p>{{ item.creator }}</p></div><p class="reading-note">{{ item.note }}</p></div></section>
  </div>
</template>
