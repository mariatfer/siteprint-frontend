import type { Icon, Media, QuoteForm, TextVariant } from '@/interfaces/common'
import type { SEO } from '@/interfaces/seo'

export interface HeroCards {
  id: number
  title: string
  info: TextVariant[]
  icon: Icon
}

export interface ContactLocales {
  heroCards: HeroCards[]
  quoteForm: QuoteForm
}

export interface Contact {
  contactImage: Media
  seo: SEO
}
