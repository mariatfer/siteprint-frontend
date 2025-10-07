<script setup lang="ts">
import type { HelpLocales } from '@/interfaces/help'

const { data: policiesLocales } = await useLocales<HelpLocales>('policies')

const { policyUrl } = useAppUrls()

useSeoMeta({
  title: policiesLocales.seo.metaTitle,
  ogTitle: policiesLocales.seo.ogTitle,
  description: policiesLocales.seo.metaDescription,
  ogDescription: policiesLocales.seo.ogDescription,
  ogImage: policiesLocales.seo.ogImage,
  ogImageAlt: policiesLocales.seo.ogImage.alternativeText,
  author: policiesLocales.seo.author,
  robots: `${policiesLocales.seo.noIndex ? 'noindex' : 'index'}, ${policiesLocales.seo.noFollow ? 'nofollow' : 'follow'}`,
})
</script>

<template>
  <div class="policies">
    <UiBreadCrumbs :no-padding="true" />
    <UiSEOTitle :meta-title="policiesLocales.seo.metaTitle" />
    <h2 class="policies__title">{{ policiesLocales.title }}</h2>
    <p class="policies__intro">
      {{ policiesLocales.intro }}
    </p>

    <div class="policies__cards">
      <UiCardsFlipCard
        v-for="card in policiesLocales.cards"
        :key="card.id"
        :card="card"
        :slug="policyUrl(card.slug)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.policies {
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
