import type { Link } from '@/interfaces/footer'

export interface CookieFormField {
  id: number | string
  name: keyof CookieConsent
  label: string
  ariaLabel: string
  type?: string
  disabled?: boolean
  required?: boolean
}

interface Banner {
  description: string
  cookiesLink: Link
  actions: {
    acceptAll: string
    rejectAll: string
    configure: string
  }
}

interface Modal {
  title: string
  description: string
  form: CookieFormField[]
  actions: {
    savePreferences: string
    closeModal: string
  }
}

interface CookieButton {
  ariaLabel: string
}

export interface CookiesLocales {
  banner: Banner
  modal: Modal
  button: CookieButton
}
