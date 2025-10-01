<script setup lang="ts">
import type { Home, HomeLocales } from '@/interfaces/home'
import { getProducts } from '@/services/products'
import { getHome } from '@/services/home'
import type { Product } from '@/interfaces/products'
import { PRODUCTS_URL } from '@/constants/link'
const { data: homeLocales } = await useLocales<HomeLocales>('home')

const homeData = ref<Home>()
homeData.value = await getHome()
const products = ref<Product[]>()
products.value = await getProducts()

useSeoMeta({
  title: homeData.value.seo.metaTitle,
  ogTitle: homeData.value.seo.ogTitle,
  description: homeData.value.seo.metaDescription,
  ogDescription: homeData.value.seo.ogDescription,
  ogImage: homeData.value.seo.ogImage,
  ogImageAlt: homeData.value.seo.ogImage.alternativeText,
  author: homeData.value.seo.author,
  robots: `${homeData.value.seo.noIndex ? 'noindex' : 'index'}, ${homeData.value.seo.noFollow ? 'nofollow' : 'follow'}`,
})
</script>

<template>
  <UiSEOTitle v-if="homeData?.seo.metaTitle" :meta-title="homeData.seo.metaTitle" />
  <section class="carousel">
    <UiBaseCarousel v-if="homeData?.homeCarousel" :carousel="homeData.homeCarousel" />
    <UiTheLine />
  </section>
  <section v-if="products && products.length" class="products">
    <UiTheTitle>{{ homeLocales.ourServices }}</UiTheTitle>
    <ViewsHomeProductCarousel :products="products" />
  </section>
  <UiTheHero v-if="homeData?.hero" :hero="homeData.hero" :padding="true" />
  <section class="cards-section">
    <UiTheTitle>{{ homeLocales.keyAdvantages.title }}</UiTheTitle>
    <div v-if="homeData?.smallCard" class="cards-section--align">
      <UiCardsSmallCard v-for="card in homeData.smallCard" :key="card.id" v-bind="card" />
    </div>
    <UiTheButton :to="PRODUCTS_URL">{{ homeLocales.productButton }}</UiTheButton>

    <UiTheLine />
  </section>
  <section class="store">
    <UiTheTitle>{{ homeLocales.ourStore }}</UiTheTitle>
    <ViewsHomeTheMap />
  </section>
</template>
<style scoped lang="scss">
.carousel,
.products {
  padding: 0 var(--s-padding);
  margin: var(--s-margin) 0;
  @include responsive() {
    padding: 0 var(--s-padding-mobile);
    margin: var(--s-margin-mobile) 0;
  }
}

.carousel {
  margin: 0.5rem 0 0 0;
}
.cards-section {
  @include flex(column);
  padding: 0 var(--s-padding);
  margin: var(--s-margin) 0;
  @include responsive() {
    padding: 0 var(--s-padding-mobile);
    margin: var(--s-margin-mobile) 0;
  }
  &--align {
    @include flex($align: stretch, $gap: 7rem);
    margin: 0 0 var(--s-margin) 0;
    @include responsive() {
      @include flex(column, $gap: 3.5rem);
      margin: 0 0 var(--s-margin-mobile) 0;
    }
  }
}
.store {
  margin: var(--s-margin) 0;
  padding: 0 var(--s-padding);
  @include responsive() {
    margin: var(--s-margin-mobile) 0;
    padding: 0 var(--s-padding-mobile);
  }
}
</style>
