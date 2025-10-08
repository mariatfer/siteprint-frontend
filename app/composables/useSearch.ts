import type { Category, ProductLite } from '@/interfaces/navbar'

export function useSearchedProducts(search: Ref<string>, categories: Ref<Category[]>) {
  const searchedProducts = computed<ProductLite[]>(() => {
    const allProducts = categories.value.flatMap((category) => category.products)

    if (!search.value || !search.value.trim()) return []

    const normalizedSearch = search.value.toLowerCase().trim()

    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(normalizedSearch),
    )
  })

  return {
    searchedProducts,
  }
}
