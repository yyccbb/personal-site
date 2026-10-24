export default defineEventHandler(async () => {
  if (!useRuntimeConfig().imagekitPrivateKey) return { albums: [] }
  try {
    return await getPhotoCollection()
  } catch {
    // Upstream errors can contain request headers. Never forward them.
    throw createError({ statusCode: 502, statusMessage: 'Photographs are temporarily unavailable.' })
  }
})
