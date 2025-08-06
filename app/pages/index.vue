<script setup lang="ts">
import { useLocales } from '@/composables/useLocales'
import type { HomeLocales } from '@/interfaces/locales/homeLocales'
const { data: homeLocales } = useLocales<HomeLocales>('home')
</script>

<template>
  <p>{{ homeLocales?.title }}</p>
</template>
