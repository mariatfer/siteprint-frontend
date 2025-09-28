<script lang="ts" setup>
defineProps<{ active: boolean }>()
const emit = defineEmits(['toggle'])
</script>

<template>
  <div class="background">
    <div
      class="button-mobile"
      :class="{ 'button-toggle--active': active }"
      @click="emit('toggle')"
    >
      <div class="button-mobile--line" />
      <div class="button-mobile--line" />
      <div class="button-mobile--line" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-mobile {
  background: none;
  border: none;
  cursor: pointer;
  @include flex(column);
  height: 1.5rem;
  width: 1.5rem;
  position: relative;
  margin: 0 0 0.3rem 0;
  transition: var(--t-transition);
  flex-shrink: 0;

  &--line {
    height: 1rem;
    width: 1.5rem;
    margin: 0.35rem 0 0 0;
    background-color: var(--c-white);
    border-radius: 0.125rem;
    transform-origin: center;
    transition: all 0.4s ease;
  }
}
.background {
  display: none;
  @include responsive() {
    display: block;
    padding: 0.3rem 0.5rem;
    border-radius: 50%;
    transition: var(--t-transition);
    &:hover {
      background-color: var(--c-dark-blue);
      .button-mobile--line {
        background-color: var(--c-secondary);
      }
    }
  }
}

.button-toggle--active {
  top: 0.1875rem;
  left: 0.375rem;
  .button-mobile--line:nth-child(1) {
    transform: rotate(45deg) translate(0, 0.93rem);
    margin: 0 0 0 0.6rem;
    height: 0.2rem;
  }

  .button-mobile--line:nth-child(2) {
    opacity: 0;
  }

  .button-mobile--line:nth-child(3) {
    transform: rotate(-45deg) translate(0, -0.93rem);
    margin: 0 0 0 0.6rem;
    height: 0.2rem;
  }
}
</style>
