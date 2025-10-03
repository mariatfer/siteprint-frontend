import type { Contact } from '@/interfaces/contact'

export const getContact = async () => {
  const { find } = useStrapi()
  const { data: response } = await find<Contact>('contact-page', {
    populate: {
      contactImage: {
        fields: ['url', 'alternativeText'],
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

  return response as unknown as Contact
}
