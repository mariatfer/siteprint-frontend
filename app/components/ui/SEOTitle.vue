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
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
