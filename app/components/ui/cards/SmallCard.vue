<script setup lang="ts">
import type { SmallCard } from '@/interfaces/common'

defineProps<SmallCard>()

const { elementRef, isVisible } = useScrollAnimation({
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
  once: true,
})
</script>

<template>
  <article ref="elementRef" class="card" :class="{ 'card--visible': isVisible }">
    <NuxtImg
      v-if="cardImage"
      :src="cardImage.url"
      :alt="cardImage.alternativeText"
      :title="cardImage.alternativeText"
      placeholder="/original-logo.svg"
      class="card__image"
      sizes="100vw"
      width="160"
      height="136"
    />
    <h3 class="card__title">{{ title }}</h3>
  </article>
</template>

<style lang="scss" scoped>
.card {
  @include flex(column, $gap: 1rem);
  width: 10rem;
  height: auto;
  @include scrollAnimation();
  @include responsive() {
    width: 15rem;
  }

  &__image {
    height: 4.5rem;
    width: fit-content;
    @include responsive() {
      height: 6rem;
    }
  }
  &__title {
    text-align: center;
    font-size: var(--s-font-p);
  }
}
</style>
