export type TitleToken =
  | { type: 'text' | 'highlight'; text: string }
  | { type: 'break' }

export function parseTitleTemplate(template: string): TitleToken[] {
  // Keep escaped symbols together so they cannot become formatting markers.
  const parts = template.split(/(\\[*|\\]|\*|\|)/g)
  const tokens: TitleToken[] = []
  let highlighted = false

  for (let index = 0; index < parts.length; index++) {
    const part = parts[index]!
    if (!part) continue

    // An unmatched opening marker stays visible as ordinary text.
    if (part === '*' && (highlighted || parts.indexOf('*', index + 1) !== -1)) {
      highlighted = !highlighted
      continue
    }

    if (part === '|') {
      tokens.push({ type: 'break' })
      continue
    }

    tokens.push({
      type: highlighted ? 'highlight' : 'text',
      text: part.replace(/^\\([*|\\])$/, '$1'),
    })
  }

  return tokens
}
