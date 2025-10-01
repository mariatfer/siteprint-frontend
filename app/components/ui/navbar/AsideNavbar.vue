<script setup lang="ts">
import type { Category, Aside } from '@/interfaces/navbar'
import { PRODUCTS_URL } from '@/constants/link'
const props = defineProps<{
  showMenu: boolean
  asideLocales: Aside
  categories: Category[]
}>()

const selectedCategoryId = ref<number | null>(null)

const selectedCategory = computed(
  () =>
    props.categories.find((category) => category.id === selectedCategoryId.value) ?? null,
)

const filteredProducts = computed(
  () =>
    selectedCategory.value?.products ??
    props.categories.flatMap((category) => category.products),
)

const resetSelection = () => {
  selectedCategoryId.value = null
}

const emit = defineEmits<{
  (e: 'update:showMenu', value: boolean): void
}>()

const asideNavbarRef = ref<HTMLElement | null>(null)

useClickOutside(
  asideNavbarRef,
  () => {
    emit('update:showMenu', false)
  },
  {
    enabled: computed(() => props.showMenu),
    activateOnEnable: true,
    delay: 10,
  },
)

const closeDropdown = () => {
  emit('update:showMenu', false)
}
</script>

<template>
  <Transition name="modal-slide" appear>
    <div
      v-if="showMenu"
      ref="asideNavbarRef"
      class="aside-menu"
      role="dialog"
      aria-modal="true"
      :aria-label="asideLocales.ariaLabel"
    >
      <Transition name="slide-fade" mode="out-in">
        <div :key="selectedCategoryId !== null ? selectedCategoryId : 'default'">
          <h4 v-if="selectedCategoryId === null" class="aside-menu__title">
            {{ asideLocales.section }}
          </h4>

          <ul v-if="selectedCategoryId === null">
            <li
              v-for="category in categories"
              :key="category.id"
              class="aside-menu__category"
            >
              <button
                class="aside-menu__button"
                @click="selectedCategoryId = category.id"
              >
                {{ category.name }}
                <Icon
                  :name="resolveIcons(asideLocales.rightArrow.name)"
                  :alt="asideLocales.rightArrow.alt"
                  class="aside-menu__icon"
                />
              </button>
            </li>
          </ul>

          <div v-else>
            <button class="aside-menu__back" @click="resetSelection">
              <Icon
                :name="resolveIcons(asideLocales.leftArrow.name)"
                :alt="asideLocales.leftArrow.alt"
                class="aside-menu__icon"
              />
              {{ asideLocales.back }}
            </button>
            <h5 class="aside-menu__subtitle">{{ selectedCategory?.name }}</h5>
            <ul>
              <li
                v-for="product in filteredProducts"
                :key="product.id"
                class="aside-menu__item"
              >
                <NuxtLinkLocale
                  :href="`${PRODUCTS_URL}${product.slug}`"
                  class="aside-menu__product"
                  @click="closeDropdown"
                >
                  {{ product.name }}
                </NuxtLinkLocale>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.aside-menu {
  display: none;
  @include responsive() {
    display: block;
    position: fixed;
    left: 0;
    height: 100vh;
    max-width: 17.5rem;
    width: 17.5rem;
    background-color: var(--c-primary);
    color: var(--c-light-graphite);
    border-top: 0.0938rem solid var(--c-dark-blue);
    @include box-shadow(0.375rem, 0.3125rem, 0.625rem, $color: rgba(0, 0, 0, 0.26));
    overflow: hidden auto;
    &__title {
      padding: 1rem var(--s-padding-mobile);
      font-size: var(--s-font-h4-mobile);
      font-weight: 500;
      color: var(--c-mid-graphite);
      font-style: italic;
      user-select: none;
    }

    &__category {
      padding: 0.5rem var(--s-padding-mobile);
      transition: var(--t-transition);
      &:hover {
        background-color: var(--c-dark-blue);
      }
    }

    &__button {
      @include flex($justify: space-between, $gap: 0.5rem);
      width: 100%;
      text-align: left;
      font-size: var(--s-font-cta);
      font-weight: 400;
      transition: var(--t-transition);
      &:hover {
        color: var(--c-secondary);
      }
    }

    &__icon {
      width: 1.4rem;
      height: 1.4rem;
    }

    &__back {
      @include flex($justify: flex-start, $gap: 0.4rem);
      font-size: var(--s-font-small);
      font-weight: 400;
      padding: 1rem var(--s-padding-mobile) 0 var(--s-padding-mobile);
      transition: var(--t-transition);
      &:hover {
        color: var(--c-secondary);
      }
    }

    &__subtitle {
      padding: 1rem var(--s-padding-mobile) 0.5rem var(--s-padding-mobile);
      font-size: var(--s-font-p);
      color: var(--c-mid-graphite);
      font-family: var(--f-font-poppins);
      font-weight: 500;
      font-style: italic;
      user-select: none;
    }

    &__item {
      margin: 0.3rem 0;
      padding: 0.5rem var(--s-padding-mobile);
      transition: var(--t-transition);
      &:hover {
        color: var(--c-secondary);
        background-color: var(--c-dark-blue);
      }
    }

    &__product {
      padding: 0.2rem 0;
      font-size: var(--s-font-cta);
      font-weight: 500;
    }
  }
}
</style>
