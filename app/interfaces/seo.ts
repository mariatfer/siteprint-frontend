import type { Media } from '@/interfaces/common'

export interface SEO {
  metaTitle: string
  metaDescription: string
  author: string
  noIndex?: boolean
  noFollow?: boolean
  ogTitle?: string
  ogDescription?: string
  ogImage: Media
}
