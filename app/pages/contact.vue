<script setup lang="ts">
import type { Contact, ContactLocales } from '@/interfaces/contact'
import { getContact } from '@/services/contact'

const { data: contactLocales } = await useLocales<ContactLocales>('contact')
const contact = ref<Contact>()
contact.value = await getContact()

const { contrastColor, analyzeImageColor } = useImageColor()

onMounted(async () => {
  if (contact.value) {
    const imgUrl = contact.value.contactImage.url
    await analyzeImageColor(imgUrl, 100)
  }
})
if (contact.value) {
  useSeoMeta({
    title: contact.value.seo.metaTitle,
    ogTitle: contact.value.seo.ogTitle,
    description: contact.value.seo.metaDescription,
    ogDescription: contact.value.seo.ogDescription,
    ogImage: contact.value.seo.ogImage,
    ogImageAlt: contact.value.seo.ogImage.alternativeText,
    author: contact.value.seo.author,
    robots: `${contact.value.seo.noIndex ? 'noindex' : 'index'}, ${contact.value.seo.noFollow ? 'nofollow' : 'follow'}`,
  })
}
</script>

<template>
  <div class="contact">
    <UiBreadCrumbs :color="contrastColor" :position-absolute="true" :no-padding="true" />
    <UiSEOTitle v-if="contact?.seo" :meta-title="contact.seo.metaTitle" />
    <ViewsContactHero
      v-if="contact?.contactImage"
      :contact-image="contact.contactImage"
      :hero-cards="contactLocales.heroCards"
    />
    <section class="contact__form">
      <ViewsSharedQuoteForm form-type="contact" :locales="contactLocales.quoteForm" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.contact {
  &__form {
    width: 60%;
    max-width: 50rem;
    margin: var(--s-margin) auto;
    @include responsive() {
      width: 100%;
      max-width: unset;
      margin: var(--s-margin-mobile) 0;
      padding: 0 var(--s-padding-mobile);
    }
  }
}
</style>
