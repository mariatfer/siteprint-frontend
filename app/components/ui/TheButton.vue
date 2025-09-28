<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    type?: string
    action?: () => void
  }>(),
  {
    to: '',
    href: '',
    type: '',
    action: undefined,
  },
)

const emit = defineEmits(['click'])

const tag = computed(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'button'
})

const linkAttrs = computed(() => {
  if (props.href) {
    return { target: '_blank', rel: 'noopener' }
  }
  return {}
})

function handleClick(event: Event) {
  if (props.action) {
    event.preventDefault()
    props.action()
  }
  emit('click', event)
}
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :type="type"
    class="button"
    v-bind="linkAttrs"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.button {
  display: inline-block;
  transition: all 0.2s ease-in;
  position: relative;
  overflow: hidden;
  z-index: 1;
  color: #090909;
  padding: 0.7em 1.7em;
  cursor: pointer;
  font-size: var(--s-font-p);
  border-radius: 0.5em;
  background: #e8e8e8;
  border: 0.0625rem solid #e8e8e8;
  @include box-shadow(
    $x: 0.375rem,
    $y: 0.375rem,
    $blur: 0.75rem,
    $color: #c5c5c5,
    $x2: -0.375rem,
    $y2: -0.375rem,
    $blur2: 0.75rem,
    $color2: #ffffff
  );
  &:active {
    color: #666;
    @include box-shadow(
      $x: 0.25rem,
      $y: 0.25rem,
      $blur: 0.75rem,
      $color: #c5c5c5,
      $inset: true,
      $x2: -0.25rem,
      $y2: -0.25rem,
      $blur2: 0.75rem,
      $color2: #ffffff,
      $inset2: true
    );
  }
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scaleY(1) scaleX(1.25);
    top: 100%;
    width: 140%;
    height: 180%;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }
  &:after {
    content: '';
    position: absolute;
    left: 55%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background-color: var(--c-secondary);
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }
  &:hover,
  &:focus {
    border: 0.0625rem solid var(--c-secondary);
  }
  &:hover:before,
  &:focus:before {
    top: -35%;
    background-color: var(--c-secondary);
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }
  &:hover:after,
  &:focus:after {
    top: -45%;
    background-color: var(--c-secondary);
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }
}
</style>
