export function useFormSubmit() {
  const isSending = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337'
  const sendForm = async (formValues: { [key: string]: unknown; files: File[] }) => {
    isSending.value = true
    error.value = null
    success.value = false

    try {
      const formData = new FormData()

      Object.entries(formValues).forEach(([key, value]) => {
        if (key !== 'files') {
          formData.append(key, String(value))
        }
      })

      formValues.files.forEach((file) => {
        formData.append('files[]', file)
      })

      const res = await fetch(`${STRAPI_URL}/api/send-quote`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Error al enviar el formulario')
      success.value = true
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      isSending.value = false
    }
  }

  return { sendForm, isSending, error, success }
}
