<script setup lang="ts">
defineProps<{
  fontSize?: boolean
}>()
</script>

<template>
  <header class="header">
    <h2 class="header__title" :class="{ 'header__title--font-size': fontSize }">
      <slot></slot>
    </h2>
  </header>
</template>

<style lang="scss" scoped>
.header {
  text-align: center;
  margin: 1.5rem 0 2rem 0;

  &__title {
    font-size: var(--s-font-h3);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--c-dark-brown);
    @include responsive() {
      font-size: var(--s-font-h3-mobile);
    }

    &--font-size {
      font-size: var(--s-font-h4);
      @include responsive() {
        font-size: var(--s-font-h4-mobile);
      }
    }
  }
}
</style>
