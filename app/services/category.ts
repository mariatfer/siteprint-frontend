import type { Category } from '@/interfaces/navbar'

export const getCategories = async () => {
  const { find } = useStrapi()
  const { data: response } = await find<Category>('categories', {
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
  return response
}
