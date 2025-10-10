<script setup lang="ts">
import { ICONS } from '@/constants/icons'
import { useCookies } from '@/composables/useCookies'
import type { CookiesLocales } from '~/interfaces/cookies'

const { data: cookiesLocales } = await useLocales<CookiesLocales>('cookies')

const { showModal, showBanner } = useCookies()
const openCookiesSettings = () => {
  showModal.value = true
}
</script>

<template>
  <Transition name="fade">
    <button
      v-if="!showBanner"
      type="button"
      class="cookies"
      :aria-label="cookiesLocales.button.ariaLabel"
      @click="openCookiesSettings"
    >
      <Icon :name="ICONS.cookies" aria-hidden="true" class="cookies__icon" />
    </button>
  </Transition>
</template>

<style lang="scss" scoped>
.cookies {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 998;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: var(--c-secondary);
  @include flex();
  &__icon {
    color: var(--c-dark-blue);
    width: 2rem;
    height: 2rem;
  }
}
</style>
