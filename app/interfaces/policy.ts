import type { Image } from './common'

export interface Policy {
  id: number
  name: string
  title: string
  slug: string
  content: string
  order: number
  policyImage: Image
}
