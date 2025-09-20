<script lang="ts" setup>
useHead({
  link: [
    { rel: 'preconnect', href: 'https://www.google.com' },
    { rel: 'preconnect', href: 'https://maps.googleapis.com' },
  ],
})
</script>

<template>
  <UiNavbarMainNavbar />
  <div class="layout">
    <main class="content">
      <slot />
    </main>
    <UiFooterMainFooter />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: calc(100dvh - 5.9063rem);
  margin: 5.9063rem 0 0 0;
  @include flex(column, flex-start, flex-start);
  @include responsive() {
    margin: 4rem 0 0;
  }
}

.content {
  max-width: 120rem;
  width: 100%;
  flex: 1;
}
</style>
