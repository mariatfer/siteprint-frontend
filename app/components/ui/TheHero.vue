<script setup lang="ts">
import type { Hero } from '@/interfaces/common'

defineProps<{
  hero: Hero
  padding?: boolean
}>()
</script>

<template>
  <section
    v-if="hero && hero.heroImage"
    class="hero"
    :class="{ 'hero--with-padding': padding }"
  >
    <NuxtImg
      :src="hero.heroImage.url"
      :alt="hero.heroImage.alternativeText"
      :title="hero.heroImage.alternativeText"
      fetchpriority="high"
      preload
      sizes="100vw"
      width="1696"
      height="562"
      placeholder
      quality="85"
      class="hero__image"
      :class="{ 'hero__image--border': padding }"
    />
    <div class="hero__content">
      <h2 v-if="hero.title" class="hero__title">{{ hero.title }}</h2>
      <p v-if="hero.description" class="hero__description">{{ hero.description }}</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  aspect-ratio: 21 / 9;
  position: relative;
  max-height: 31.25rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  &--with-padding {
    padding: 0 var(--s-padding);

    @include responsive() {
      padding: 0 var(--s-padding-mobile);
    }
  }

  &__image {
    grid-column: 1;
    grid-row: 1;

    &--border {
      border-radius: var(--s-border-radius);
    }
  }

  &__content {
    grid-column: 1;
    grid-row: 1;
    align-self: end;
    justify-self: start;
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    padding: 2.5rem;

    @include responsive() {
      padding: 2rem;
    }
    @include responsive(75rem) {
      width: 60%;
    }
  }

  &__title {
    font-weight: bolder;
    font-size: 3.7rem;
    text-align: left;
    text-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.7);
    color: var(--c-white);
    margin: 0 0 0.5rem 0;

    @include responsive(75rem) {
      font-size: var(--s-font-h2-mobile);
    }
    @include responsive() {
      margin: 0;
    }
    @include responsive(54rem) {
      font-size: var(--s-font-h3-mobile);
    }
  }

  &__description {
    font-size: 1.2rem;
    line-height: 1.4;
    text-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.8);
    color: var(--c-white);
    margin: 0;
    max-width: 37.5rem;

    @include responsive(75rem) {
      font-size: 1rem;
    }
    @include responsive() {
      display: none;
    }
  }
}
</style>
