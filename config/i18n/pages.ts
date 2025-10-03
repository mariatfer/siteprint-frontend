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
  contact: {
    es: '/contacto',
  },
  'frequent-questions': {
    es: '/preguntas-frecuentes',
  },
  'thank-you': {
    es: '/gracias',
  },
}
