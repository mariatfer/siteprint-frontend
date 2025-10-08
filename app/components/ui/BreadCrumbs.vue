<script setup lang="ts">
import type { BreadCrumbsLocales } from '@/interfaces/breadCrumbs'

defineProps<{
  color?: string
  positionAbsolute?: boolean
  noPadding?: boolean
}>()
const route = useRoute()
const segments = route.path
  .split('/')
  .filter(Boolean)
  .map((segment) => segment.replace(/-/g, ' '))

const getLink = (index: number) => {
  return '/' + segments.slice(0, index + 1).join('/')
}

const { data: breadCrumbsLocales } = await useLocales<BreadCrumbsLocales>('bread-crumbs')
</script>

<template>
  <nav
    class="bread-crumbs"
    :class="{
      'bread-crumbs--absolute': positionAbsolute,
      'bread-crumbs--no-padding': noPadding,
    }"
  >
    <ul class="bread-crumbs__list" :style="{ color }">
      <li class="bread-crumbs__item" :style="{ color }">
        <NuxtLink
          to="/"
          :title="`${breadCrumbsLocales.goTo} ${breadCrumbsLocales.home}`"
          class="bread-crumbs__link"
          >{{ breadCrumbsLocales.home }}</NuxtLink
        >
        <span v-if="segments.length > 0" class="bread-crumbs__separator"> / </span>
      </li>
      <li
        v-for="(segment, index) in segments"
        :key="segment"
        class="bread-crumbs__item"
        :style="{ color }"
      >
        <template v-if="index < segments.length - 1">
          <NuxtLink
            :to="getLink(index)"
            :title="`${breadCrumbsLocales.goTo} ${segment}`"
            class="bread-crumbs__link"
          >
            {{ segment }}
          </NuxtLink>
        </template>
        <template v-else>
          <span class="bread-crumbs__current">{{ segment }}</span>
        </template>
        <span v-if="index < segments.length - 1" class="bread-crumbs__separator">
          /
        </span>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.bread-crumbs {
  padding: 0.7rem var(--s-padding);
  @include responsive() {
    padding: 0.7rem var(--s-padding-mobile);
  }

  &--no-padding {
    padding: 0.7rem var(--s-padding-mobile);
  }

  &--absolute {
    position: absolute;
    z-index: 12;
  }

  &__list,
  &__item {
    @include flex($justify: flex-start, $gap: 0.2rem);
  }

  &__separator {
    opacity: 0.8;
    font-family: var(--f-font-lato);
    font-size: var(--s-font-small);
  }
  &__link {
    transition: var(--t-transition);
    &:hover {
      opacity: 1;
      text-decoration: underline;
    }
  }
  &__link,
  &__current {
    font-style: italic;
    opacity: 0.8;
  }
  &__current {
    font-family: var(--f-font-raleway);
    font-size: var(--s-font-cta);
    opacity: 0.9;
  }

  &__link,
  &__current {
    font-style: italic;
    opacity: 0.8;
  }
}
</style>
