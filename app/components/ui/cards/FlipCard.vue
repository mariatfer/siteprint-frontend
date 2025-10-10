<script setup lang="ts">
import type { FlipCard } from '@/interfaces/common'
import { ICONS } from '@/constants/icons'

defineProps<{
  card: FlipCard
  slug: string
}>()

const isFlipped = ref(false)
const cardRef = ref<HTMLElement>()

const handleInteraction = () => {
  if (window.matchMedia('(hover: none)').matches) {
    isFlipped.value = !isFlipped.value
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    isFlipped.value = !isFlipped.value
  }
}
</script>

<template>
  <article
    ref="cardRef"
    class="flip-card"
    :class="{ 'is-flipped': isFlipped }"
    tabindex="0"
    role="button"
    :aria-label="card.ariaLabel"
    :aria-pressed="isFlipped"
    @click="handleInteraction"
    @keydown="handleKeydown"
  >
    <div class="flip-card__inner">
      <div class="flip-card__face flip-card__front">
        <div class="flip-card__icon-wrapper">
          <Icon
            :name="resolveIcons(card.icon.name)"
            class="flip-card__icon"
            aria-hidden="true"
          />
        </div>
        <UiTheTitle :font-size="true" :min-margin="true">{{ card.name }}</UiTheTitle>
        <span class="flip-card__hint" aria-hidden="true">
          <Icon :name="ICONS.rotate" class="flip-card__hint-icon" />
          <span class="flip-card__hint-text">{{ card.hintText }}</span>
        </span>
      </div>
      <div class="flip-card__face flip-card__back">
        <p class="flip-card__description">{{ card.description }}</p>
        <NuxtLinkLocale :to="slug" :title="card.title" class="flip-card__cta" @click.stop>
          {{ card.buttonLabel }}
          <Icon :name="ICONS.rightArrow" class="flip-card__cta-icon" />
        </NuxtLinkLocale>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.flip-card {
  perspective: 62.5rem;
  width: 20rem;
  height: 18rem;
  cursor: pointer;
  outline: none;
  transition: transform 0.2s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover .flip-card__inner {
      transform: rotateY(180deg);
    }

    &:focus-visible {
      transform: scale(1.02);

      .flip-card__inner {
        box-shadow: 0 0 0 0.25rem var(--c-secondary);
      }
    }
  }

  &.is-flipped .flip-card__inner {
    transform: rotateY(180deg);
  }

  @include responsive() {
    width: 95%;
    height: 18rem;
  }

  &__inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
    border-radius: var(--s-border-radius);
    @include box-shadow(0, 0.25rem, 1rem, $color: rgba(0, 0, 0, 0.1));
  }

  &__face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    overflow: hidden;
    border-radius: var(--s-border-radius);
    padding: 2rem 1.5rem;
    @include flex(column, center, center, $gap: 1rem);
  }

  &__front {
    background: linear-gradient(135deg, var(--c-white) 0%, var(--c-light-gray) 100%);
    border: 0.125rem solid var(--c-primary);
    z-index: 2;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 0.25rem;
      background: linear-gradient(90deg, var(--c-primary), var(--c-secondary));
    }
  }

  &__icon-wrapper {
    width: 4rem;
    height: 4rem;
    flex-shrink: 0;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--c-primary), var(--c-secondary));
    @include flex();
    @include box-shadow(0, 0.5rem, 1rem, $color: rgba(0, 0, 0, 0.15));
  }

  &__icon {
    width: 2rem;
    height: 2rem;
    color: var(--c-white);
  }

  &__hint {
    @include flex(center, center, $gap: 0.5rem);
    font-size: var(--s-font-small);
    color: var(--c-graphite);
    opacity: 0.7;
    margin-top: auto;
    transition: opacity 0.3s ease;

    @media (hover: hover) {
      .flip-card:hover & {
        opacity: 0;
      }
    }

    @include responsive() {
      font-size: 0.75rem;
    }
  }

  &__hint-icon {
    width: 1rem;
    height: 1rem;

    @media (hover: hover) {
      animation: rotate 2s linear infinite;
    }
  }

  &__back {
    background: linear-gradient(135deg, var(--c-primary) 0%, var(--c-dark-blue) 100%);
    color: var(--c-white);
    justify-content: space-between;
    transform: rotateY(180deg);
    z-index: 1;
  }

  &__description {
    text-align: center;
    line-height: 1.6;
    font-size: var(--s-font-small);
    flex: 1;
    @include flex();

    @include responsive() {
      font-size: 0.875rem;
    }
  }

  &__cta {
    @include flex($align: flex-start, $gap: 0.5rem);
    padding: 0.75rem 1.5rem;
    background-color: var(--c-light-green);
    color: var(--c-dark-brown);
    border-radius: calc(var(--s-border-radius) / 2);
    font-weight: 600;
    font-size: var(--s-font-cta);
    text-decoration: none;
    transition: var(--t-transition);
    @include box-shadow(0, 0.25rem, 0.75rem, $color: rgba(0, 0, 0, 0.2));

    &:hover {
      background-color: var(--c-secondary);
      transform: translateY(-0.125rem);
      @include box-shadow(0, 0.5rem, 1rem, $color: rgba(0, 0, 0, 0.3));
    }

    &:active {
      transform: translateY(0);
    }
  }

  &__cta-icon {
    width: 1.25rem;
    height: 1.25rem;
    transition: var(--t-transition);

    .flip-card__cta:hover & {
      transform: translateX(0.25rem);
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
