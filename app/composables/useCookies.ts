export type CookieConsent = {
  version: string
  technical: boolean
  analytics: boolean
  marketing: boolean
}

export type BooleanConsentKey = Exclude<keyof CookieConsent, 'version'>

const CURRENT_VERSION = '1.0.0'

const cookieConsent = ref<CookieConsent | null>(null)
const showBanner = ref(false)
const showModal = ref(false)
const consent = ref<CookieConsent>({
  version: CURRENT_VERSION,
  technical: true,
  analytics: false,
  marketing: false,
})

let initialized = false

export function useCookies() {
  const parseConsent = (raw: string): CookieConsent | null => {
    try {
      return JSON.parse(decodeURIComponent(raw))
    } catch {
      return null
    }
  }

  const getStoredConsent = (): CookieConsent | null => {
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const trimmed = cookie.trim()
      if (trimmed.startsWith('cookie-consent=')) {
        const value = trimmed.substring('cookie-consent='.length)
        return parseConsent(value)
      }
    }
    return null
  }

  const storeConsent = (value: CookieConsent) => {
    const oneYear = 60 * 60 * 24 * 365
    const expires = new Date(Date.now() + oneYear * 1000).toUTCString()
    document.cookie = `cookie-consent=${encodeURIComponent(
      JSON.stringify(value),
    )}; max-age=${oneYear}; expires=${expires}; path=/; SameSite=Strict; Secure`
    cookieConsent.value = value
  }

  const checkCookieConsent = (): boolean => {
    const stored = getStoredConsent()
    if (stored) {
      if (stored.version !== CURRENT_VERSION) {
        deleteCookieConsent()
        return false
      }

      cookieConsent.value = stored
      consent.value = { ...stored }
      return true
    }

    cookieConsent.value = null
    return false
  }

  const setCookieConsent = (value: CookieConsent | 'all' | 'rejected') => {
    let newConsent: CookieConsent

    if (value === 'all') {
      newConsent = {
        version: CURRENT_VERSION,
        technical: true,
        analytics: true,
        marketing: true,
      }
    } else if (value === 'rejected') {
      newConsent = {
        version: CURRENT_VERSION,
        technical: true,
        analytics: false,
        marketing: false,
      }
    } else {
      newConsent = { ...value, version: CURRENT_VERSION }
    }

    storeConsent(newConsent)
    applyConsent(newConsent)
    showBanner.value = false
    showModal.value = false
  }

  const updateConsent = (name: BooleanConsentKey, value: boolean | undefined) => {
    if (typeof value === 'boolean' && name !== 'technical') {
      consent.value[name] = value
    }
  }

  const deleteCookieConsent = () => {
    document.cookie = 'cookie-consent=; max-age=0; path=/; SameSite=Strict; Secure'
    cookieConsent.value = null
    document.dispatchEvent(new CustomEvent('cookies-revoked'))
    showBanner.value = true
  }

  const applyConsent = (consent: CookieConsent) => {
    if (consent.marketing) {
      document.dispatchEvent(new CustomEvent('marketing-cookies-accepted'))
    }
  }

  const initCookies = () => {
    if (initialized) return
    initialized = true

    const hasConsent = checkCookieConsent()
    showBanner.value = !hasConsent

    if (hasConsent && cookieConsent.value) {
      applyConsent(cookieConsent.value)
    }
  }

  return {
    cookieConsent: readonly(cookieConsent),
    consent,
    showBanner,
    showModal,
    setCookieConsent,
    checkCookieConsent,
    deleteCookieConsent,
    applyConsent,
    initCookies,
    updateConsent,
  }
}
