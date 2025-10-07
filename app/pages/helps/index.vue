<script setup lang="ts">
import type { HelpLocales } from '@/interfaces/help'

const { data: helpsLocales } = await useLocales<HelpLocales>('helps')
const { helpUrl } = useAppUrls()

useSeoMeta({
  title: helpsLocales.seo.metaTitle,
  ogTitle: helpsLocales.seo.ogTitle,
  description: helpsLocales.seo.metaDescription,
  ogDescription: helpsLocales.seo.ogDescription,
  ogImage: helpsLocales.seo.ogImage,
  ogImageAlt: helpsLocales.seo.ogImage.alternativeText,
  author: helpsLocales.seo.author,
  robots: `${helpsLocales.seo.noIndex ? 'noindex' : 'index'}, ${helpsLocales.seo.noFollow ? 'nofollow' : 'follow'}`,
})
</script>

<template>
  <div class="help">
    <UiBreadCrumbs :no-padding="true" />
    <UiSEOTitle :meta-title="helpsLocales.seo.metaTitle" />
    <h2 class="help__title">{{ helpsLocales.title }}</h2>
    <p class="help__intro">
      {{ helpsLocales.intro }}
    </p>

    <div class="help__cards">
      <UiCardsFlipCard
        v-for="card in helpsLocales.cards"
        :key="card.id"
        :card="card"
        :slug="helpUrl(card.slug)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.help {
  padding: 0 var(--s-padding);
  text-align: center;
  @include responsive() {
    padding: 0 var(--s-padding-mobile);
  }
  &__title {
    margin: 2rem 0;
    font-weight: 600;
    @include responsive() {
      margin: 1rem 0;
    }
  }

  &__cards {
    @include flex($wrap: wrap, $gap: 2rem);
    margin: var(--s-margin-mobile) 0;
  }
}
</style>
