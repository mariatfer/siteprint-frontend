<script setup lang="ts">
import { useCookies } from '@/composables/useCookies'
import type { Map } from '@/interfaces/home'
defineProps<Map>()

const { cookieConsent, showModal } = useCookies()

const openCookiesSettings = () => {
  showModal.value = true
}
</script>

<template>
  <template v-if="cookieConsent?.marketing">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3034.670004472678!2d-3.712015023701117!3d40.48256497142907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42299b159a8733%3A0xbadd82e6e79dddf4!2sC.%20de%20Ferm%C3%ADn%20Caballero%2C%2059%2C%20Fuencarral-El%20Pardo%2C%2028034%20Madrid!5e0!3m2!1ses!2ses!4v1758320181843!5m2!1ses!2ses"
      allowfullscreen="true"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      class="map"
      :title="title"
    ></iframe>
  </template>

  <template v-else>
    <div class="cookies">
      <p class="cookies__text">{{ acceptCookies }}</p>
      <UiTheButton :action="openCookiesSettings">{{ buttonLabel }}</UiTheButton>
    </div>
  </template>
</template>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 28.125rem;
  border-radius: var(--s-border-radius);
}
.cookies {
  @include flex(column, $gap: 4rem);
  margin: 4rem 0 0 0;
  width: 100%;
  text-align: center;
  &__text {
    font-family: var(--f-font-raleway);
  }
}
</style>
