import type { FormType, FormValues } from '@/types/form'

export function useFormSubmit() {
  const CONTACT_API_URL = '/api/send-contact'
  const QUOTE_API_URL = '/api/send-quote'
  const isSending = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337'

  const sendForm = async (
    formValues: FormValues,
    formType: FormType,
    productName?: string,
  ) => {
    isSending.value = true
    error.value = null
    success.value = false

    const endpoint =
      formType === 'contact'
        ? CONTACT_API_URL
        : formType === 'quote'
          ? QUOTE_API_URL
          : (() => {
              throw new Error(`Tipo de formulario no soportado: ${formType}`)
            })()

    try {
      const formData = new FormData()

      Object.entries(formValues).forEach(([key, value]) => {
        if (key !== 'files') {
          formData.append(key, String(value))
        }
      })

      if (formType === 'quote' && productName) {
        formData.append('productName', productName)
      }

      formValues.files.forEach((file) => {
        formData.append('files[]', file)
      })

      const res = await fetch(`${STRAPI_URL}${endpoint}`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Error al enviar el formulario')
      success.value = true
    } catch (fetchError) {
      error.value = (fetchError as Error).message
    } finally {
      isSending.value = false
    }
  }

  return { sendForm, isSending, error, success }
}
