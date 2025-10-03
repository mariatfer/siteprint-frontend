<script setup lang="ts">
import type { Search } from '@/interfaces/navbar'
defineProps<Search>()
</script>

<template>
  <div class="search">
    <input
      type="search"
      class="search__input"
      :placeholder="$props.placeholder"
      :aria-label="$props.ariaLabel"
    />
    <Icon
      :name="resolveIcons($props.icon.name)"
      role="img"
      :aria-label="$props.icon.ariaLabel"
      class="search__icon"
    />
  </div>
</template>

<style lang="scss" scoped>
.search {
  position: relative;
  @include flex;
  max-width: 22rem;
  width: 50%;
  height: 2.5rem;

  @include responsive(37.5rem) {
    max-width: 13rem;
  }

  &__icon {
    position: absolute;
    left: 0.625rem;
    color: var(--c-dark-blue);
    font-size: var(--s-font-p);
  }
  &__input {
    width: 100%;
    border-radius: 3.125rem;
    padding: 0.5rem 0.5rem 0.5rem 2.1875rem;
    background-color: var(--c-light-graphite);
    font-size: var(--s-font-small);
    color: var(--c-dark-blue);
    transition: var(--t-transition);
    @include box-shadow($blur: 0.625rem, $color: #00000062);
    &:focus {
      box-shadow: 0 0 0.3125rem var(--c-secondary);
    }
  }
}
</style>
