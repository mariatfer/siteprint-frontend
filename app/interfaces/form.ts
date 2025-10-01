export interface FormErrors {
  [key: string]: string
}

export interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface FormField {
  id: string
  name: keyof FormData
  label: string
  ariaLabel: string
  type?: string
  placeholder: string
  autoComplete?: string
  disabled?: boolean
  required?: boolean
}

export type FormValues = FormData & { files: File[] }

export type FormType = 'contact' | 'quote'

export interface Toast {
  title: string
  description?: string
  buttonLabel?: string
}

export type ToastType = 'success' | 'loading' | 'error' | 'validation'

export type ToastMessages = Record<ToastType, Toast>

export interface FileUploadErrors {
  sizeExceeded: string
  unsupportedFormat: string
}

export interface SelectFiles {
  highlight: string
  normal: string
}

export interface FileUpload {
  selectFiles: SelectFiles
  permittedFormats: string
  errors: FileUploadErrors
}

export interface FormLocales {
  toastMessages: ToastMessages
  inputFields: FormField[]
  textArea: FormField
  fileUpload: FileUpload
}
