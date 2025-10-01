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
    const imgUrl = `http://localhost:1337${about.value.hero.heroImage.url}`
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
  <UiSEOTitle v-if="about?.seo" :meta-title="about.seo.metaTitle" />
  <UiBreadCrumbs :color="contrastColor" :position-absolute="true" :no-padding="true" />
  <UiTheHero v-if="about?.hero" :hero="about.hero" />
  <section v-if="about?.content" class="about" v-html="htmlContent" />
</template>

<style lang="scss" scoped>
.about {
  padding: 0 var(--s-padding);
  margin: var(--s-margin) 0;
  @include responsive() {
    padding: 0 var(--s-padding-mobile);
    margin: var(--s-margin-mobile) 0;
  }

  &:deep(h2) {
    margin: 3rem 0 2rem 0;
    font-weight: 600;
  }

  &:deep(h3) {
    margin: 1.5rem 0;
  }

  &:deep(p) {
    margin: 1rem 0;
  }

  &:deep(ul) {
    padding: 0 0 0 2rem;
  }

  &:deep(li) {
    list-style: lower-latin;
  }

  &:deep(a) {
    color: var(--c-primary);
    font-weight: 600;
  }
}
</style>
