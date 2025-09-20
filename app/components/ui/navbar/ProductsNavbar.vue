<script setup lang="ts">
import type { Product } from '@/interfaces/products'
import type { CategoriesName } from '@/interfaces/navbar'

const props = defineProps<{
  products: Product[]
  selectedCategory: CategoriesName | null
}>()

const emit = defineEmits<{
  (e: 'update:category', value: CategoriesName | null): void
}>()
const productsNavbarRef = ref<HTMLElement | null>(null)

useClickOutside(productsNavbarRef, () => {
  emit('update:category', null)
})

const headerText = computed(() => {
  if (!props.selectedCategory) return null

  const product = props.products.find(
    (product) => product.category.name === props.selectedCategory,
  )

  return product?.category.headerText ?? null
})

const productsSlug = '/productos'
const MAX_CARDS = 2
</script>

<template>
  <nav ref="productsNavbarRef" class="products">
    <section>
      <h3 class="products__title">{{ headerText }}</h3>
      <ul v-if="products" class="products__list">
        <li v-for="product in products" :key="product.id" class="products__item">
          <NuxtLinkLocale
            :href="`${productsSlug}${product.slug}`"
            :title="product.title"
            class="products__link"
          >
            {{ product.name }}
          </NuxtLinkLocale>
        </li>
      </ul>
    </section>
    <section class="products__">
      <UiCardsProductCard
        v-for="product in products.slice(0, MAX_CARDS)"
        :key="product.id"
        :product="product"
      />
    </section>
  </nav>
</template>

<style lang="scss" scoped>
.products {
  @include flex($justify: space-between, $align: flex-start);
  background-color: var(--c-light-green);
  padding: var(--s-padding-mobile) var(--s-padding);

  @include responsive {
    display: none;
  }

  &__title {
    font-family: var(--f-font-lato);
    font-size: var(--s-font-p);
    font-weight: bold;
    text-transform: uppercase;
    color: var(--c-dark-brown);
    margin: 0 0 1rem 0;
  }

  &__list {
    @include flex(column, flex-start, space-between, $gap: 0.9rem);
    height: 100%;
  }

  &__item {
    color: var(--c-dark-brown);
    font-weight: 500;
  }
  &__link {
    @include underline($color: var(--c-dark-brown));
  }
  &__cards {
    @include flex($gap: 0.9rem);
  }
}
</style>
