<script setup lang="ts">
import type { ProductLite, Search } from '@/interfaces/navbar'

defineProps<{
  locales: Search
  products: ProductLite[]
}>()

const emit = defineEmits<{
  (e: 'update:search', value: string | null): void
}>()

const searchRef = ref<HTMLElement | null>(null)
const searchQuery = ref<string>('')

const isDropdownActive = ref(true)

const shouldShowDropdown = computed(() => {
  return isDropdownActive.value && searchQuery.value.trim().length > 0
})

useClickOutside(searchRef, () => {
  closeDropdown()
})

const closeDropdown = () => {
  emit('update:search', null)
  searchQuery.value = ''
  isDropdownActive.value = false
}

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  searchQuery.value = value
  emit('update:search', value || null)
  isDropdownActive.value = true
}

const { productUrl } = useAppUrls()
</script>

<template>
  <div ref="searchRef" class="search">
    <input
      v-model="searchQuery"
      type="search"
      class="search__input"
      :placeholder="locales.placeholder"
      :aria-label="locales.ariaLabel"
      :aria-expanded="shouldShowDropdown"
      aria-controls="search-results"
      @input="handleInput"
    />
    <Icon
      :name="resolveIcons(locales.icon.name)"
      role="img"
      :aria-label="locales.icon.ariaLabel"
      class="search__icon"
    />

    <Transition name="fade">
      <nav
        v-if="shouldShowDropdown"
        id="search-results"
        class="search__container"
        role="region"
        aria-live="polite"
      >
        <template v-if="products.length">
          <NuxtLinkLocale
            v-for="product in products"
            :key="product.id"
            :to="productUrl(product.slug)"
            :title="product.title"
            class="search__card"
            @click="closeDropdown"
          >
            <NuxtImg
              :src="product.productImage.url"
              :alt="product.productImage.alternativeText"
              :title="product.productImage.alternativeText"
              placeholder="/original-logo.svg"
              class="search__image"
              placeholder-class="search__placeholder"
            />
            <span class="search__name">{{ product.name }}</span>
          </NuxtLinkLocale>
        </template>
        <span v-else>{{ locales.emptySearch }}</span>
      </nav>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.search {
  position: relative;
  @include flex;
  max-width: 25rem;
  width: 65%;
  @include responsive(40rem) {
    max-width: 20.5rem;
    width: 100%;
  }

  &__icon {
    position: absolute;
    left: 0.625rem;
    color: var(--c-dark-blue);
    font-size: var(--s-font-p);
  }
  &__input {
    width: 100%;
    border-radius: 3.125rem;
    padding: 0.5rem 0.5rem 0.5rem 2.1875rem;
    background-color: var(--c-light-graphite);
    font-size: var(--s-font-small);
    color: var(--c-dark-blue);
    transition: var(--t-transition);
    @include box-shadow($blur: 0.625rem, $color: #00000062);
    &:focus {
      box-shadow: 0 0 0.3125rem var(--c-secondary);
    }
  }

  &__container {
    @include flex(column, flex-start, flex-start, $gap: 0.1rem);
    position: absolute;
    top: 2.5rem;
    width: 100%;
    max-height: 25rem;
    overflow-y: auto;
    padding: 1rem;
    background-color: var(--c-light-green);
    border-radius: var(--s-border-radius);
    @include box-shadow($y: 3rem, $blur: 4rem, $color: #00000065);
    &::-webkit-scrollbar-thumb {
      background-color: var(--c-dark-green);
    }
    &::-webkit-scrollbar {
      border-radius: var(--s-border-radius);
    }
  }
  &__card {
    @include flex($justify: flex-start, $gap: 1rem);
    width: 100%;
    padding: 0.25rem;
    transition: var(--t-transition);

    &:hover {
      background-color: #acdd8b;
    }
  }
  &__image {
    width: 4rem;
    height: auto;
    aspect-ratio: 1 / 1;
    @include responsive() {
      width: 3rem;
    }
  }
  &__placeholder {
    margin: auto;
    width: 2.1rem;
    height: 2rem;
    @include responsive() {
      width: 1.6rem;
      height: 1.5rem;
    }
  }

  &__name {
    width: 100%;
    @include responsive(42rem) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 22.5rem;
    }
  }
}
</style>
