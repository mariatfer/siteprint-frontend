import type { Slug } from '@/interfaces/common'
import type { Policy } from '@/interfaces/policies'

export const getPolicies = async () => {
  const { find } = useStrapi()
  const { data: response } = await find<Policy>('policies', {
    fields: ['id', 'name', 'title', 'slug'],
  })

  return response
}

export const getPolicyBySlug = async ({ slug }: Slug) => {
  const { find } = useStrapi()
  const { data } = await find<Policy>('policies', {
    filters: {
      slug: { $eq: slug },
    },
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
    fields: ['id', 'slug', 'content'],
  })

  const response = data[0]

  return response
}
