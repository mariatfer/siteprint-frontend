<script setup lang="ts">
defineProps<{
  marginTop?: string
}>()
</script>

<template>
  <div class="line" :style="{ marginTop }"></div>
</template>

<style lang="scss" scoped>
.line {
  width: 100%;
  margin: 3.5rem auto 0 auto;
  height: 0.125rem;
  background-color: var(--c-primary);
}
</style>
