import type { Hero } from '@/interfaces/common'
import type { SEO } from '@/interfaces/seo'

export interface Policy {
  id: number
  name: string
  title: string
  slug: string
  hero: Hero
  content: string
  seo: SEO
}
