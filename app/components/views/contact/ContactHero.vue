<script setup lang="ts">
import type { Media } from '@/interfaces/common'
import type { HeroCards } from '@/interfaces/contact'

defineProps<{
  contactImage: Media
  heroCards: HeroCards[]
}>()
</script>

<template>
  <section class="contact-hero">
    <NuxtImg
      v-if="contactImage"
      :src="contactImage.url"
      :alt="contactImage.alternativeText"
      :title="contactImage.alternativeText"
      placeholder="/original-logo.svg"
      placeholder-class="contact-hero__placeholder"
      fetchpriority="high"
      preload
      sizes="(min-width: 1024px) 50vw, 100vw"
      width="400"
      height="400"
      quality="85"
      class="contact-hero__image"
    />
    <article class="contact-hero__info">
      <div v-for="(card, index) in heroCards" :key="card.id" class="contact-hero__card">
        <header>
          <h2 class="contact-hero__title">{{ card.title }}</h2>
        </header>
        <div class="contact-hero__details">
          <Icon
            :name="resolveIcons(card.icon.name)"
            role="img"
            :aria-label="card.icon.ariaLabel"
            class="contact-hero__icon"
          />
          <ul class="contact-hero__list">
            <li v-for="info in card.info" :key="info.id" class="contact-hero__item">
              <strong>{{ info.highlight }}</strong> {{ info.normal }}
            </li>
          </ul>
        </div>
        <UiTheLine v-if="index !== heroCards.length - 1" margin-top="1.5rem" />
      </div>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.contact-hero {
  @include flex();
  margin: 0 auto;
  background-color: var(--c-light-graphite);
  max-height: 31rem;
  @include box-shadow($y: 0.625rem, $blur: 3rem, $color: #0000005b);

  @include responsive() {
    @include flex(column);
    width: 100%;
    max-height: unset;
  }

  &__placeholder {
    width: 25rem;
    max-width: 25rem;
    height: 10rem;
    object-fit: contain;
  }

  &__image {
    flex: 1;
    max-width: 50%;
    max-height: 31rem;
    aspect-ratio: 16 / 9;
    order: 0;

    @include responsive() {
      aspect-ratio: 16 / 9;
      max-width: unset;
    }
  }

  &__info {
    @include flex(column, $gap: 1.5rem);
    flex: 1;
    max-width: 50%;
    order: 1;

    @include responsive() {
      padding: var(--s-padding-mobile);
      max-width: unset;
      width: 100%;
    }
  }

  &__card {
    width: fit-content;
    min-width: 22.75rem;
    @include responsive() {
      width: 100%;
      min-width: unset;
    }
  }

  &__title {
    font-size: var(--s-font-p);
    font-weight: 600;
    margin: 0 0 1rem 0;
  }

  &__details {
    @include flex($align: flex-start, $justify: flex-start, $gap: 1rem);
  }

  &__item,
  &__list {
    font-size: var(--s-font-cta);
    @include responsive(45rem) {
      @include flex(column, flex-start, flex-start, $gap: 0.1rem);
    }
  }

  &__icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
