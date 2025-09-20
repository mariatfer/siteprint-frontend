<script setup lang="ts">
import type { ProductsPage } from '@/interfaces/products'
import type { Category } from '~/interfaces/navbar'

const { find } = useStrapi()
const { data: response } = await find<ProductsPage>('product-page', {
  populate: {
    hero: {
      populate: {
        heroImage: {
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

const productData = response as unknown as ProductsPage

const { data: categories } = await find<Category>('categories', {
  populate: {
    products: {
      populate: {
        productImage: {
          fields: ['url', 'alternativeText'],
        },
      },
    },
  },
})

const { contrastColor, analyzeImageColor } = useImageColor()

onMounted(async () => {
  const imgUrl = `http://localhost:1337${productData.hero.heroImage.url}`
  await analyzeImageColor(imgUrl, 100)
})

useSeoMeta({
  title: productData.seo.metaTitle,
  ogTitle: productData.seo.ogTitle,
  description: productData.seo.metaDescription,
  ogDescription: productData.seo.ogDescription,
  ogImage: productData.seo.ogImage,
  ogImageAlt: productData.seo.ogImage.alternativeText,
  author: productData.seo.author,
})
</script>

<template>
  <UiBreadCrumbs :color="contrastColor" :position-absolute="true" />
  <UiTheHero :hero="productData.hero" />
  <ViewsProductsCategoryGrid
    v-for="(category, index) in categories"
    :key="category.id"
    :category="category"
    :index="index"
  />
</template>
