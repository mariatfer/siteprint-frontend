<script setup lang="ts">
import type { CategoriesName, ProductLite } from '@/interfaces/navbar'

defineProps<{
  products: ProductLite[]
  selectedCategory: CategoriesName | null
  headerText: string
}>()

const emit = defineEmits<{
  (e: 'update:category', value: CategoriesName | null): void
}>()
const productsNavbarRef = ref<HTMLElement | null>(null)

useClickOutside(productsNavbarRef, () => {
  emit('update:category', null)
})

const closeDropdown = () => {
  emit('update:category', null)
}

const MAX_CARDS = 2
const { productUrl } = useAppUrls()
</script>

<template>
  <nav ref="productsNavbarRef" class="products">
    <section>
      <h3 class="products__title">{{ headerText }}</h3>
      <ul v-if="products" class="products__list">
        <li v-for="product in products" :key="product.id" class="products__item">
          <NuxtLinkLocale
            :href="productUrl(product.slug)"
            :title="product.title"
            class="products__link"
            @click="closeDropdown"
          >
            {{ product.name }}
          </NuxtLinkLocale>
        </li>
      </ul>
    </section>
    <section class="products__cards">
      <UiCardsProductCard
        v-for="product in products.slice(0, MAX_CARDS)"
        :key="product.id"
        :product="product"
        @click="closeDropdown"
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
