<script setup lang="ts">
import type { CookiesLocales } from '@/interfaces/cookies'
import type { BooleanConsentKey } from '@/composables/useCookies'

const { data: cookiesLocales } = await useLocales<CookiesLocales>('cookies')

const { consent, showModal, updateConsent, setCookieConsent } = useCookies()

const closeModal = () => (showModal.value = false)
const savePreferences = () => setCookieConsent(consent.value)
</script>

<template>
  <Teleport to="body">
    <Transition name="translate-page">
      <div v-if="showModal" class="cookie-modal" role="dialog" aria-modal="true">
        <div class="cookie-modal__overlay" @click="closeModal"></div>
        <div class="cookie-modal__content">
          <h2 class="cookie-modal__title">{{ cookiesLocales.modal.title }}</h2>
          <UiTheLine margin-top="0rem" />
          <p class="cookie-modal__description">{{ cookiesLocales.modal.description }}</p>

          <form class="cookie-modal__form" @submit.prevent="savePreferences">
            <UiFormInputSwitch
              v-for="item in cookiesLocales.modal.form"
              :key="item.id"
              v-bind="item"
              :model-value="consent[item.name as BooleanConsentKey]"
              @update:model-value="
                (val: boolean | undefined) =>
                  updateConsent(item.name as BooleanConsentKey, val)
              "
            />
          </form>

          <div class="cookie-modal__actions">
            <button type="button" class="cookie-modal__buttons" @click="savePreferences">
              {{ cookiesLocales.modal.actions.savePreferences }}
            </button>
            <button type="button" class="cookie-modal__buttons" @click="closeModal">
              {{ cookiesLocales.modal.actions.closeModal }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.cookie-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  @include flex();

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  &__content {
    @include flex(column, $gap: 1.5rem);
    position: relative;
    background: var(--c-white);
    padding: 2rem;
    max-width: 90%;
    width: 28.125rem;
    max-height: 90vh;
    border: 0.1875rem solid;
    border-image: linear-gradient(90deg, var(--c-primary), var(--c-secondary)) 1;
    overflow-y: auto;
  }

  &__title {
    font-size: var(--s-font-h4);
    font-weight: 600;
    color: var(--c-dark-blue);
    @include responsive() {
      font-size: var(--s-font-h4-mobile);
    }
  }

  &__description {
    color: var(--c-graphite);
    font-size: var(--s-font-cta);
    font-family: var(--f-font-raleway);
    font-weight: 500;
  }

  &__form {
    @include flex(column, $align: flex-start, $gap: 0.75rem);
    margin: 0 0 1rem 0;
  }

  &__actions {
    @include flex($justify: flex-end, $gap: 0.5rem);
  }

  &__buttons {
    padding: 0.5rem 1rem;
    border: 0.0625rem solid var(--c-primary);
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 0.2s;

    &:first-child {
      background-color: var(--c-primary);
      color: var(--c-white);

      &:hover {
        opacity: 0.9;
      }
    }

    &:last-child {
      background-color: transparent;
      color: var(--c-primary);

      &:hover {
        background-color: var(--c-primary);
        color: var(--c-white);
      }
    }
  }
}
</style>
