import type { ModuleOptions } from '@nuxtjs/i18n'

export const pages: ModuleOptions['pages'] = {
  about: {
    es: '/sobre-nosotros',
  },
  products: {
    es: '/productos',
  },
  'products/[product]/index': {
    es: '/productos/[product]',
  },
  helps: {
    es: '/ayudas',
  },
  'helps/[help]/index': {
    es: '/ayudas/[help]',
  },
  policies: {
    es: '/politicas',
  },
  'policies/[policy]/index': {
    es: '/politicas/[policy]',
  },
  contact: {
    es: '/contacto',
  },
  'thank-you': {
    es: '/gracias',
  },
}
