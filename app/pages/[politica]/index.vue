<script setup lang="ts">
import type { Slug } from '@/interfaces/common'
import { getPolicyBySlug } from '@/services/policies'
import type { Policy } from '@/interfaces/policies'

const route = useRoute()
const {
  params: { politica },
} = route
const policySlug: Slug = { slug: politica as string }
const policy = ref<Policy>()
policy.value = await getPolicyBySlug(policySlug)

const { contrastColor, analyzeImageColor } = useImageColor()

const { parseMarkdown } = useSanitizedMarkdown()
const htmlContent = ref('')

onMounted(async () => {
  if (policy.value) {
    const imgUrl = `http://localhost:1337${policy.value.hero.heroImage.url}`
    await analyzeImageColor(imgUrl, 100)
    htmlContent.value = await parseMarkdown(policy.value.content)
  }
})

if (policy.value) {
  useSeoMeta({
    title: policy.value.seo.metaTitle,
    ogTitle: policy.value.seo.ogTitle,
    description: policy.value.seo.metaDescription,
    ogDescription: policy.value.seo.ogDescription,
    ogImage: policy.value.seo.ogImage,
    ogImageAlt: policy.value.seo.ogImage.alternativeText,
    author: policy.value.seo.author,
    robots: `${policy.value.seo.noIndex ? 'noindex' : 'index'}, ${policy.value.seo.noFollow ? 'nofollow' : 'follow'}`,
  })
}
</script>

<template>
  <UiSEOTitle v-if="policy?.seo" :meta-title="policy.seo.metaTitle" />
  <UiBreadCrumbs :color="contrastColor" :position-absolute="true" :no-padding="true" />
  <UiTheHero v-if="policy?.hero" :hero="policy.hero" />
  <section v-if="policy?.content" class="policy" v-html="htmlContent" />
</template>

<style lang="scss" scoped>
.policy {
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
