import { ICONS } from '@/constants/icons'

export function resolveIcons(key: string) {
  return ICONS[key as keyof typeof ICONS]
}
