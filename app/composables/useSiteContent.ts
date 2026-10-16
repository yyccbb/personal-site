import { englishContent } from '~/content/site'
import { chineseContent } from '~/content/zh'

export function useSiteContent() {
  const { locale } = useSitePreferences()
  const content = computed(() => locale.value === 'zh' ? chineseContent : englishContent)
  return {
    profile: computed(() => content.value.profile),
    reading: computed(() => content.value.reading),
  }
}
