<script setup lang="ts">
import { ICONS } from '@/constants/icons'
import { MAX_SIZE_MB, ALLOWED_TYPES, ALLOWED_EXTENSIONS } from '@/constants/files'

const emit = defineEmits<{
  (e: 'files-selected', files: File[]): void
}>()

const files = ref<File[]>([])
const isDragging = ref(false)
const errorMessage = ref<string | null>(null)

const FILE_VALIDATION = {
  maxSizeMB: MAX_SIZE_MB,
  allowedTypes: ALLOWED_TYPES,
  allowedExtensions: ALLOWED_EXTENSIONS,
}

function getExtensionParts(name: string) {
  const parts = name.split('.')
  const ext = parts.pop()?.toLowerCase()
  const base = parts.join('.')
  return { base, ext }
}

function truncateFileName(name: string, maxLength = 25): string {
  const { ext } = getExtensionParts(name)
  if (name.length <= maxLength) return name
  const base = name.slice(0, maxLength - (ext?.length || 0) - 3)
  return `${base}...${ext ? '.' + ext : ''}`
}

const validateFile = (file: File): boolean => {
  const { ext } = getExtensionParts(file.name)
  const isTypeAllowed = FILE_VALIDATION.allowedTypes.includes(file.type)
  const isExtensionAllowed = ext && FILE_VALIDATION.allowedExtensions.includes(ext)

  if (!isTypeAllowed && !isExtensionAllowed) {
    errorMessage.value = `Formato no permitido: ${truncateFileName(file.name)}`
    return false
  }

  if (file.size > FILE_VALIDATION.maxSizeMB * 1024 * 1024) {
    errorMessage.value = `El archivo ${truncateFileName(file.name)} supera ${FILE_VALIDATION.maxSizeMB}MB`
    return false
  }

  return true
}

const handleFiles = (incomingFiles: FileList | null) => {
  if (!incomingFiles) return
  errorMessage.value = null

  const validFiles = Array.from(incomingFiles).filter(validateFile)
  if (!validFiles.length) return

  files.value.push(...validFiles)
  emit('files-selected', files.value)
}

const removeFile = (fileToRemove: File) => {
  files.value = files.value.filter((f) => f !== fileToRemove)
  emit('files-selected', files.value)
}

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  handleFiles(e.dataTransfer?.files || null)
}

const onChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  handleFiles(input.files)
  input.value = ''
}
</script>

<template>
  <div
    class="file-upload"
    :class="{ 'file-upload--dragging': isDragging }"
    @dragover.prevent="isDragging = true"
    @dragleave="isDragging = false"
    @drop="onDrop"
  >
    <input
      id="file-input"
      type="file"
      class="file-upload__input"
      multiple
      @change="onChange"
    />

    <label for="file-input" class="file-upload__label">
      <Icon :name="ICONS.upload" class="file-upload__icon" />
      <p class="file-upload__p">
        <span class="file-upload__highlight">Haz clic</span> o arrastra tus archivos aquí
      </p>
      <span class="file-upload__span">
        Formatos soportados: PDF, PNG, JPG (máx. 5MB)
      </span>
    </label>

    <p v-if="errorMessage" class="file-upload__error">
      {{ errorMessage }}
    </p>

    <div v-if="files.length" class="file-upload__list">
      <div v-for="file in files" :key="file.name" class="file-upload__pill">
        <span class="file-upload__name">{{ truncateFileName(file.name) }}</span>
        <span class="file-upload__size"> {{ (file.size / 1024).toFixed(1) }} KB </span>
        <button
          type="button"
          class="file-upload__remove"
          aria-label="Eliminar archivo"
          @click="removeFile(file)"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.file-upload {
  @include flex(column);
  width: 100%;
  border: 0.0938rem solid var(--c-dark-brown);
  border-radius: var(--s-border-radius);
  padding: 2rem;
  margin: 2rem 0 0.5rem 0;
  background: #fffdfd;
  transition: var(--t-transition);
  text-align: center;
  cursor: pointer;
  @include responsive() {
    padding: 1rem;
  }

  &:hover,
  &:focus {
    border-color: var(--c-dark-blue);

    @include box-shadow(0, 0, 0.9375rem, 0.3125rem, rgba(0, 162, 255, 0.308), true);
  }

  &--dragging {
    border-color: var(--c-dark-blue);
    background: #eef6ff;
    transform: scale(1.02);
  }

  &__input {
    display: none;
  }

  &__label {
    @include flex(column);
    gap: 0.75rem;
    cursor: pointer;
  }

  &__p {
    font-size: var(--s-font-cta);
    color: var(--c-graphite);
  }

  &__highlight {
    color: var(--c-dark-blue);
    font-weight: 600;
  }

  &__span {
    font-size: 0.8rem;
    color: var(--c-graphite);
  }

  &__icon {
    font-size: 2rem;
    color: var(--c-dark-blue);
  }

  &__error {
    width: 100%;
    color: #c53030;
    font-size: 0.75rem;
    margin-top: 0.5rem;
  }

  &__list {
    margin-top: 1.25rem;
    @include flex($wrap: wrap, $gap: 0.5rem);
  }

  &__pill {
    @include flex($justify: space-between);
    gap: 0.5rem;
    background: #f0f4ff;
    color: var(--c-dark-brown);
    padding: 0.2rem 0.75rem;
    border-radius: 62.4375rem;
    font-size: 0.85rem;
    box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.05);
    @include responsive(30rem) {
      width: 100%;
    }
  }

  &__size {
    font-size: 0.75rem;
    color: var(--c-graphite);
  }

  &__remove {
    font-size: var(--s-font-small);
    color: #c53030;
    cursor: pointer;
    line-height: 1;
    transition: color 0.2s ease;

    &:hover {
      color: #a00;
    }
  }
}
</style>
