<script setup lang="ts">
import type { Category } from '@/interfaces/navbar'

defineProps<{
  category: Category
  index: number
}>()
</script>

<template>
  <section
    class="products-section"
    :class="index % 2 === 0 ? 'products-section--transparent' : 'products-section--color'"
  >
    <h2 class="products-section__title">{{ category.name }}</h2>
    <article class="products-section__grid">
      <UiCardsProductCard
        v-for="product in category.products"
        :key="product.id"
        :product="product"
      />
    </article>
  </section>
</template>

<style lang="scss" scoped>
.products-section {
  @include flex(column, $gap: 4rem);
  padding: var(--s-padding);
  @include responsive() {
    padding: var(--s-padding) var(--s-padding-mobile);
  }

  &__title {
    font-weight: bold;
    color: var(--c-dark-brown);
  }

  &__grid {
    @include flex($wrap: wrap, $gap: 2rem);

    @include responsive(45rem) {
      @include flex(column, $gap: 3rem);
    }
  }

  &--color {
    background-color: #eaf7ffb4;
    @include box-shadow($blur: 3.125rem, $color: #27acff63);
  }
  &--transparent {
    background-color: transparent;
  }
}
</style>
