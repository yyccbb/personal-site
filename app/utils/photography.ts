import { photographyCitiesZh } from '~/content/photography'

export function formatAlbumCity(city: string, locale: 'en' | 'zh') {
  return locale === 'zh' ? (photographyCitiesZh[city.toLowerCase()] || city) : city
}

export function formatAlbumMonth(month: string, locale: 'en' | 'zh') {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en', {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(`${month}-01T00:00:00Z`))
}

export function photoUrl(source: string, width: number) {
  const url = new URL(source)
  url.searchParams.set('tr', `w-${width},c-at_max,q-85,f-auto`)
  return url.href
}

export function photoSources(source: string) {
  return [320, 640, 960, 1440, 2000].map(width => `${photoUrl(source, width)} ${width}w`).join(', ')
}
