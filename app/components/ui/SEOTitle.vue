<script setup lang="ts">
defineProps<{
  metaTitle: string
}>()
</script>
<template>
  <h1 class="seo-title">{{ metaTitle }}</h1>
</template>

<style lang="scss" scoped>
.seo-title {
  position: absolute;
  width: 0.0625rem;
  height: 0.0625rem;
  padding: 0;
  margin: -0.0625rem;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
