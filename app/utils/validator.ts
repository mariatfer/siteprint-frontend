import type { FormErrors, FormData } from '@/interfaces/form'

type ValidationRule<T = string> = (value: T) => string | undefined

const validationRules = {
  name: [
    (value: string): string | undefined => {
      if (!value || value.trim().length < 2) {
        return 'El nombre debe tener al menos 2 caracteres.'
      }
      return undefined
    },
    (value: string): string | undefined => {
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value.trim())) {
        return 'El nombre solo puede contener letras.'
      }
      return undefined
    },
  ] as ValidationRule[],

  email: [
    (value: string): string | undefined => {
      if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'El correo electrónico no es válido.'
      }
      return undefined
    },
  ] as ValidationRule[],

  subject: [
    (value: string): string | undefined => {
      if (!value || value.trim().length < 2) {
        return 'El asunto debe tener al menos 2 caracteres.'
      }
      return undefined
    },
  ] as ValidationRule[],

  message: [
    (value: string): string | undefined => {
      if (!value || value.trim().length < 10) {
        return 'El mensaje debe tener al menos 10 caracteres.'
      }
      return undefined
    },
  ] as ValidationRule[],
} as const

function validateSingleField(field: keyof FormData, value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return `El campo ${field} debe ser texto.`
  }

  const rules = validationRules[field]
  if (!rules) return undefined

  for (const rule of rules) {
    const error = rule(value)
    if (error) return error
  }

  return undefined
}

export function validateForm(data: Record<string, unknown>): FormErrors {
  const errors: FormErrors = {}
  const fields: (keyof FormData)[] = ['name', 'email', 'subject', 'message']

  for (const field of fields) {
    const error = validateSingleField(field, data[field])
    if (error) {
      errors[field] = error
    }
  }

  return errors
}

export function validateField(field: string, value: string): string | undefined {
  if (!(field in validationRules)) {
    console.warn(`Campo desconocido: ${field}`)
    return undefined
  }

  return validateSingleField(field as keyof FormData, value)
}

export function validateFormData(data: Partial<FormData>): FormErrors {
  return validateForm(data)
}

export function isFormValid(errors: FormErrors): boolean {
  return Object.keys(errors).length === 0
}

export function getFirstError(errors: FormErrors): string | undefined {
  const firstKey = Object.keys(errors)[0]
  return firstKey ? errors[firstKey] : undefined
}
