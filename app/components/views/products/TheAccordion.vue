<script lang="ts" setup>
import type { AccordionItem } from '@/interfaces/common'
import { ICONS } from '@/constants/icons'

defineProps<AccordionItem>()

const isOpen = ref(false)
const contentRef = ref<HTMLElement | null>(null)

const toggleAccordion = async () => {
  const el = contentRef.value
  if (!el) return

  if (isOpen.value) {
    el.style.height = el.scrollHeight + 'px'
    requestAnimationFrame(() => {
      el.style.height = '0px'
    })
    isOpen.value = false
  } else {
    el.style.height = '0px'
    isOpen.value = true
    await nextTick()
    requestAnimationFrame(() => {
      el.style.height = el.scrollHeight + 'px'
    })
  }
}

watch(isOpen, async () => {
  const el = contentRef.value
  if (!el) return

  el.addEventListener(
    'transitionend',
    () => {
      if (isOpen.value) {
        el.style.height = 'auto'
      }
    },
    { once: true },
  )
})

const { elementRef, isVisible } = useScrollAnimation({
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
  once: true,
})
</script>

<template>
  <div ref="elementRef" class="accordion" :class="{ 'accordion--visible': isVisible }">
    <button class="accordion__button" :aria-expanded="isOpen" @click="toggleAccordion">
      {{ label }}
      <Icon :name="isOpen ? ICONS.topArrow : ICONS.bottomArrow" aria-hidden="true" />
    </button>

    <div ref="contentRef" class="accordion__content">
      <div class="accordion__inner">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.accordion {
  border: 0.0625rem solid var(--c-mid-graphite);
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1rem;
  @include box-shadow(0, 0.125rem, 0.375rem, $color: rgba(0, 0, 0, 0.05));
  @include scrollAnimation();
  &__button {
    @include flex($justify: space-between);
    width: 100%;
    text-align: left;
    padding: 1rem;
    font-size: var(--s-font-p);
    font-weight: 600;
    color: var(--c-dark-brown);
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--c-light-graphite);
    }

    &[aria-expanded='true'] {
      color: var(--c-dark-blue);
    }
  }

  &__content {
    overflow: hidden;
    height: 0;
    transition:
      height 0.35s ease,
      opacity 0.3s ease;
    opacity: 0;
  }

  &__inner {
    padding: 0 1rem 1rem;
    text-wrap: pretty;
    line-height: 1.35em;
    letter-spacing: 0.0625rem;
  }
}

.accordion__content[style*='height: auto'],
.accordion__content[style*='height: ']:not([style*='0px']) {
  opacity: 1;
}
</style>
