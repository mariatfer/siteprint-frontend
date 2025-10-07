import { ref, type ShallowRef } from 'vue'
import { Validator } from '@/utils/validator'
import type { FormData, ValidationErrors } from '@/interfaces/form'

export function useFormValidator(locales: ShallowRef<ValidationErrors>) {
  const validator = new Validator()
  const formErrors = ref<Record<string, string>>({})

  const validateForm = (formData: Partial<FormData>) => {
    if (!locales.value) {
      console.warn('No locales provided to validator')
      return false
    }

    formErrors.value = validator.validateFields(formData, locales.value)

    return validator.isFormValid(formErrors.value)
  }

  const validateField = (field: keyof FormData, value: unknown) => {
    if (!locales.value) {
      console.warn('No locales provided to validator')
      return
    }

    const error = validator.validateField(field, value, locales.value)

    formErrors.value[field] = error || ''
  }

  const clearError = (field: string) => {
    formErrors.value[field] = ''
  }

  const clearAllErrors = () => {
    formErrors.value = {}
  }

  const getFirstError = () => {
    return validator.getFirstError(formErrors.value)
  }

  const isFormValid = () => {
    return validator.isFormValid(formErrors.value)
  }

  return {
    formErrors,
    validateForm,
    validateField,
    clearError,
    clearAllErrors,
    getFirstError,
    isFormValid,
  }
}
