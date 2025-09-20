<script setup lang="ts">
import type { Hero } from '@/interfaces/home'

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
      :src="`http://localhost:1337${hero.heroImage.url}`"
      :alt="hero.heroImage.alternativeText"
      :title="hero.heroImage.alternativeText"
      fetchpriority="high"
      sizes="100vw"
      quality="90"
      preload
      class="hero__image"
    />
    <h2 class="hero__title">{{ hero.title }}</h2>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  aspect-ratio: 21 / 9;
  position: relative;
  margin: 0 0 var(--s-margin) 0;
  max-height: 31.25rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  @include responsive() {
    margin: 0 0 var(--s-margin-mobile) 0;
  }

  &--with-padding {
    padding: 0 var(--s-padding);

    @include responsive() {
      padding: 0;
    }
  }

  &__image {
    grid-column: 1;
    grid-row: 1;
  }

  &__title {
    grid-column: 1;
    grid-row: 1;
    align-self: end;
    justify-self: start;
    width: fit-content;
    max-width: 100%;
    height: fit-content;
    font-weight: bolder;
    font-size: 3.7rem;
    text-align: left;
    text-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.7);
    color: var(--c-white);
    padding: 2.5rem;
    margin: 0;

    @include responsive() {
      padding: 2.5rem;
    }
    @include responsive(75rem) {
      font-size: var(--s-font-h2-mobile);
      width: 60%;
    }
    @include responsive(54rem) {
      font-size: var(--s-font-h3-mobile);
    }
  }
}
</style>
