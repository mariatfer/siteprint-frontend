<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string | number
    name: string
    label: string
    ariaLabel: string
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const modelValue = defineModel<boolean>()
</script>

<template>
  <div class="field">
    <input
      :id="`${id}-${name}`"
      v-model="modelValue"
      type="checkbox"
      :name="name"
      :aria-label="ariaLabel"
      :disabled="disabled"
      class="field__switch"
    />
    <label :for="`${id}-${name}`" class="field__label">{{ label }}</label>
  </div>
</template>

<style scoped lang="scss">
.field {
  @include flex($justify: flex-start, $align: flex-start, $gap: 1rem);
  &__switch {
    position: relative;
    height: 1.3rem;
    width: 2.7rem;
    min-height: 1.3rem;
    min-width: 2.7rem;
    cursor: pointer;
    border-radius: 624.9375rem;
    background-color: rgba(100, 116, 139, 0.377);
    transition: all 0.3s ease;

    &:checked {
      background-color: var(--c-primary);
    }

    &::before {
      position: absolute;
      content: '';
      left: calc(1.3rem - 1.35rem);
      top: calc(1.3rem - 1.35rem);
      display: block;
      height: 1.3rem;
      width: 1.3rem;
      cursor: pointer;
      border: 0.0625rem solid rgba(100, 116, 139, 0.527);
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 1);
      transition: var(--t-transition);
    }

    &:hover::before {
      @include box-shadow($spread: 0.5rem, $color: rgba(0, 0, 0, 0.15));
    }

    &:checked:hover::before {
      @include box-shadow($spread: 0.5rem, $color: rgba(72, 143, 236, 0.15));
    }

    &:checked:before {
      transform: translateX(100%);
      border-color: var(--c-primary);
    }
  }

  &__label {
    color: var(--c-graphite);
    font-weight: 500;
  }
}
</style>
