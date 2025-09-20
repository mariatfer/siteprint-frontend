import type { Image, Icon } from '@/interfaces/common'

export interface Logo {
  link: string
  title: string
  image: Image
  enterpriseTitle: {
    text: string
    span: string
  }
}

export interface Search {
  placeholder: string
  ariaLabel: string
  icon: Icon
}

export interface Login {
  text: string
  link: string
  title: string
  icon: Icon
}

export interface Logout {
  text: string
  link: string
  title: string
}

export interface Aside {
  ariaLabel: string
  section: string
  back: string
  rightArrow: Icon
  leftArrow: Icon
}

export type CategoriesName =
  | 'Copisteria'
  | 'Imprenta'
  | 'Marketing'
  | 'Fotografía'
  | 'Cartelería'

export interface Category {
  id: number
  name: CategoriesName
  title: string
  slug?: string
  order: number
  headerText: string
}

export interface NavbarLocales {
  logo: Logo
  search: Search
  login: Login
  logout: Logout
  aside: Aside
}
