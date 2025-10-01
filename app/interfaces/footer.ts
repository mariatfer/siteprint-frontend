import type { Icon } from '@/interfaces/common'

interface Link {
  id: number
  name: string
  link: string
  title: string
  icon?: Icon
}

interface Category {
  id: number
  name: string
  links?: Link[]
}

export interface Footer {
  copyright: string
  categories: Category[]
  policies: Category
}
