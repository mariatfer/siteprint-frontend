import type { Product, ProductsPage } from '@/interfaces/products'
import type { Slug } from '@/interfaces/common'

export const getProducts = async () => {
  const { find } = useStrapi()
  const { data: response } = await find<Product>('products', {
    populate: {
      category: {
        fields: ['name', 'headerText'],
      },
      productImage: {
        fields: ['url', 'alternativeText'],
      },
    },
  })

  return response
}

export const getProductBySlug = async ({ slug }: Slug) => {
  const { find } = useStrapi()
  const { data } = await find<Product>('products', {
    filters: {
      slug: { $eq: slug },
    },
    populate: {
      category: {
        fields: ['name', 'headerText'],
      },
      productImage: {
        fields: ['url', 'alternativeText'],
      },
      productCarousel: {
        populate: {
          media: {
            fields: ['url', 'alternativeText', 'mime'],
          },
          cover: {
            fields: ['url', 'alternativeText', 'mime'],
          },
        },
      },
      accordion: {
        fields: ['label', 'content'],
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

  const response = data[0]

  return response
}

export const getProductsPage = async () => {
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

  return response as unknown as ProductsPage
}
