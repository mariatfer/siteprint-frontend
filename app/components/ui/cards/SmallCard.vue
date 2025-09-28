<script setup lang="ts">
import type { SmallCard } from '@/interfaces/common'

defineProps<SmallCard>()
</script>

<template>
  <article class="card">
    <NuxtImg
      v-if="cardImage"
      :src="`http://localhost:1337${cardImage.url}`"
      :alt="cardImage.alternativeText"
      :title="cardImage.alternativeText"
      placeholder="/original-logo.svg"
      class="card__image"
    />
    <h3 class="card__title">{{ title }}</h3>
  </article>
</template>

<style lang="scss" scoped>
.card {
  @include flex(column, $gap: 1rem);
  width: 10rem;
  height: auto;
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
