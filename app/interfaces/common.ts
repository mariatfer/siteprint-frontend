export interface Image {
  url: string
  alternativeText: string
  placeholder?: boolean
  loading?: 'lazy' | 'eager'
}

export type Track = {
  src: string
  kind: string
  srclang: string
  label: string
  default?: boolean
}

export type MediaType =
  | 'application/pdf'
  | 'image/jpg'
  | 'image/png'
  | 'image/webp'
  | 'video/mp4'
  | 'video/webm'

export type Media = {
  alternativeText?: string
  autoPlay?: boolean
  controls?: boolean
  documentId?: string
  id?: number
  isUrlSigned?: boolean
  loop?: boolean
  mime?: MediaType
  muted?: boolean
  name?: string
  placeholder?: string
  poster?: string
  tracks?: Track[]
  url: string
}

export interface Carousel {
  id: number
  description?: string | null
  media: Media
  cover: Media
  link?: string
}

export interface Icon {
  name: string
  ariaLabel?: string
}

export interface SmallCard {
  id: number
  cardImage: Media
  title: string
}

export interface Hero {
  heroImage: Media
  title: string
  description: string
}

export type Slug = {
  slug: string
}
export interface TextVariant {
  id?: number
  highlight: string
  normal: string
}
export interface QuoteForm {
  title: string
  buttonLabel: string
}
