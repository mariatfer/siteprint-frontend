<script setup lang="ts">
import type { Category } from '@/interfaces/navbar'
defineProps<{
  categories: Category[]
  selectedCategory: string | null
}>()
defineEmits(['update:selectedCategory'])
</script>

<template>
  <ul class="categories-list">
    <li
      v-for="category in categories"
      :key="category.id"
      class="categories-list__item"
      :title="category.title"
      :class="{ 'is-active': selectedCategory === category.name }"
      @click.stop="$emit('update:selectedCategory', category.name)"
    >
      {{ category.name }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.categories-list {
  @include flex(row, center, space-between);
  background-color: var(--c-light-graphite);
  padding: 0.125rem var(--s-padding) 0;
  height: 1.7813rem;

  @include responsive() {
    display: none;
  }

  &__item {
    @include flex;
    padding: 0 1.25rem;
    transition: var(--t-transition);
    color: var(--c-dark-blue);
    height: 100%;
    font-size: var(--s-font-cta);
    font-weight: bold;
    font-family: var(--f-font-raleway);
    cursor: pointer;
    border-radius: 1rem;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    &:hover,
    &.is-active {
      background-color: var(--c-light-green);
      @include box-shadow($y: -0.0625rem, $blur: 0.125rem, $color: var(--c-dark-green));
    }
  }
}
</style>
