import type { Hero } from '@/interfaces/common'
import type { SEO } from '@/interfaces/seo'

export interface About {
  name: string
  content: string
  hero: Hero
  seo: SEO
}
