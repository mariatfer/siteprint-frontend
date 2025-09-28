<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string
    name: string
    label: string
    ariaLabel: string
    placeholder: string
    disabled?: boolean
    required?: boolean
  }>(),
  {
    disabled: false,
    required: false,
  },
)
const inputValue = ref('')
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
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

function handleFocus() {
  isFocused.value = true
  showPlaceholder.value = true
}

function handleBlur() {
  isFocused.value = false
  showPlaceholder.value = false
}
</script>

<template>
  <div class="field">
    <textarea
      :id="id"
      v-model="inputValue"
      :name="name"
      :placeholder="showPlaceholder ? placeholder : ''"
      :aria-label="ariaLabel"
      :disabled="disabled"
      :required="required"
      class="field__textarea"
      @focus="handleFocus"
      @blur="handleBlur"
    ></textarea>
    <label :for="id" class="field__label" :class="{ active: isFocused || inputValue }">
      <span
        v-for="(char, index) in label"
        :key="`${char}-${index}`"
        :style="{ transitionDelay: `${index * 50}ms` }"
        class="field__span"
      >
        {{ char }}
      </span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.field {
  position: relative;
  width: 100%;
  margin: 1.6rem 0 0 0;

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

  &__textarea {
    width: 100%;
    display: block;
    border-bottom: 0.0938rem solid var(--c-graphite);
    transition: var(--t-transition);
    padding: 0.85rem 0.5rem 0.4rem 0.5rem;

    &:hover {
      @include box-shadow(0, 10px, 20px, -15px, rgba(0, 162, 255, 0.877));
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

  .active .field__span {
    color: var(--c-dark-blue);
    transform: translateY(-0.4375rem);
  }
}
</style>
