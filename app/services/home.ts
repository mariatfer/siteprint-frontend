import type { Home } from '@/interfaces/home'

export const getHome = async () => {
  const { find } = useStrapi()
  const { data: response } = await find<Home>('home-page', {
    populate: {
      homeCarousel: {
        populate: {
          media: {
            fields: ['url', 'alternativeText', 'mime'],
          },
          cover: {
            fields: ['url', 'alternativeText', 'mime'],
          },
        },
      },
      hero: {
        populate: {
          heroImage: {
            fields: ['url', 'alternativeText'],
          },
        },
      },
      smallCard: {
        populate: {
          cardImage: {
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

  return response as unknown as Home
}
