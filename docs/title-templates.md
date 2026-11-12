# Title templates

Page and section headings live in `app/content/titles.ts`. Each stable name has
one complete string per language. The wording, punctuation, spaces, highlighting,
and line breaks belong to that language; fragments do not need to match across
translations.

```ts
journal: {
  en: 'Notes from|*everywhere.*',
  zh: '沿途的|*思考。*',
},
```

## Markers

| Marker | Result |
| --- | --- |
| `*words*` | Highlight with the heading's existing accent and italic style. |
| `\|` | Insert an explicit line break. |
| Backslash before a marker | Display a literal asterisk, pipe, or backslash. |

Use any number of highlighted spans or breaks, or omit either. A highlighted
span can cross a break: `*Notes|from* everywhere.` highlights the first two lines.
Highlight markers do not nest. An unmatched asterisk is displayed literally.
Text can still wrap naturally on narrow screens.

Write the spaces and punctuation the title needs. For example:

```ts
aboutDetails: {
  en: '*Research*,|and the *life* around it.',
  zh: '*研究*，|以及研究之外的*生活*。',
},
```

Both translations can use different structures. For example, changing only the
Chinese journal template to `*沿途*的思考。` makes it one line and highlights a
different phrase, without changing the English version or the page component.

JavaScript strings require a doubled backslash for literal escapes:

```ts
en: 'A literal \\*asterisk\\* and \\| pipe.',
```

## Rendering

Use the stable name in the page, independent of the English wording:

```vue
<TemplatedTitle name="journal" />
<TemplatedTitle name="aboutDetails" as="h2" />
```

The component defaults to `h1`; `as` accepts `h1` through `h6`. It updates when
the selected language changes and renders text, `<em>`, and `<br>` nodes within
the heading. It adds no wrapper and reuses the existing heading styles. HTML in
title strings is displayed as text, so content does not need raw HTML.

Add future headings to `titleTemplates` with both `en` and `zh` strings. The
component's name and language types catch misspelled names and missing
translations during type checking. Navigation labels and browser tab titles
continue to use the ordinary interface translations in `translations.ts`.
