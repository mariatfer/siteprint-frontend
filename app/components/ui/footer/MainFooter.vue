<script setup lang="ts">
import type { Footer } from '@/interfaces/footer'
import type { Policy } from '@/interfaces/policies'
import { getPolicies } from '@/services/policies'
const { data: footerLocales } = await useLocales<Footer>('footer')
const { isResponsiveResolution } = useWindowsResize()

const policies = ref<Policy[]>([])
policies.value = await getPolicies()
</script>

<template>
  <footer v-if="footerLocales" class="footer">
    <ul class="footer__categories">
      <li
        v-for="category in footerLocales.categories"
        :key="category.id"
        class="footer--width"
      >
        <h3 class="footer__category-name">{{ category.name }}</h3>
        <ul class="footer--width">
          <li v-for="link in category.links" :key="link.id" class="footer__item">
            <NuxtLinkLocale :to="link.link" :title="link.title" class="footer__link">
              <icon
                v-if="link.icon"
                :name="resolveIcons(link.icon.name)"
                :alt="link.icon.alt"
                class="footer__icon"
              />
              {{ link.name }}
            </NuxtLinkLocale>
          </li>
        </ul>
      </li>
      <li v-if="isResponsiveResolution" class="footer--width">
        <h3 class="footer__category-name">{{ footerLocales.policies.name }}</h3>
        <ul class="footer--width">
          <li v-for="policy in policies" :key="policy.id" class="footer__item">
            <NuxtLinkLocale
              :to="`/${policy.slug}`"
              :title="policy.title"
              class="footer__link"
            >
              {{ policy.name }}
            </NuxtLinkLocale>
          </li>
        </ul>
      </li>
    </ul>
    <ul v-if="!isResponsiveResolution" class="footer__policies">
      <template v-for="(policy, index) in policies" :key="policy.id">
        <li class="footer__policy">
          <NuxtLinkLocale
            :to="`/${policy.slug}`"
            :title="policy.title"
            class="footer__link"
            >{{ policy.name }}</NuxtLinkLocale
          >
        </li>
        <li v-if="index < footerLocales.policies.links.length - 1" class="point"></li>
      </template>
    </ul>
    <h3 class="footer__copyright">{{ footerLocales.copyright }}</h3>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  @include flex(column);
  width: 100%;
  height: auto;
  padding: 2.5rem 0;
  background-color: var(--c-primary);
  color: var(--c-white);
  letter-spacing: 0.0313rem;

  &__categories {
    width: 70%;
    max-width: 62.5rem;
    @include flex($justify: space-around);
    @include responsive() {
      width: 100%;
      padding: 0 var(--s-padding-mobile);
      @include flex(column, flex-start, $gap: 1rem);
    }
  }

  &--width {
    @include responsive() {
      width: 100%;
    }
  }

  &__category-name {
    padding: 0.625rem;
    font-size: var(--s-font-cta);
    font-weight: 600;
    color: var(--c-secondary);
  }

  &__item {
    padding: 0.625rem;
    width: 100%;
    transition: var(--t-transition);
    &:hover {
      background-color: var(--c-dark-blue);
    }
  }

  &__icon {
    width: 1.1875rem;
    height: 1.1875rem;
  }

  &__policies {
    @include flex($gap: 0.8rem);
    margin: 2rem 0;
  }

  &__policy {
    transition: var(--t-transition);
    &:hover {
      color: var(--c-secondary);
    }
  }

  &__link {
    @include flex($justify: flex-start, $gap: 0.5rem);
    font-size: var(--s-font-small);
  }

  &__copyright {
    font-size: var(--s-font-cta);
    font-family: var(--f-font-poppins);
    font-weight: 500;
    text-align: center;
    color: var(--c-light-graphite);
    @include responsive() {
      margin: 2rem 0 0 0;
    }
  }
}
.point {
  background-color: var(--c-secondary);
  border-radius: 50%;
  width: 0.375rem;
  height: 0.375rem;
}
</style>
