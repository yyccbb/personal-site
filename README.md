# Personal site

A Nuxt 4, Vue 3, TypeScript, and Tailwind CSS personal site. Profile and Reading content are local and typed in `app/content/site.ts` and `app/content/zh.ts`. Journal articles live in individual Markdown files, queried and rendered by Nuxt Content.

## Explore

The site uses an editorial design, with horizontal image-ready blog cards, category filters, and a notebook-inspired reading shelf. Run `npm ci` the first time, then `npm run dev`, and open the local URL shown by Nuxt.

Blogs starts with **All** and can filter by **Research** or **Travelling**. Reading filters by **All**, **Book**, **Paper**, or **Article**. Both use the same filter component and styling. Blog cards scroll horizontally using swipe, a trackpad, left/right arrow keys anywhere on the Blogs page, or arrow buttons.

Journal articles use the same filled, rounded **Back to journal** button style as **Browse my journal**, along with smaller responsive titles. Previous/next links keep their direction labels and boxed shortcut keys on the same row at every screen size. Article titles below use 18px text on desktop and 14px at widths of 600px or less, and wrap within each column. The links follow the journal order and wrap at either end. **Shift + Left Arrow** opens the previous article; **Shift + Right Arrow** opens the next. These shortcuts ignore editable fields and are active only on article pages.

About, Journal, and Reading share spacing values in `main.css`: 8px for close metadata, 16px between text blocks, 24px between related content, and 40px around sections (32px on mobile). About's hero follows its content height; Journal and Reading share the same intro spacing. Journal article pages use a separate reading rhythm and English/Chinese serif type hierarchy. Portrait framing, card hover clearance, reading timeline spacing, and control dimensions retain their own layout requirements.

Blog cards without an image show a blank frame. To add one, put your image under `public/journal/<slug>/` and add the optional `image` field to the article's frontmatter in each translation, as shown below. The shorter 5:2 frame sits flush against the left edge with a 24px inset on the right. Categories are stable lowercase keys (`research` and `travelling`), with translated display labels.

Desktop appearance and language controls sit side by side as sliders, with Light/English on the left and Dark/简体中文 on the right. Their height follows the responsive contact button. Sun/moon and A/文 icons show the current selection, using the category filters’ shared colors. Mobile uses circular buttons with the same icons and click-to-toggle behavior. The default appearance follows the system, with no third button state; a system appearance change resumes automatic following after a manual toggle. Cookies retain manual choices between visits and provide the correct language during server rendering. A small inline script applies the appearance before rendering to avoid a bright flash. No preference library or translation service is required.

English and Chinese profile and Reading content live in `app/content/site.ts` and `app/content/zh.ts`. Interface translations live in `app/content/translations.ts`; `useSiteContent` supplies reactive profile and Reading content, and `useJournal` supplies journal metadata for either language. Reading metadata links to primary sources.

Page and section headings use complete, independently editable English and Chinese strings in `app/content/titles.ts`. Use `*words*` for highlighting and `|` for a line break; see [Title templates](docs/title-templates.md) for examples and component usage.

Every Reading entry includes an image: the book cover for books, a conference or source logo for papers, and the source logo for articles. Personal sources without an official logo use a simple source-name or domain wordmark. Keep assets under `public/reading/`, with `image.src` and translated `image.alt` in both content files. `finishedAt` stores the reading completion month as `YYYY-MM`, independently of the work's publication date. See [Reading image sources](docs/reading-images.md) for asset provenance.

`npm run typecheck` checks TypeScript, and `npm run build` verifies a production build. Nuxt Content maintains an internal SQLite index and provides its article query endpoints; no external database, analytics, or CMS account is required. Nuxt's standard build output can be deployed to Vercel later.

## Photography

Photography uses overlapping print stacks at `/photography`, with automatic ImageKit album discovery. Configure the read-only server key using `.env.example`, and tag one cover photograph per `/Gallery` folder with `album-cover`. Album cards show the city and month parsed from folder names such as `20261005_Nanjing`. Chinese city translations and the future photography-site link live in `app/content/photography.ts`. See [Photography setup](docs/photography.md) for details.

## Writing journal articles

Create files in `content/journal/en/` or `content/journal/zh/`, using `YYYY-MM-DD-slug.md`. For example, `2026-11-11-a-conversation-about-dglight.md` is served at `/blogs/a-conversation-about-dglight`. Both translations must use the same filename and publication date. Each slug must be unique within a language. Articles appear newest first, with the slug breaking date ties.

The selected language takes priority. If its translation is missing, the site shows the available article version and keeps the interface, date, and reading-time labels in the selected language. You can publish an article with just one language version.

Each article begins with YAML frontmatter:

```md
---
title: "What a good evaluation can still miss"
subtitle: "A few reflections on capabilities, benchmarks, and scores."
author: "YU Chenbo"
date: "2026-09-18"
category: research
readingMinutes: 5
image:
  src: /journal/a-conversation-about-dglight/cover.jpg
  alt: "A description of the cover image"
---

## Start with the question

Write paragraphs separated by blank lines. Use **bold**, *italic*, and
[links](https://example.com) as needed.

### A closer look

Use subsections, lists, quotations, and fenced code blocks when useful.

![A description of the image](/journal/a-conversation-about-dglight/photo.jpg)
```

`title`, `subtitle`, `date`, `category`, and `readingMinutes` are required. The subtitle also supplies card summaries and SEO descriptions. Dates must be valid ISO calendar dates and match the filename prefix. Categories are `research` or `travelling`; reading minutes must be a positive integer and are set manually. `author` defaults to the profile name in the article's language. The optional `image` field supplies the journal card image and requires `src` and `alt`.

Use `##` for section headings and `###` for subsections. The page already renders the article title, so do not repeat it as a `#` heading. Metadata validation runs before builds and reports the filename when it fails; development parsing also validates edited articles.

### Images, video, and audio

Store local assets under `public/journal/<slug>/` and reference them using `/journal/<slug>/...` URLs. Direct HTTPS media URLs, including a future CMS's public asset URLs, also work. Relative paths beside Markdown files are not served automatically.

Standard Markdown images use their description as alt text. For captions, video, or audio, use the shared media component:

```md
::journal-media{kind="image" src="/journal/my-article/photo.jpg" alt="A quiet street in Kyoto" caption="An afternoon walk."}
::

::journal-media{kind="video" src="/journal/my-article/clip.mp4" poster="/journal/my-article/poster.jpg" caption="A short demonstration."}
::

::journal-media{kind="audio" src="/journal/my-article/recording.mp3" caption="A short recording."}
::
```

Media scales to the article width. Video and audio have native playback controls, preload metadata, and do not autoplay. URLs must point to media files rather than video-service watch pages. Connecting a CMS or embedding external players is deferred.

## Color scheme

The site shares theme colors in `app/assets/css/colors.css` and button recipes in `app/assets/css/buttons.css`. Main text supplies filled button backgrounds; the page background supplies their text. Controls that are light in light mode and dark in dark mode share the opposite palette. Focus outlines share the accent. Inactive navigation and blank blog image areas remain paired, and the card hover shadow keeps its own color. [Button styles](docs/button-styles.md) documents usage, responsive sizing, and deliberate exceptions; `AGENTS.md` points future agents to that reference.

| Role | Light | Dark |
| --- | --- | --- |
| Page / idle cards / inverse text | `#F4F0E9` | `#171B18` |
| Primary text / filled controls / surface button icons | `#2E302C` | `#E8E8DF` |
| Body text | `#55574F` | `#B9C7B6` |
| Metadata / captions / footer | `#66685F` | `#A4B09F` |
| Inactive tabs / blank images | `#89857C` | `#A4B09F` |
| Accent / focus outlines | `#A56850` | `#D5A88F` |
| Borders / dividers | `#CBC4B8` | `#485745` |
| Hover surfaces / reading markers / portrait backing | `#E8DED1` | `#263024` |
| Card hover shadow | `#D3C4B4` | `#61755D` |
| Text selection background | `#E0B19C` | `#E0B19C` |
| Text selection foreground | `#272822` | `#272822` |
