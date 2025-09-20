<script setup lang="ts">
import type { Home, HomeLocales } from '@/interfaces/home'
import type { Product } from '@/interfaces/products'
const { data: homeLocales } = await useLocales<HomeLocales>('home')
const { find } = useStrapi()
const { data: response } = await find<Home>('home-page', {
  populate: {
    homeCarousel: {
      populate: {
        media: {
          fields: ['url', 'alternativeText', 'mime'],
        },
        cover: {
          fields: ['url', 'alternativeText', 'mime'],
        },
      },
    },
    hero: {
      populate: {
        heroImage: {
          fields: ['url', 'alternativeText'],
        },
      },
    },
    smallCard: {
      populate: {
        cardImage: {
          fields: ['url', 'alternativeText'],
        },
      },
    },
    seo: {
      populate: {
        ogImage: {
          fields: ['url', 'alternativeText'],
        },
      },
    },
  },
})
const homeData = response as unknown as Home
const { data: products } = await find<Product>('products', {
  populate: {
    productImage: {
      fields: ['url', 'alternativeText'],
    },
  },
})

useSeoMeta({
  title: homeData.seo.metaTitle,
  ogTitle: homeData.seo.ogTitle,
  description: homeData.seo.metaDescription,
  ogDescription: homeData.seo.ogDescription,
  ogImage: homeData.seo.ogImage,
  ogImageAlt: homeData.seo.ogImage.alternativeText,
  author: homeData.seo.author,
})
</script>

<template>
  <UiSEOTitle :meta-title="homeData.seo.metaTitle" />
  <section class="carousel">
    <UiBaseCarousel v-if="homeData.homeCarousel" :carousel="homeData.homeCarousel" />
    <UiTheLine />
  </section>
  <section v-if="products && products.length" class="products">
    <UiTheTitle>{{ homeLocales.ourServices }}</UiTheTitle>
    <ViewsHomeProductCarousel :products="products" />
  </section>
  <UiTheHero v-if="homeData.hero" :hero="homeData.hero" :padding="true" />
  <section class="cards-section">
    <UiTheTitle>{{ homeLocales.keyAdvantages.title }}</UiTheTitle>
    <div v-if="homeData.smallCard" class="cards-section--align">
      <UiCardsSmallCard v-for="card in homeData.smallCard" :key="card.id" v-bind="card" />
    </div>
    <UiTheLine />
  </section>
  <ViewsHomeTheMap />
</template>
<style scoped lang="scss">
.carousel,
.products {
  margin: 0.5rem 0 0 0;
  padding: 0 var(--s-padding);
  @include responsive() {
    padding: 0 var(--s-padding-mobile);
  }
}
.products {
  margin: 0 0 var(--s-margin) 0;
  @include responsive() {
    margin: 0 0 var(--s-margin-mobile) 0;
  }
}

.cards-section {
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
</style>
