# Personal site — five directions

A Nuxt 4, Vue 3, TypeScript, and Tailwind CSS personal site. Content is local and typed in `app/content/site.ts`; the page components consume those shapes so a headless CMS adapter can replace the content source later.

## Explore

Five complete visual directions live on separate branches. `main` is the shared foundation; switch to a design branch to run the website.

- `codex/design-01-editorial` — a warm, editorial portfolio
- `codex/design-02-studio` — a bold, graphic studio site
- `codex/design-03-journal` — a quiet, reading-led journal
- `codex/design-04-research-notebook` — an academic notebook with restrained serif type, research topics, and a chronological writing index
- `codex/design-05-systems-console` — a technical dashboard with a grid, monospace navigation, and a searchable reading catalog

Switch branches, run `npm ci` the first time, then `npm run dev`, and open the local URL shown by Nuxt. Stop the server before switching designs. Each version includes About (`/`), Blogs (`/blogs`), two full posts, and Reading (`/reading`). The profile and essays are example content, ready to replace with your details.

Every design includes an appearance button that cycles **System → Light → Dark → System**, and an English/简体中文 language button. System is the default and tracks browser appearance changes. Cookies retain explicit preferences and provide the correct language during server rendering. A small inline script applies the appearance before rendering to avoid a bright flash. No preference library or translation service is required.

English and Chinese content live in `app/content/site.ts` and `app/content/zh.ts`. Interface translations live in `app/content/translations.ts`; `useSiteContent` supplies reactive content for either language. A future Storyblok adapter can return the same `SiteContent` shape. Reading metadata links to primary sources.

`npm run build` verifies a production build. The project has no server API, database, analytics, or CMS dependency. Nuxt's standard build output can be deployed to Vercel later.
