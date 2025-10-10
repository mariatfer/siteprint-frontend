import type { FormData, Toast, ValidationErrors } from '@/interfaces/form'

export type StringValidationRule = (
  value: string,
  messages: ValidationErrors,
) => string | undefined

export type BooleanValidationRule = (
  value: boolean,
  messages: ValidationErrors,
) => string | undefined

export type FormValues = FormData & { files: File[] }

export type FormType = 'contact' | 'quote'

export type ToastType = 'success' | 'loading' | 'error' | 'validation'

export type ToastMessages = Record<ToastType, Toast>
