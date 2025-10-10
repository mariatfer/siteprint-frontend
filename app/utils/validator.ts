import type { FormData, ValidationErrors } from '@/interfaces/form'
import type { BooleanValidationRule, StringValidationRule } from '@/types/form'

type ValidationRules = {
  name: StringValidationRule[]
  email: StringValidationRule[]
  subject: StringValidationRule[]
  message: StringValidationRule[]
  privacyPolicy: BooleanValidationRule[]
  newsletter: BooleanValidationRule[]
}

export class Validator {
  private validationRules: ValidationRules = {
    name: [
      (value: string, messages): string | undefined => {
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value.trim())) {
          return messages.name.onlyLetters
        }
        return undefined
      },
      (value: string, messages): string | undefined => {
        if (!value || value.trim().length < 2) {
          return messages.name.minLength
        }
        return undefined
      },
    ],

    email: [
      (value: string, messages): string | undefined => {
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return messages.email.invalid
        }
        return undefined
      },
    ],

    subject: [
      (value: string, messages): string | undefined => {
        if (!value || value.trim().length < 2) {
          return messages.subject.minLength
        }
        return undefined
      },
    ],

    message: [
      (value: string, messages): string | undefined => {
        if (!value || value.trim().length < 10) {
          return messages.message.minLength
        }
        return undefined
      },
    ],

    privacyPolicy: [
      (value: boolean, messages): string | undefined => {
        if (value !== true) {
          return messages.privacyPolicy.required
        }
        return undefined
      },
    ],

    newsletter: [],
  }

  validateFields(
    fields: Partial<FormData>,
    messages: ValidationErrors,
  ): Record<string, string> {
    const errors: Record<string, string> = {}

    for (const field in fields) {
      if (field in this.validationRules) {
        const error = this.validateSingleField(
          field as keyof FormData,
          fields[field as keyof FormData],
          messages,
        )
        if (error) {
          errors[field] = error
        }
      }
    }

    return errors
  }

  validateField(
    field: keyof FormData,
    value: unknown,
    messages: ValidationErrors,
  ): string | undefined {
    return this.validateSingleField(field, value, messages)
  }

  private validateSingleField(
    field: keyof FormData,
    value: unknown,
    messages: ValidationErrors,
  ): string | undefined {
    const rules = this.validationRules[field]
    if (!rules || rules.length === 0) return undefined

    if (field === 'privacyPolicy' || field === 'newsletter') {
      if (typeof value !== 'boolean') {
        return messages.general.invalidType
      }
      for (const rule of rules as BooleanValidationRule[]) {
        const error = rule(value, messages)
        if (error) return error
      }
      return undefined
    }

    if (typeof value !== 'string') {
      return messages.general.invalidType
    }

    for (const rule of rules as StringValidationRule[]) {
      const error = rule(value, messages)
      if (error) return error
    }

    return undefined
  }

  isFormValid(errors: Record<string, string>): boolean {
    return Object.keys(errors).length === 0
  }

  getFirstError(errors: Record<string, string>): string | undefined {
    const firstKey = Object.keys(errors)[0]
    return firstKey ? errors[firstKey] : undefined
  }
}
