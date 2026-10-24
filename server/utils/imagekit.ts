import { createHash } from 'node:crypto'
import type { Photograph, PhotoAlbum, PhotoCollection } from '../../shared/types/photography'

interface Asset {
  type?: string
  folderPath?: string
  folderId?: string
  name?: string
  fileId?: string
  filePath?: string
  fileType?: string
  url?: string
  width?: number
  height?: number
  description?: string
  tags?: string[] | null
  isPrivateFile?: boolean
  isPublished?: boolean
}

const root = '/Gallery'
const pageSize = 1000

async function listAssets(key: string, path: string, type: 'file' | 'folder') {
  const assets: Asset[] = []
  for (let skip = 0; ; skip += pageSize) {
    const page = await $fetch<Asset[]>('https://api.imagekit.io/v1/files', {
      headers: { Authorization: `Basic ${Buffer.from(`${key}:`).toString('base64')}` },
      query: { path: `${path}/`, type, limit: pageSize, skip, sort: 'ASC_NAME', ...(type === 'file' ? { fileType: 'image' } : {}) },
      timeout: 15000,
      retry: 1,
      retryDelay: 750,
    }).catch(() => { throw new Error('ImageKit listing is temporarily unavailable.') })
    if (!Array.isArray(page)) throw new Error('Invalid asset response')
    assets.push(...page)
    if (page.length < pageSize) return assets
  }
}

function toPhotograph(asset: Asset): Photograph | undefined {
  if (!asset.url || !asset.fileId || asset.isPrivateFile || asset.isPublished === false || asset.fileType !== 'image') return
  const url = new URL(asset.url)
  if (url.protocol !== 'https:' || url.hostname !== 'ik.imagekit.io' || !decodeURIComponent(url.pathname).startsWith('/yyccbb/Gallery/')) return
  return {
    id: asset.fileId,
    url: url.href,
    width: Math.max(1, asset.width || 1500),
    height: Math.max(1, asset.height || 1000),
    alt: asset.description?.trim() || '',
  }
}

// Only the sanitized response is cached. No credentials, folder names, EXIF,
// or other library metadata are returned to the browser. City and month are
// parsed from the folder name for the album's public label.
export const getPhotoCollection = defineCachedFunction(async (): Promise<PhotoCollection> => {
  const key = useRuntimeConfig().imagekitPrivateKey
  const folders = (await listAssets(key, root, 'folder'))
    .filter(folder => folder.folderPath?.startsWith(`${root}/`) && folder.folderPath.slice(root.length + 1).split('/').length === 1)
    .sort((a, b) => (b.name || '').localeCompare(a.name || '', 'en', { numeric: true }))
  const albums: PhotoAlbum[] = []
  // Limit upstream concurrency; paginate every album instead of silently
  // truncating collections larger than ImageKit's response limit.
  for (let offset = 0; offset < folders.length; offset += 4) {
    const batch = await Promise.all(folders.slice(offset, offset + 4).map(async (folder) => {
      const label = /^(\d{4})(\d{2})\d{2}_(.+)$/.exec(folder.name || '')
      if (!label) return
      const assets = (await listAssets(key, folder.folderPath!, 'file'))
        .filter(asset => asset.filePath?.slice(0, asset.filePath.lastIndexOf('/')) === folder.folderPath)
        .sort((a, b) => (a.name || '').localeCompare(b.name || '', 'en', { numeric: true }))
      const entries = assets.map(asset => ({ asset, photo: toPhotograph(asset) })).filter(entry => entry.photo !== undefined)
      if (!entries.length) return
      const photos = entries.map(entry => entry.photo!)
      const cover = entries.find(entry => entry.asset.tags?.includes('album-cover'))?.photo || photos[0]!
      return {
        id: createHash('sha256').update(folder.folderId || folder.folderPath!).digest('hex').slice(0, 16),
        city: label[3]!.replaceAll('_', ' '),
        month: `${label[1]}-${label[2]}`,
        cover,
        photos,
      }
    }))
    albums.push(...batch.filter((album): album is PhotoAlbum => album !== undefined))
  }
  return { albums }
}, { name: 'photography', getKey: () => 'yyccbb-gallery-v2', maxAge: 300, swr: true, staleMaxAge: 86400 })
