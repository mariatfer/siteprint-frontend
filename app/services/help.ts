import type { Slug } from '@/interfaces/common'
import type { Help } from '~/interfaces/help'

export const getHelps = async () => {
  const { find } = useStrapi()
  const { data: response } = await find<Help>('helps', {
    fields: ['id', 'name', 'title', 'slug'],
  })

  return response
}

export const getHelpBySlug = async ({ slug }: Slug) => {
  const { find } = useStrapi()
  const { data } = await find<Help>('helps', {
    filters: {
      slug: { $eq: slug },
    },
    fields: ['id', 'name', 'slug', 'content'],
    populate: {
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
