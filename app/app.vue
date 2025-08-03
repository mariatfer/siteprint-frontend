<script setup lang="ts">
interface Product {
  id: number
  title: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}
const { find, findOne } = useStrapi()

// Find single type (single type)

const { data: home } = await find('home-page', {
  populate: {
    image: {
      fields: ['id', 'url', 'alternativeText'],
    },
  },
})
console.log('Home Page Data:', home)

// Find all products (collection)

const { data: products } = await find('products')
console.log('Products Data:', products)

// Find just one product by slug (collection)

const productSlug = 'product-1'

const { data: product } = await findOne<Product>('products', undefined, {
  filters: {
    slug: {
      $eq: productSlug,
    },
  },
})
console.log('Product:', product)
</script>

<template>
  <div>
    {{ products }}
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    {{ home }}
  </div>
</template>
