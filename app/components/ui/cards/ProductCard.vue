<script setup lang="ts">
import type { Product } from '@/interfaces/products'
import { useCardHover } from '@/composables/useCardHover'
import type { ProductLite } from '@/interfaces/navbar'
defineProps<{ product: Product | ProductLite }>()
const CARDS_CLASS_NAME = '.product-card'
useCardHover(CARDS_CLASS_NAME)
const { productUrl } = useAppUrls()
</script>

<template>
  <NuxtLinkLocale
    v-if="product.productImage"
    :to="productUrl(product.slug)"
    class="product-card"
  >
    <div class="blob"></div>
    <div class="fakeblob"></div>
    <section class="product-card__content">
      <NuxtImg
        :src="product.productImage.url"
        :alt="product.productImage.alternativeText"
        :title="product.productImage.alternativeText"
        placeholder="/original-logo.svg"
        class="product-card__image"
        placeholder-class="product-card__placeholder"
        sizes="100vw"
        width="196"
        height="158"
      />
      <h2 class="product-card__title">{{ product.name }}</h2>
    </section>
  </NuxtLinkLocale>
</template>

<style lang="scss" scoped>
.product-card {
  position: relative;
  width: 100%;
  max-width: 12.5rem;
  min-width: 12.5rem;
  height: 12.5rem;
  background-color: var(--c-white);
  border-radius: 0.75em;
  @include box-shadow($blur: 0.625rem, $color: #0000005b);
  @include flex(column, space-between, space-between);
  cursor: pointer;
  padding: 0.125rem;
  overflow: hidden;
  transition: var(--t-transition);
  border: 0.0313rem solid var(--mid-graphite);

  &__content {
    @include flex(column, $justify: space-between);
    background-color: rgb(237, 246, 255);
    border-radius: 0.65em;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
  }

  &__image {
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  &__placeholder {
    margin: auto;
    width: 4.6rem;
    height: 4.5rem;
  }

  &__title {
    padding: 0.7rem 0;
    color: var(--c-dark-blue);
    font-size: var(--s-font-cta);
    font-weight: bold;
    font-family: var(--f-font-lato);
    text-transform: uppercase;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 10.5rem;
  }
}

.blob {
  @include blob();
}

.fakeblob {
  @include fakeblob();
}
</style>
