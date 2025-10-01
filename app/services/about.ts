import type { About } from '@/interfaces/about'

export const getAbout = async () => {
  const { find } = useStrapi()
  const { data: response } = await find<About>('about-page', {
    fields: ['content'],
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

  return response as unknown as About
}
