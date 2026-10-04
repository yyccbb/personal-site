# Personal site

A Nuxt 4, Vue 3, TypeScript, and Tailwind CSS personal site. Content is local and typed in `app/content/site.ts`; the page components consume those shapes so a headless CMS adapter can replace the content source later.

## Explore

`main` is the current website: the editorial design, with horizontal image-ready blog cards, category filters, and a notebook-inspired reading shelf. Run `npm ci` the first time, then `npm run dev`, and open the local URL shown by Nuxt.

Five earlier visual directions remain available on separate branches:

- `codex/design-01-editorial` — a warm, editorial portfolio
- `codex/design-02-studio` — a bold, graphic studio site
- `codex/design-03-journal` — a quiet, reading-led journal
- `codex/design-04-research-notebook` — an academic notebook with restrained serif type, research topics, and a chronological writing index
- `codex/design-05-systems-console` — a technical dashboard with a grid, monospace navigation, and a searchable reading catalog

Stop the server before switching designs. Each version includes About (`/`), Blogs (`/blogs`), two full posts, and Reading (`/reading`). The profile and posts are example content, ready to replace with your details.

On `main`, Blogs starts with **All** and can filter by **Research** or **Travelling**. Reading filters by **All**, **Book**, **Paper**, or **Article**. Both use the same filter component and styling. Blog cards scroll horizontally using swipe, a trackpad, left/right arrow keys anywhere on the Blogs page, or arrow buttons. Three display-only preview cards show the scrolling layout without linking to empty articles; their titles are defined in the Blogs page.

Blog images are deliberately blank. To add one, put your image in `public/` and add an optional `image: { src: '/your-image.jpg', alt: 'A description of your image' }` to the post in both content files. The shorter 5:2 frame sits flush against the left edge with a 24px inset on the right. Categories are stable lowercase keys (`research` and `travelling`), with translated display labels.

On `main`, the icon-only appearance button toggles directly between **Light** and **Dark**. The default follows system appearance, with no third button state. A system appearance change resumes automatic following, including after a manual toggle. Sun/moon icons reflect the rendered mode. The globe button switches English/简体中文; both controls use the filter buttons’ border, color, and hover styling without a selected appearance. Cookies retain manual choices between visits and provide the correct language during server rendering. A small inline script applies the appearance before rendering to avoid a bright flash. The five earlier design branches retain their original three-way appearance controls. No preference library or translation service is required.

English and Chinese content live in `app/content/site.ts` and `app/content/zh.ts`. Interface translations live in `app/content/translations.ts`; `useSiteContent` supplies reactive content for either language. A future Storyblok adapter can return the same `SiteContent` shape. Reading metadata links to primary sources.

`npm run build` verifies a production build. The project has no server API, database, analytics, or CMS dependency. Nuxt's standard build output can be deployed to Vercel later.
