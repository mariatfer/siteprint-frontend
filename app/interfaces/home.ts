import type { Hero, Carousel, SmallCard } from '@/interfaces/common'
import type { SEO } from '@/interfaces/seo'

export interface KeyAdvantages {
  title: string
}

export interface HomeLocales {
  ourServices: string
  keyAdvantages: KeyAdvantages
  productButton: string
  ourStore: string
  mapTitle: string
}
export interface Home {
  homeCarousel: Carousel[]
  hero: Hero
  smallCard: SmallCard[]
  description: string
  seo: SEO
}
