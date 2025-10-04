<script setup lang="ts">
import { validateField } from '@/utils/validator'

const props = withDefaults(
  defineProps<{
    id: string | number
    name: string
    label: string
    ariaLabel: string
    type?: string
    placeholder: string
    autoComplete?: string
    disabled?: boolean
    required?: boolean
    externalError?: string
  }>(),
  {
    type: 'text',
    autoComplete: 'off',
    disabled: false,
    required: false,
    externalError: '',
  },
)

const inputValue = ref('')
const emit = defineEmits<{
  (e: 'update:modelValue' | 'blur', value: string): void
}>()

let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(inputValue, (newValue) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('update:modelValue', newValue)
  }, 300)
})

const isFocused = ref(false)
const showPlaceholder = ref(false)
const localError = ref<string | undefined>()

const displayedError = computed(() => localError.value || props.externalError)

watch(
  () => props.externalError,
  (newVal) => {
    if (!newVal) {
      localError.value = undefined
    }
  },
)

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement).value
  localError.value = undefined
  emit('update:modelValue', value)
}

function handleFocus() {
  isFocused.value = true
  showPlaceholder.value = true
}

function handleBlur(e: FocusEvent) {
  isFocused.value = false
  showPlaceholder.value = false
  const value = (e.target as HTMLInputElement).value
  localError.value = validateField(props.name, value)
  emit('blur', value)
}
</script>

<template>
  <div class="field">
    <input
      :id="`${id}-${name}`"
      v-model="inputValue"
      :type="type"
      :name="name"
      :placeholder="showPlaceholder ? placeholder : ''"
      :aria-label="ariaLabel"
      :autocomplete="autoComplete"
      :disabled="disabled"
      :required="required"
      class="field__input"
      :class="{ 'field__input--error': displayedError }"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="onInput"
    />
    <label
      :for="`${id}-${name}`"
      class="field__label"
      :class="{ active: isFocused || inputValue }"
    >
      <span
        v-for="(char, index) in label"
        :key="`${char}-${index}`"
        :style="{ transitionDelay: `${index * 50}ms` }"
        class="field__span"
      >
        {{ char }}
      </span>
    </label>
    <span class="field__error">{{ displayedError }}</span>
  </div>
</template>

<style lang="scss" scoped>
.field {
  position: relative;
  width: 100%;
  margin: 1.4rem 0 0 0;
  @include flex(column, flex-start);

  &__label {
    position: absolute;
    top: -0.5rem;
    left: 0;
    pointer-events: none;
    font-weight: 500;
    margin-bottom: 0.5rem;
    transition: var(--t-transition);
  }

  &__span {
    display: inline-block;
    font-size: var(--s-font-p);
    min-width: 0.3125rem;
    color: var(--c-graphite);
    transition:
      transform var(--t-transition) cubic-bezier(0.68, -0.55, 0.265, 1.55),
      color var(--t-transition) ease;
  }

  &__input {
    width: 100%;
    display: block;
    padding: 0.85rem 0.5rem 0.4rem 0.5rem;
    border-bottom: 0.0938rem solid var(--c-graphite);
    transition: var(--t-transition);

    &--error {
      border-color: #cc0000;
    }

    &:hover {
      @include box-shadow(0, 0.625rem, 1.25rem, -0.9375rem, rgba(0, 162, 255, 0.877));
    }

    &:focus {
      outline: none;
      border-color: var(--c-dark-blue);
    }

    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  }

  &__error {
    margin: 0.25rem 0 0 0;
    color: #cc0000;
    height: 1.1875rem;
  }
  .active .field__span {
    color: var(--c-dark-blue);
    transform: translateY(-0.4375rem);
  }
}
</style>
