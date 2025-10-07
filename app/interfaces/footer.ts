import type { Icon } from '@/interfaces/common'

export interface Link {
  id: number
  name: string
  slug?: string
  url?: string
  title: string
  blank?: boolean
  icon?: Icon
}

export interface FooterCategory {
  id: number
  name: string
  type: 'help' | 'social' | 'enterprise'
  links?: Link[]
}

export interface Footer {
  copyright: string
  categories: FooterCategory[]
  policies: FooterCategory
}
