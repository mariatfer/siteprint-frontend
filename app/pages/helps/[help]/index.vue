<script setup lang="ts">
import type { Slug } from '@/interfaces/common'
import type { Help } from '@/interfaces/help'
import { getHelpBySlug } from '@/services/help'

const route = useRoute()
const {
  params: { help },
} = route
const helpSlug: Slug = { slug: help as string }
const helpData = ref<Help>()
helpData.value = await getHelpBySlug(helpSlug)

const { parseMarkdown } = useSanitizedMarkdown()
const htmlContent = ref('')
onMounted(async () => {
  if (helpData.value) {
    htmlContent.value = await parseMarkdown(helpData.value.content)
  }
})

if (helpData.value?.seo) {
  useSeoMeta({
    title: helpData.value.seo.metaTitle,
    ogTitle: helpData.value.seo.ogTitle,
    description: helpData.value.seo.metaDescription,
    ogDescription: helpData.value.seo.ogDescription,
    ogImage: helpData.value.seo.ogImage,
    ogImageAlt: helpData.value.seo.ogImage.alternativeText,
    author: helpData.value.seo.author,
    robots: `${helpData.value.seo.noIndex ? 'noindex' : 'index'}, ${helpData.value.seo.noFollow ? 'nofollow' : 'follow'}`,
  })
}
</script>

<template>
  <div class="help">
    <UiSEOTitle v-if="helpData?.seo" :meta-title="helpData.seo.metaTitle" />
    <UiBreadCrumbs />
    <section v-if="helpData?.content" class="help__content" v-html="htmlContent" />
    <section v-if="helpData?.accordion" class="help__accordion">
      <ViewsProductsTheAccordion
        v-for="item in helpData.accordion"
        :key="item.id"
        v-bind="item"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.help {
  &__content {
    padding: 0 var(--s-padding);
    @include responsive() {
      padding: 0 var(--s-padding-mobile);
    }
    @include markdown();
  }

  &__accordion {
    padding: 0 var(--s-padding);
    margin: var(--s-margin-mobile) 0;
    @include responsive() {
      padding: 0 var(--s-padding-mobile);
    }
  }
}
</style>
