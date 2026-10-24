# Photography

## ImageKit setup

1. In ImageKit Developer options, create a restricted API key with **read-only Media Management** access and no Account Management access.
2. Copy `.env.example` to `.env` and set `NUXT_IMAGEKIT_PRIVATE_KEY`. `.env` is ignored by Git. Set the same environment variable in your production host's server configuration.
3. Upload images into direct child folders of `/Gallery` in ImageKit's Media Library. A folder is one album; nested folders are not included.
4. Right-click one public, published image in each album, open **Tags**, and add the exact tag `album-cover`. To replace a cover, remove the tag from the old image and add it to the new image.
5. Restart the local server after changing environment variables. Album/photo/tag changes appear after the five-minute server cache refreshes. A cached collection can remain available for up to a day during an upstream failure.

Folder names stay out of the visible interface. Names like `20261005_Nanjing` determine newest-first album order. Photos use natural filename order (`DSC_9` before `DSC_10`). If a folder has no tagged cover, its first public photograph is the provisional cover. If several images have the tag, the first in filename order wins. Empty folders, private images, and unpublished images are excluded. The API paginates both folders and images, so albums are not limited to the first response page.

ImageKit serves the image bytes directly. Nuxt exposes only a sanitized album list at `/api/photography`; the private key, other folders, full file metadata, and EXIF are never sent to the browser. Image descriptions become alt text. File paths remain present in public image URLs. When no API key is configured, the page displays an honest empty state; it does not invent albums or substitute stock photographs.

The current adapter is for the `yyccbb` ImageKit Media Library and `/Gallery`. External origins require their own listing API. This integration needs Nuxt's server (`npm run build`); a static-only export cannot run the private listing endpoint.

## Design branches

All three branches share the same data source and navigation. Each implements its own `PhotographyAlbums.vue` and `PhotographyAlbum.vue`.

- `codex/photography-print-stacks`: overlapping photographic prints open into a loosely arranged album.
- `codex/photography-gallery-wall`: an asymmetrical wall of covers opens into an expansive photographic composition.
- `codex/photography-filmstrip`: a horizontal sequence of covers opens into a continuous filmstrip.

Use `git switch <branch>` to compare, then `npm run dev` and visit `/photography`. Stop the server before switching branches. Each branch is based on `codex/photography-base`, which contains the shared integration.

Click or press Enter on a cover to open an album. Browser Back, Escape, or Back to albums returns to the overview and restores its position. Click a photograph for a full-screen viewer; Left/Right moves between images and Escape closes it. The modal traps focus using the native dialog element. Reduced-motion preferences disable animated movement. Mobile uses the compact Photos / 摄影 navigation label and keeps the header on one row.

Run `npm run typecheck` and `npm run build` for validation. No tests have been added.
