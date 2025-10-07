import type { AccordionItem, FlipCard } from '@/interfaces/common'
import type { SEO } from '@/interfaces/seo'

export interface HelpLocales {
  title: string
  intro: string
  cards: FlipCard[]
  seo: SEO
}

export interface Help {
  id: number
  name: string
  title: string
  slug: string
  content: string
  accordion: AccordionItem[]
  seo: SEO
}
