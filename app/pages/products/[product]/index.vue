<script setup lang="ts">
import type { Slug } from '@/interfaces/common'
import { getProductBySlug } from '@/services/products'
import type { Product, ProductLocales } from '@/interfaces/products'

const route = useRoute()
const {
  params: { product },
} = route
const productSlug: Slug = { slug: product as string }
const productData = ref<Product>()
productData.value = await getProductBySlug(productSlug)
const { data: productLocales } = await useLocales<ProductLocales>('product')
const { parseMarkdown } = useSanitizedMarkdown()
const htmlDescription = ref('')
onMounted(async () => {
  if (productData.value) {
    htmlDescription.value = await parseMarkdown(productData.value.description)
  }
})
if (productData.value) {
  useSeoMeta({
    title: productData.value.seo.metaTitle,
    ogTitle: productData.value.seo.ogTitle,
    description: productData.value.seo.metaDescription,
    ogDescription: productData.value.seo.ogDescription,
    ogImage: productData.value.seo.ogImage,
    ogImageAlt: productData.value.seo.ogImage.alternativeText,
    author: productData.value.seo.author,
    robots: `${productData.value.seo.noIndex ? 'noindex' : 'index'}, ${productData.value.seo.noFollow ? 'nofollow' : 'follow'}`,
  })
}
</script>

<template>
  <div>
    <UiSEOTitle v-if="productData?.seo" :meta-title="productData.seo.metaTitle" />
    <UiBreadCrumbs />
    <section class="product">
      <article class="product__sides">
        <UiBaseCarousel
          v-if="productData?.productCarousel"
          :carousel="productData.productCarousel"
          :border-radius="true"
        />
        <h2 v-if="productData?.name" class="product__title">{{ productData.name }}</h2>
        <p v-if="htmlDescription" v-html="htmlDescription" />
        <section v-if="productData?.accordion" class="product__accordion-section">
          <ViewsProductsTheAccordion
            v-for="item in productData.accordion"
            :key="item.id"
            v-bind="item"
          />
        </section>
      </article>
      <article class="product__sides">
        <ViewsSharedQuoteForm
          v-if="productLocales.quoteForm && productData"
          :locales="productLocales.quoteForm"
          form-type="quote"
          :product-name="productData.name"
        />
      </article>
    </section>
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
