# Photography

## ImageKit setup

1. In ImageKit Developer options, create a restricted API key with **read-only Media Management** access and no Account Management access.
2. Copy `.env.example` to `.env` and set `NUXT_IMAGEKIT_PRIVATE_KEY`. `.env` is ignored by Git. Set the same environment variable in your production host's server configuration.
3. Upload images into direct child folders of `/Gallery` in ImageKit's Media Library. A folder is one album; nested folders are not included. Name folders `yyyymmdd_Cityname`, using underscores for spaces in multiword city names, for example `20261005_New_York`.
4. Right-click one public, published image in each album, open **Tags**, and add the exact tag `album-cover`. To replace a cover, remove the tag from the old image and add it to the new image.
5. Restart the local server after changing environment variables. Album/photo/tag changes appear after the five-minute server cache refreshes. A cached collection can remain available for up to a day during an upstream failure.

Album cards display the city and month parsed from the folder name: `20261005_Nanjing` becomes **Nanjing · Oct 2026**. The day is omitted from the label. Names like `20261005_New_York` become **New York · Oct 2026**. Folder dates determine newest-first album order. Photos use natural filename order (`DSC_9` before `DSC_10`). If a folder has no tagged cover, its first public photograph is the provisional cover. If several images have the tag, the first in filename order wins. Empty folders, private images, and unpublished images are excluded. The API paginates both folders and images, so albums are not limited to the first response page.

ImageKit serves the image bytes directly. Nuxt exposes only a sanitized album list at `/api/photography`; the private key, other folders, full file metadata, and EXIF are never sent to the browser. Image descriptions become alt text. File paths remain present in public image URLs. When no API key is configured, the page displays an honest empty state; it does not invent albums or substitute stock photographs.

The current adapter is for the `yyccbb` ImageKit Media Library and `/Gallery`. External origins require their own listing API. This integration needs Nuxt's server (`npm run build`); a static-only export cannot run the private listing endpoint.

## Presentation and translations

The `codex/photography-print-stacks` design uses overlapping photographic prints that open into a loosely arranged album. The title and subtitle reuse the Journal/Reading typography and spacing.

Album covers stay in one horizontal row as the collection grows. Swipe, scroll with a trackpad or mouse wheel over the row, use the arrow buttons, or focus the row and use Left/Right, Home, and End. Arrow controls appear only when albums overflow; their shape and palette reuse the Journal controls. At either end, vertical mouse-wheel scrolling resumes moving the page. Frame rotation, highlights, and shadows have room inside the scroll area.

Album covers, their layered frames, and individual photographs use the themed surface tint on hover and keyboard focus while retaining their original soft backlighting. Highlighting adds no solid offset shadow. All colors follow the active theme, and reduced-motion preferences disable transitions.

Edit `photographyCitiesZh` in `app/content/photography.ts` to add Chinese city names. Keys are lowercase English names with spaces, for example `'new york': '纽约'`. Unknown cities keep their English names until a translation is added. Dates are localized automatically, for example **南京 · 2026年10月**.

Set `photographySiteUrl` in the same file to the full HTTPS address of the future dedicated photography site. While empty, the **Photography site** control is a focusable, inactive button marked as coming soon for assistive technology. Once configured, it renders as a normal link using the shared primary-button recipe.

Click or press Enter on a cover to open an album. Browser Back, Escape, or Back to albums returns to the overview and restores its position. Click a photograph for a full-screen viewer; Left/Right moves between images and Escape closes it. The modal traps focus using the native dialog element. Reduced-motion preferences disable animated movement. Mobile uses the compact Photos / 摄影 navigation label and keeps the header on one row.

Run `npm run typecheck` and `npm run build` for validation. No tests have been added.
