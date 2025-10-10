<script setup lang="ts">
import { Toaster } from 'vue-sonner'
type ToasterProps = InstanceType<typeof Toaster>['$props']
type Position = ToasterProps['position']

const expand = ref(true)
const position = ref<Position>('top-right')
const richColors = ref(true)
const closeButton = ref(true)
</script>

<template>
  <NuxtLayout>
    <Toaster
      :position="position"
      :close-button="closeButton"
      :rich-colors="richColors"
      :expand="expand"
    />
    <NuxtPage />
  </NuxtLayout>
  <UiCookiesBanner />
</template>
