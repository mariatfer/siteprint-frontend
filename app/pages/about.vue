<script setup lang="ts">
import { getAbout } from '@/services/about'
import type { About } from '@/interfaces/about'

const about = ref<About>()
about.value = await getAbout()

const { contrastColor, analyzeImageColor } = useImageColor()
const { parseMarkdown } = useSanitizedMarkdown()

const htmlContent = ref('')
onMounted(async () => {
  if (about.value) {
    const imgUrl = about.value.hero.heroImage.url
    await analyzeImageColor(imgUrl, 100)
    htmlContent.value = await parseMarkdown(about.value.content)
  }
})

if (about.value) {
  useSeoMeta({
    title: about.value.seo.metaTitle,
    ogTitle: about.value.seo.ogTitle,
    description: about.value.seo.metaDescription,
    ogDescription: about.value.seo.ogDescription,
    ogImage: about.value.seo.ogImage,
    ogImageAlt: about.value.seo.ogImage.alternativeText,
    author: about.value.seo.author,
    robots: `${about.value.seo.noIndex ? 'noindex' : 'index'}, ${about.value.seo.noFollow ? 'nofollow' : 'follow'}`,
  })
}
</script>

<template>
  <div class="about">
    <UiSEOTitle v-if="about?.seo" :meta-title="about.seo.metaTitle" />
    <UiBreadCrumbs :color="contrastColor" :position-absolute="true" :no-padding="true" />
    <UiTheHero v-if="about?.hero" :hero="about.hero" />
    <section v-if="about?.content" class="about__content" v-html="htmlContent" />
  </div>
</template>

<style lang="scss" scoped>
.about {
  &__content {
    padding: 0 var(--s-padding);
    margin: var(--s-margin) 0;
    @include responsive() {
      padding: 0 var(--s-padding-mobile);
      margin: var(--s-margin-mobile) 0;
    }
    @include markdown();
  }
}
</style>
