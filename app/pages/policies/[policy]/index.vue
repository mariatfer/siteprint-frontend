<script setup lang="ts">
import type { Slug } from '@/interfaces/common'
import { getPolicyBySlug } from '@/services/policies'
import type { Policy } from '@/interfaces/policies'

const route = useRoute()
const {
  params: { policy },
} = route
const policySlug: Slug = { slug: policy as string }
const policyData = ref<Policy>()
policyData.value = await getPolicyBySlug(policySlug)

const { contrastColor, analyzeImageColor } = useImageColor()

const { parseMarkdown } = useSanitizedMarkdown()
const htmlContent = ref('')

onMounted(async () => {
  if (policyData.value) {
    const imgUrl = policyData.value.hero.heroImage.url
    await analyzeImageColor(imgUrl, 100)
    htmlContent.value = await parseMarkdown(policyData.value.content)
  }
})

if (policyData.value) {
  useSeoMeta({
    title: policyData.value.seo.metaTitle,
    ogTitle: policyData.value.seo.ogTitle,
    description: policyData.value.seo.metaDescription,
    ogDescription: policyData.value.seo.ogDescription,
    ogImage: policyData.value.seo.ogImage,
    ogImageAlt: policyData.value.seo.ogImage.alternativeText,
    author: policyData.value.seo.author,
    robots: `${policyData.value.seo.noIndex ? 'noindex' : 'index'}, ${policyData.value.seo.noFollow ? 'nofollow' : 'follow'}`,
  })
}
</script>

<template>
  <div class="policy">
    <UiSEOTitle v-if="policyData?.seo" :meta-title="policyData.seo.metaTitle" />
    <UiBreadCrumbs :color="contrastColor" :position-absolute="true" :no-padding="true" />
    <UiTheHero v-if="policyData?.hero" :hero="policyData.hero" />
    <section v-if="policyData?.content" class="policy__content" v-html="htmlContent" />
  </div>
</template>

<style lang="scss" scoped>
.policy {
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
