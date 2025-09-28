// https://nuxt.com/docs/api/configuration/nuxt-config
import i18nConfig from './config/i18n'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/strapi',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,

    public: {
      strapi: {
        url: process.env.STRAPI_URL || 'http://localhost:1337',
      },
    },
  },
  ssr: false,
  css: [
    '@/assets/fonts.css',
    '@/assets/variables.css',
    '@/assets/reset.scss',
    '@/assets/vueTransitions.css',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "assets/mixin.scss" as *;',
        },
      },
    },
  },
  i18n: {
    ...i18nConfig,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'es',
    },
  },
  strapi: {
    url: process.env.STRAPI_URL,
    prefix: '/api',
    version: 'v5',
    cookie: {},
  },
})
