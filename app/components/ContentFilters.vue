<script setup lang="ts">
defineProps<{
  modelValue: string
  label: string
  options: { value: string; label: string; count: number }[]
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="content-filters" role="group" :aria-label="label">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="filter-button"
      :class="{ active: modelValue === option.value }"
      :aria-pressed="modelValue === option.value"
      @click="emit('update:modelValue', option.value)"
    >
      {{ option.label }}<span class="filter-count">{{ option.count }}</span>
    </button>
  </div>
</template>
