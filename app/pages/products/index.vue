<script setup lang="ts">
import { getProductsPage } from '@/services/products'
import { getCategories } from '@/services/category'
import type { ProductsPage } from '@/interfaces/products'
import type { Category } from '@/interfaces/navbar'

const productData = ref<ProductsPage>()
productData.value = await getProductsPage()
const categories = ref<Category[]>()
categories.value = await getCategories()

const { contrastColor, analyzeImageColor } = useImageColor()

onMounted(async () => {
  if (productData.value) {
    const imgUrl = `http://localhost:1337${productData.value.hero.heroImage.url}`
    await analyzeImageColor(imgUrl, 100)
  }
})

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
</script>

<template>
  <div>
    <UiSEOTitle
      v-if="productData?.seo.metaTitle"
      :meta-title="productData.seo.metaTitle"
    />
    <UiBreadCrumbs :color="contrastColor" :position-absolute="true" :no-padding="true" />
    <UiTheHero v-if="productData?.hero" :hero="productData.hero" />
    <ViewsProductsCategoryGrid
      v-for="(category, index) in categories"
      :key="category.id"
      :category="category"
      :index="index"
    />
  </div>
</template>
