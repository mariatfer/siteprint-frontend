<script lang="ts" setup>
defineProps<{ active: boolean }>()
const emit = defineEmits(['toggle'])
</script>

<template>
  <div class="hamburger" :class="{ 'is-active': active }" @click="emit('toggle')">
    <svg viewBox="0 0 32 32" class="hamburger__icon">
      <path
        class="hamburger__line hamburger__line--top-bottom"
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
      />
      <path class="hamburger__line" d="M7 16 27 16" />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.hamburger {
  display: none;
  @include responsive() {
    padding: 0.2rem;
    border-radius: 50%;
    cursor: pointer;
    display: inline-block;
    &:hover {
      background-color: var(--c-dark-blue);
    }
  }

  &__icon {
    height: 2.3em;
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &__line {
    fill: none;
    stroke: var(--c-white);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    transition:
      stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);

    &--top-bottom {
      stroke-dasharray: 12 63;
    }
  }

  &.is-active {
    .hamburger__icon {
      transform: rotate(-45deg);
    }
    .hamburger__line {
      stroke: var(--c-secondary);
    }

    .hamburger__line--top-bottom {
      stroke-dasharray: 20 300;
      stroke-dashoffset: -32.42;
    }
  }
}
</style>
