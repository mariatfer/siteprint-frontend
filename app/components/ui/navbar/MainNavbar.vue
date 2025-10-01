<script setup lang="ts">
import { resolveIcons } from '@/composables/useResolveAssets'
import type { NavbarLocales, CategoriesName, Category } from '@/interfaces/navbar'
import { getCategories } from '@/services/category'
const { data: navbarLocales } = await useLocales<NavbarLocales>('navbar')

const categories = ref<Category[]>([])
categories.value = await getCategories()
const selectedCategory = ref<CategoriesName | null>(null)

const orderedCategories = computed(() => {
  return [...categories.value].sort((a, b) => a.order - b.order)
})

const selectedCategoryData = computed(() => {
  return (
    categories.value.find((category) => category.name === selectedCategory.value) ?? null
  )
})

const filteredProducts = computed(() => {
  return (
    selectedCategoryData.value?.products ??
    categories.value.flatMap((category) => category.products)
  )
})

const headerText = computed(() => {
  return selectedCategoryData.value?.headerText ?? ''
})
const showMenu = ref(false)

function toggleMenu() {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <header v-if="navbarLocales" class="navbar">
    <section class="navbar__principal">
      <div class="navbar__left-side">
        <UiNavbarHamburgerToggle :active="showMenu" @toggle="toggleMenu" />
        <NuxtLinkLocale
          :href="navbarLocales.logo.link"
          :title="navbarLocales.logo.title"
          class="navbar__logo"
        >
          <NuxtImg
            :src="navbarLocales.logo.image.url"
            :title="navbarLocales.logo.image.alternativeText"
            :alt="navbarLocales.logo.image.alternativeText"
            class="navbar__image"
            placeholder
          />
          <div class="navbar__title" role="heading">
            {{ navbarLocales.logo.enterpriseTitle.text }}
            <span class="navbar__span">{{
              navbarLocales.logo.enterpriseTitle.span
            }}</span>
          </div>
        </NuxtLinkLocale>
      </div>

      <UiNavbarSearchBar v-if="navbarLocales.search" v-bind="navbarLocales.search" />

      <NuxtLinkLocale
        :href="navbarLocales.login.link"
        :title="navbarLocales.login.title"
        class="navbar__login"
      >
        <icon
          :name="resolveIcons(navbarLocales.login.icon.name)"
          :alt="navbarLocales.login.icon.alt"
          class="navbar__login-icon"
        />
      </NuxtLinkLocale>
    </section>

    <UiNavbarCategoriesNavbar
      v-if="categories && categories.length"
      :categories="orderedCategories"
      :selected-category="selectedCategory"
      @update:selected-category="selectedCategory = $event"
    />

    <Transition name="fade">
      <UiNavbarProductsNavbar
        v-if="selectedCategory && filteredProducts.length"
        v-model:category="selectedCategory"
        :products="filteredProducts"
        :selected-category="selectedCategory"
        :header-text="headerText"
      />
    </Transition>
    <UiNavbarAsideNavbar
      v-model:show-menu="showMenu"
      :aside-locales="navbarLocales.aside"
      :categories="orderedCategories"
    />
  </header>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 120rem;
  z-index: 1000;

  &__principal {
    background-color: var(--c-primary);
    max-height: 4.1563rem;
    padding: 0.5625rem var(--s-padding);
    @include flex($justify: space-between, $gap: 1rem);

    @include responsive() {
      padding: 0.75rem var(--s-padding-mobile);
      @include flex($justify: space-between, $gap: 0.5rem);
    }
  }

  &__left-side {
    @include flex($justify: space-between, $gap: 2rem);
    @include responsive(25rem) {
      @include flex($justify: space-between, $gap: 1em);
    }
  }

  &__logo {
    @include flex($justify: space-between, $gap: 1rem);
  }
  &__title {
    @include flex(column, flex-start);
    font-weight: bold;
    color: var(--c-white);
    font-size: var(--s-font-h4);
    transition: var(--t-transition);
    order: 1;
    &:hover {
      color: var(--c-secondary);
      .navbar__span {
        color: var(--c-white);
      }
    }
    @include responsive() {
      display: none;
    }
  }
  &__span {
    color: var(--c-secondary);
    font-size: var(--s-font-small);
    font-family: var(--f-font-raleway);
    transition: var(--t-transition);
  }

  &__image {
    width: 3.1082rem;
    height: 3rem;
    order: 0;
    @include responsive() {
      width: auto;
      height: 2rem;
    }
  }

  &__login {
    @include flex(column);
    color: var(--c-white);
    font-size: var(--s-font-small);
    font-weight: bold;
    transition: var(--t-transition);
    padding: 0.3rem;
    border-radius: 50%;
    &:hover {
      color: var(--c-secondary);
      background-color: var(--c-dark-blue);
    }
  }

  &__login-icon {
    width: 1.9rem;
    height: 1.9rem;
  }
}
</style>
