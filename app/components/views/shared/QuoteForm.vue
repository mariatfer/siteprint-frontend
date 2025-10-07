<script setup lang="ts">
import type { QuoteForm } from '@/interfaces/common'
import type { FormLocales, ValidationErrors } from '@/interfaces/form'
import type { FormType, FormValues } from '@/types/form'
import { toast } from 'vue-sonner'

const props = defineProps<{
  locales: QuoteForm
  formType: FormType
  productName?: string
}>()

const { data: formLocales } = await useLocales<FormLocales>('form')
const validationErrors = shallowRef<ValidationErrors>(formLocales.validationErrors)

const formValues = reactive<FormValues>({
  name: '',
  email: '',
  subject: '',
  message: '',
  files: [],
  privacyPolicy: false,
  newsletter: false,
})

const { formErrors, validateForm, validateField, clearError, clearAllErrors } =
  useFormValidator(validationErrors)

function handleFilesFromChild(files: File[]) {
  formValues.files = files
}

const { sendForm, isSending, success, error } = useFormSubmit()
const { toastMessages } = formLocales

const formKey = ref(0)

function resetForm() {
  Object.assign(formValues, {
    name: '',
    email: '',
    subject: '',
    message: '',
    files: [],
    privacyPolicy: false,
    newsletter: false,
  })
  clearAllErrors()
  formKey.value++
}

const visibleCheckboxes = computed(() => {
  return formLocales.checkBox.filter((checkbox) =>
    checkbox.showIn?.includes(props.formType),
  )
})

const onSubmit = async () => {
  if (!validateForm(formValues)) {
    toast.error(toastMessages.validation.title, {
      description: toastMessages.validation.description,
    })
    return
  }

  const toastId = toast.loading(toastMessages.loading.title)
  await sendForm(formValues, props.formType, props.productName)

  if (success.value) {
    toast.success(toastMessages.success.title, {
      id: toastId,
      description: toastMessages.success.description,
    })
    resetForm()
  } else if (error.value) {
    toast.error(toastMessages.error.title, {
      id: toastId,
      description: toastMessages.error.description,
      action: {
        label: toastMessages.error.buttonLabel,
        onClick: () => onSubmit(),
      },
    })
  }
}

function handleBlur(field: keyof FormValues) {
  if (field === 'files') return
  validateField(field, formValues[field])
}
</script>

<template>
  <form
    v-if="formLocales"
    :key="formKey"
    class="quote-form"
    autocomplete="on"
    novalidate
    @submit.prevent="onSubmit"
  >
    <UiTheTitle v-if="locales.title">{{ locales.title }}</UiTheTitle>
    <div class="line"></div>
    <template v-if="formLocales.inputFields">
      <UiFormInputField
        v-for="field in formLocales.inputFields"
        :key="field.id"
        v-bind="field"
        v-model="formValues[field.name]"
        :external-error="formErrors[field.name]"
        @blur="() => handleBlur(field.name)"
        @update:model-value="() => clearError(field.name)"
      />
    </template>
    <UiFormTextArea
      v-if="formLocales.textArea"
      v-bind="formLocales.textArea"
      v-model="formValues[formLocales.textArea.name]"
      :external-error="formErrors[formLocales.textArea.name]"
      @blur="() => handleBlur(formLocales.textArea.name)"
      @update:model-value="() => clearError(formLocales.textArea.name)"
    />
    <UiFormFileUpload
      v-if="formLocales.fileUpload"
      v-bind="formLocales.fileUpload"
      @files-selected="handleFilesFromChild"
    />
    <UiFormCheckBox
      v-for="checkbox in visibleCheckboxes"
      :key="checkbox.id"
      v-bind="checkbox"
      v-model="formValues[checkbox.name]"
      :external-error="formErrors[checkbox.name]"
      @update:model-value="() => clearError(checkbox.name)"
    />
    <UiTheButton v-if="locales.buttonLabel" :disabled="isSending" type="submit">
      {{ locales.buttonLabel }}
    </UiTheButton>
  </form>
</template>

<style lang="scss" scoped>
.line {
  width: 100%;
  background-color: var(--c-dark-blue);
  height: 0.25rem;
  border-radius: var(--s-border-radius);
}
.quote-form {
  width: 100%;
  height: fit-content;
  padding: 1.5rem;
  border-radius: var(--s-border-radius);
  background-color: var(--c-light-blue);
  @include flex(column, $gap: 0.5rem);
}
</style>
