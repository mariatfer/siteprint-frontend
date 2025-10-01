<script setup lang="ts">
import type { QuoteForm } from '@/interfaces/products'
import { validateFormData, isFormValid } from '@/utils/validator'
import type {
  FormData,
  FormErrors,
  FormValues,
  FormLocales,
  FormType,
} from '@/interfaces/form'
import { toast } from 'vue-sonner'

const props = defineProps<{
  locales: QuoteForm
  formType: FormType
}>()

const { data: formLocales } = await useLocales<FormLocales>('form')

const formValues = reactive<FormValues>({
  name: '',
  email: '',
  subject: '',
  message: '',
  files: [],
})

const formErrors = ref<FormErrors>({})

function handleFilesFromChild(files: File[]) {
  formValues.files = files
}

const { sendForm, isSending, success, error } = useFormSubmit()
const { toastMessages } = formLocales

const onSubmit = async () => {
  const formDataToValidate: FormData = {
    name: formValues.name,
    email: formValues.email,
    subject: formValues.subject,
    message: formValues.message,
  }
  const errors = validateFormData(formDataToValidate)
  formErrors.value = errors
  if (!isFormValid(errors)) {
    toast.error(toastMessages.validation.title, {
      description: toastMessages.validation.description,
    })
    return
  }

  const toastId = toast.loading(toastMessages.loading.title)

  await sendForm(formValues, props.formType)

  if (success.value) {
    toast.success(toastMessages.success.title, {
      id: toastId,
      description: toastMessages.success.description,
    })
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
</script>

<template>
  <form v-if="formLocales" class="quote-form" autocomplete="on">
    <UiTheTitle v-if="locales.title">{{ locales.title }}</UiTheTitle>
    <div class="line"></div>
    <template v-if="formLocales.inputFields">
      <UiFormInputField
        v-for="field in formLocales.inputFields"
        :key="field.id"
        v-bind="field"
        v-model="formValues[field.name]"
        :external-error="formErrors[field.name]"
        @update:model-value="() => delete formErrors?.[field.name]"
      />
    </template>
    <UiFormTextArea
      v-if="formLocales.textArea"
      v-bind="formLocales.textArea"
      v-model="formValues[formLocales.textArea.name]"
      :external-error="formErrors[formLocales.textArea.name]"
      @update:model-value="() => delete formErrors?.[formLocales.textArea.name]"
    />
    <UiFormFileUpload
      v-if="formLocales.fileUpload"
      v-bind="formLocales.fileUpload"
      @files-selected="handleFilesFromChild"
    />
    <UiTheButton v-if="locales.buttonLabel" :disabled="isSending" :action="onSubmit">
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
