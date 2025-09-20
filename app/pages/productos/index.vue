<script setup lang="ts">
import type { ProductsPage } from '@/interfaces/products'

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
  },
})

const productData = response as unknown as ProductsPage

const { contrastColor, analyzeImageColor } = useImageColor()

onMounted(async () => {
  const imgUrl = `http://localhost:1337${productData.hero.heroImage.url}`
  await analyzeImageColor(imgUrl, 100)
})
</script>

<template>
  <UiBreadCrumbs :color="contrastColor" :position-absolute="true" />
  <UiTheHero :hero="productData.hero" />
</template>
