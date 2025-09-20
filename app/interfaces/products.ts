import type { Category } from '@/interfaces/navbar'
import type { Image } from '@/interfaces/common'
import type { Hero } from '@/interfaces/home'
export interface Product {
  id: number
  category: Category
  name: string
  description: string
  slug: string
  title: string
  productImage: Image
}

export interface ProductsLocales {
  products: Product[]
}

export interface ProductsPage {
  hero: Hero
}
