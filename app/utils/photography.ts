export function photoUrl(source: string, width: number) {
  const url = new URL(source)
  url.searchParams.set('tr', `w-${width},c-at_max,q-85,f-auto`)
  return url.href
}

export function photoSources(source: string) {
  return [320, 640, 960, 1440, 2000].map(width => `${photoUrl(source, width)} ${width}w`).join(', ')
}
