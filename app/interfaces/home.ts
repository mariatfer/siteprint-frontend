import type { Hero, Carousel, SmallCard } from './common'
import type { SEO } from './seo'

export interface KeyAdvantages {
  title: string
}

export interface HomeLocales {
  ourServices: string
  keyAdvantages: KeyAdvantages
}
export interface Home {
  homeCarousel: Carousel[]
  hero: Hero
  smallCard: SmallCard[]
  description: string
  seo: SEO
}
