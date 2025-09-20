<template>
  <div class="line"></div>
</template>

<style lang="scss" scoped>
.line {
  width: 100%;
  margin: 3.5rem auto var(--s-margin) auto;
  height: 0.125rem;
  background-color: var(--c-primary);
  @include responsive() {
    margin: 3.5rem auto var(--s-margin-mobile) auto;
  }
}
</style>
