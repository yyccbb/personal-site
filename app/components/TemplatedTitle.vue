<script setup lang="ts">
import { titleTemplates, type TitleName } from '~/content/titles'
import { parseTitleTemplate } from '~/utils/title-template'

const props = withDefaults(defineProps<{
  name: TitleName
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}>(), { as: 'h1' })

const { locale } = useSitePreferences()
const tokens = computed(() => parseTitleTemplate(titleTemplates[props.name][locale.value]))
</script>

<template>
  <component :is="as">
    <template v-for="(token, index) in tokens" :key="index">
      <br v-if="token.type === 'break'">
      <em v-else-if="token.type === 'highlight'">{{ token.text }}</em>
      <template v-else>{{ token.text }}</template>
    </template>
  </component>
</template>
