<script setup lang="ts">
import type { Footer, Link } from '@/interfaces/footer'
const { data: footerLocales } = await useLocales<Footer>('footer')
const { isResponsiveResolution } = useWindowsResize()

const { policyUrl, helpUrl } = useAppUrls()

const resolveLink = (link: Link, type: string): string => {
  if (type === 'help') return helpUrl(link.slug || '')
  if (type === 'social') return link.url || '#'
  return link.slug || '#'
}
</script>

<template>
  <footer v-if="footerLocales" class="footer">
    <nav class="footer__categories">
      <section
        v-for="category in footerLocales.categories"
        :key="category.id"
        class="footer__category"
      >
        <h3 class="footer__category-name">{{ category.name }}</h3>
        <ul v-if="category.links?.length">
          <li v-for="link in category.links" :key="link.id" class="footer__item">
            <NuxtLinkLocale
              :to="resolveLink(link, category.type)"
              :title="link.title"
              :target="link.blank ? '_blank' : undefined"
              class="footer__link"
            >
              <Icon
                v-if="link.icon"
                :name="resolveIcons(link.icon.name)"
                role="img"
                :aria-label="link.icon.ariaLabel"
                class="footer__icon"
              />
              {{ link.name }}
            </NuxtLinkLocale>
          </li>
        </ul>
      </section>
    </nav>
    <nav class="footer__policies">
      <h3 v-if="isResponsiveResolution" class="footer__category-name">
        {{ footerLocales.policies.name }}
      </h3>
      <ul class="footer__list">
        <template
          v-for="(policy, index) in footerLocales.policies.links"
          :key="policy.id"
        >
          <li :class="isResponsiveResolution ? 'footer__item' : 'footer__policy'">
            <NuxtLinkLocale
              :to="policyUrl(policy.slug)"
              :title="policy.title"
              class="footer__link"
              >{{ policy.name }}</NuxtLinkLocale
            >
          </li>
          <li
            v-if="
              footerLocales.policies.links &&
              index < footerLocales.policies.links.length - 1 &&
              !isResponsiveResolution
            "
            class="point"
            aria-hidden="true"
          ></li>
        </template>
      </ul>
    </nav>
    <h3 class="footer__copyright">{{ footerLocales.copyright }}</h3>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  @include flex(column, $gap: 3rem);
  width: 100%;
  height: auto;
  padding: 2.5rem 0;
  background-color: var(--c-primary);
  color: var(--c-white);
  letter-spacing: 0.0313rem;
  @include responsive() {
    @include flex(column, $gap: 1rem);
  }
  &__categories {
    width: 70%;
    max-width: 62.5rem;
    @include flex($justify: space-around, $align: flex-start);
    @include responsive() {
      width: 100%;
      padding: 0 var(--s-padding-mobile);
      @include flex(column, flex-start, $gap: 1rem);
    }
  }

  &__category {
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
    width: 1rem;
    height: 1rem;
  }

  &__policies {
    @include responsive() {
      padding: 0 var(--s-padding-mobile);
      width: 100%;
    }
  }

  &__list {
    @include flex($gap: 1rem);
    @include responsive() {
      @include flex(column, flex-start, flex-start);
      margin: 0 0 1rem 0;
    }
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
  }
}
.point {
  background-color: var(--c-secondary);
  border-radius: 50%;
  width: 0.375rem;
  height: 0.375rem;
}
</style>
