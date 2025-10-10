<script setup lang="ts">
import type { CookiesLocales } from '@/interfaces/cookies'

const { data: cookiesLocales } = await useLocales<CookiesLocales>('cookies')

const { banner } = cookiesLocales
const { policyUrl } = useAppUrls()
const { showBanner, showModal, setCookieConsent, initCookies } = useCookies()

onMounted(initCookies)

const openSettings = () => (showModal.value = true)

const acceptAll = () => setCookieConsent('all')
const rejectAll = () => setCookieConsent('rejected')
</script>

<template>
  <Transition name="translate-banner">
    <div v-if="showBanner" class="cookie">
      <p class="cookie__description">
        {{ banner.description }}
        <NuxtLinkLocale
          :to="policyUrl(banner.cookiesLink.slug)"
          :title="banner.cookiesLink.title"
          class="cookie__link"
        >
          {{ banner.cookiesLink.name }}
        </NuxtLinkLocale>
      </p>
      <div class="cookie__actions">
        <button class="cookie__button" @click="acceptAll">
          {{ banner.actions.acceptAll }}
        </button>
        <button class="cookie__button" @click="rejectAll">
          {{ banner.actions.rejectAll }}
        </button>
        <button class="cookie__button" @click="openSettings">
          {{ banner.actions.configure }}
        </button>
      </div>
    </div>
  </Transition>
  <UiCookiesModal />
</template>

<style lang="scss" scoped>
.cookie {
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 1rem;
  z-index: 999;
  border-radius: var(--s-border-radius);
  background-color: var(--c-dark-blue);
  color: var(--c-white);
  padding: 1rem 1.5rem;
  @include box-shadow($blur: 1rem, $color: #0000004b);

  &__description {
    font-size: var(--s-font-small);
    margin: 0 0 1rem 0;
  }

  &__link,
  &__button {
    font-size: var(--s-font-small);
    color: var(--c-secondary);
    font-family: var(--f-font-raleway);
    @include underline(var(--c-secondary));
  }

  &__actions {
    @include flex($justify: flex-start, $gap: 2rem);
    @include responsive() {
      gap: 1rem;
    }
  }

  &__button {
    font-weight: 500;
  }
}
</style>
