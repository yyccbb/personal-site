# Personal site — three directions

A Nuxt 4, Vue 3, TypeScript, and Tailwind CSS personal site. Content is local and typed in `app/content/site.ts`; the page components consume those shapes so a headless CMS adapter can replace the content source later.

## Explore

Three complete visual directions live on separate branches:

- `codex/design-01-editorial` — a warm, editorial portfolio
- `codex/design-02-studio` — a bold, graphic studio site
- `codex/design-03-journal` — a quiet, reading-led journal

Switch branches, then run `npm install` (only needed the first time), `npm run dev`, and open the local URL shown by Nuxt. Each version includes About (`/`), Blogs (`/blogs`), two full posts, and Reading (`/reading`).

`npm run build` verifies a production build. The project has no server API, database, analytics, or CMS dependency. Nuxt's standard build output can be deployed to Vercel later.
