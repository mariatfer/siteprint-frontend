import type { TextVariant } from '@/interfaces/common'
import type { FormType, ToastMessages } from '@/types/form'

export interface FormData {
  name: string
  email: string
  subject: string
  message: string
  privacyPolicy: boolean
  newsletter?: boolean
}

export interface BaseField {
  id: number | string
  name: keyof FormData
  label: string
  ariaLabel: string
  type?: string
  placeholder?: string
  autoComplete?: string
  disabled?: boolean
  required?: boolean
}
interface TextField extends BaseField {
  type: 'text' | 'email' | 'textarea'
}

interface CheckboxField extends BaseField {
  type: 'checkbox'
  name: 'privacyPolicy' | 'newsletter'
  showIn?: FormType[]
}

export interface Toast {
  title: string
  description?: string
  buttonLabel?: string
}

export interface FileUploadErrors {
  sizeExceeded: string
  unsupportedFormat: string
}

export interface FileUpload {
  selectFiles: TextVariant
  permittedFormats: string
  errors: FileUploadErrors
}

export interface ValidationErrors {
  name: {
    minLength: string
    onlyLetters: string
  }
  email: {
    invalid: string
  }
  subject: {
    minLength: string
  }
  message: {
    minLength: string
  }
  privacyPolicy: {
    required: string
  }
  general: {
    required: string
    invalidType: string
  }
}

export interface FormLocales {
  toastMessages: ToastMessages
  inputFields: TextField[]
  textArea: TextField
  fileUpload: FileUpload
  checkBox: CheckboxField[]
  validationErrors: ValidationErrors
}
