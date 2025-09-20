<script setup lang="ts">
defineProps<{
  color?: string
  positionAbsolute?: boolean
}>()
const route = useRoute()
const segments = route.path.split('/').filter(Boolean)

const getLink = (index: number) => {
  return '/' + segments.slice(0, index + 1).join('/')
}
</script>

<template>
  <nav class="bread-crumbs" :class="{ 'bread-crumbs--absolute': positionAbsolute }">
    <ul class="bread-crumbs__list" :style="{ color }">
      <li class="bread-crumbs__item" :style="{ color }">
        <NuxtLink to="/" class="bread-crumbs__link"> Inicio </NuxtLink>
        <span v-if="segments.length > 0" class="bread-crumbs__separator"> / </span>
      </li>
      <li
        v-for="(segment, index) in segments"
        :key="segment"
        class="bread-crumbs__item"
        :style="{ color }"
      >
        <NuxtLink :to="getLink(index)" class="bread-crumbs__link">
          {{ segment }}
        </NuxtLink>
        <span v-if="index < segments.length - 1" class="bread-crumbs__separator">
          /
        </span>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.bread-crumbs {
  mix-blend-mode: luminosity;

  &--absolute {
    position: absolute;
    z-index: 12;
  }

  &__list {
    margin: 0.7rem;
  }

  &__list,
  &__item {
    @include flex($justify: flex-start, $gap: 0.2rem);
    font-family: var(--f-font-lato);
    font-size: var(--s-font-small);
  }

  &__separator {
    opacity: 0.8;
  }
  &__link {
    font-style: italic;
    transition: var(--t-transition);
    opacity: 0.8;
    &:hover {
      opacity: 1;
      text-decoration: underline;
    }
  }
}
</style>
