<script setup lang="ts">
import type { Slug } from '@/interfaces/common'
import { getProductBySlug } from '@/services/products'
import type { Product, ProductLocales } from '@/interfaces/products'

const route = useRoute()
const {
  params: { producto },
} = route
const productSlug: Slug = { slug: producto as string }
const product = ref<Product>()
product.value = await getProductBySlug(productSlug)
const { data: productLocales } = await useLocales<ProductLocales>('product')

if (product.value) {
  useSeoMeta({
    title: product.value.seo.metaTitle,
    ogTitle: product.value.seo.ogTitle,
    description: product.value.seo.metaDescription,
    ogDescription: product.value.seo.ogDescription,
    ogImage: product.value.seo.ogImage,
    ogImageAlt: product.value.seo.ogImage.alternativeText,
    author: product.value.seo.author,
    robots: `${product.value.seo.noIndex ? 'noindex' : 'index'}, ${product.value.seo.noFollow ? 'nofollow' : 'follow'}`,
  })
}
</script>

<template>
  <UiSEOTitle v-if="product?.seo" :meta-title="product.seo.metaTitle" />
  <UiBreadCrumbs />
  <div class="product">
    <article class="product__sides">
      <UiBaseCarousel
        v-if="product?.productCarousel"
        :carousel="product.productCarousel"
        :border-radius="true"
      />
      <h2 v-if="product?.name" class="product__title">{{ product.name }}</h2>
      <p v-if="product?.description">{{ product.description }}</p>
      <section v-if="product?.accordion" class="product__accordion-section">
        <ViewsProductsTheAccordion
          v-for="item in product.accordion"
          :key="item.id"
          v-bind="item"
        />
      </section>
    </article>
    <article class="product__sides">
      <ViewsProductsQuoteForm
        v-if="productLocales.quoteForm"
        :locales="productLocales.quoteForm"
      />
    </article>
  </div>
</template>

<style lang="scss" scoped>
.product {
  @include flex($align: flex-start, $gap: 2rem);
  padding: 0 var(--s-padding);
  margin: 0 0 var(--s-margin) 0;

  @include responsive() {
    @include flex(column, $gap: 2rem);
    padding: 0 var(--s-padding-mobile);
    margin: 0 0 var(--s-margin-mobile) 0;
  }

  &__sides {
    flex: 1 1;
    width: 50%;
    @include responsive() {
      width: 100%;
    }
  }

  &__title {
    font-weight: bold;
    margin: 1.5rem 0;
    color: var(--c-dark-brown);
    font-size: var(--s-font-h3);
    letter-spacing: 0.05rem;
    line-height: 1.3;
    text-transform: uppercase;
    text-shadow: 0.0625rem 0.0625rem 0.125rem rgba(0, 0, 0, 0.1);
    background: linear-gradient(to right, var(--c-primary), var(--c-dark-brown));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0;
    transform: translateY(0.625rem);
    animation: fadeInUp 0.6s ease forwards;

    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @include responsive() {
      font-size: var(--s-font-h3-mobile);
    }
  }

  &__accordion-section {
    margin: 2rem 0;
  }
}
</style>
