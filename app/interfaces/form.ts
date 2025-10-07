import type { TextVariant } from '@/interfaces/common'
import type { BooleanFieldNames, FormType, ToastMessages } from '@/types/form'

export interface FormData {
  name: string
  email: string
  subject: string
  message: string
  privacyPolicy: boolean
  newsletter?: boolean
}

export interface FormField {
  id: string
  name: keyof FormData
  label: string
  ariaLabel: string
  type?: string
  placeholder?: string
  autoComplete?: string
  disabled?: boolean
  required?: boolean
}
export interface FormCheckbox {
  id: number
  name: BooleanFieldNames
  label: string
  ariaLabel: string
  disabled?: boolean
  required?: boolean
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
  inputFields: FormField[]
  textArea: FormField
  fileUpload: FileUpload
  checkBox: FormCheckbox[]
  validationErrors: ValidationErrors
}
