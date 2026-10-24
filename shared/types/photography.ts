export interface Photograph {
  id: string
  url: string
  width: number
  height: number
  alt: string
}

export interface PhotoAlbum {
  id: string
  cover: Photograph
  photos: Photograph[]
}

export interface PhotoCollection {
  albums: PhotoAlbum[]
}
