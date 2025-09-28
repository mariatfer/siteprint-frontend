<script setup lang="ts">
import type { QuoteForm } from '@/interfaces/products'

defineProps<{
  locales: QuoteForm
}>()

const formValues = reactive<{
  [key: string]: unknown
  files: File[]
}>({
  name: '',
  email: '',
  subject: '',
  message: '',
  files: [] as File[],
})
function handleFilesFromChild(files: File[]) {
  formValues.files = files
}

const { sendForm, isSending, error, success } = useFormSubmit()
const onSubmit = () => {
  const isValid = validateForm(formValues)
  if (!isValid) return
  sendForm(formValues)
}
</script>

<template>
  <form action="onSubmit" class="quote-form" autocomplete="on">
    <UiTheTitle>{{ locales.title }}</UiTheTitle>
    <div class="line"></div>
    <UiFormInputField
      v-for="field in locales.inputFields"
      :key="field.id"
      v-bind="field"
      v-model="formValues[field.name]"
    />
    <UiFormTextArea
      v-bind="locales.textArea"
      v-model="formValues[locales.textArea.name]"
    />
    <UiFormFileUpload @files-selected="handleFilesFromChild" />
    <UiTheButton :disabled="isSending" :action="onSubmit">{{
      locales.sendButton.message
    }}</UiTheButton>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">¡Formulario enviado con éxito!</p>
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
