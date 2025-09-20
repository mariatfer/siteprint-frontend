<script setup lang="ts">
import type { Product } from '~/interfaces/products'

defineProps<{
  products: Product[]
}>()

const { Swiper, SwiperSlide, modules } = useSwiper()
</script>

<template>
  <Swiper
    :modules="modules"
    :loop="true"
    :mousewheel="true"
    :keyboard="true"
    :grab-cursor="true"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
    :slides-per-view="1"
    :space-between="10"
    :breakpoints="{
      '640': {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      '980': {
        slidesPerView: 3,
        spaceBetween: 90,
      },
      '1440': {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      '1600': {
        slidesPerView: 5,
        spaceBetween: 70,
      },
    }"
    class="carousel"
  >
    <SwiperSlide
      v-for="product in products.filter((product) => product.productImage)"
      :key="product.id"
      class="carousel__article"
    >
      <NuxtLinkLocale :href="product.slug" :title="product.title" class="carousel__link">
        <NuxtImg
          v-if="product.productImage"
          :src="`http://localhost:1337${product.productImage.url}`"
          :alt="product.productImage.alternativeText"
          :title="product.productImage.alternativeText"
          :placeholder="product.productImage.placeholder"
          class="carousel__image"
        />
        <h4 class="carousel__product">{{ product.name }}</h4>
      </NuxtLinkLocale>
    </SwiperSlide>
    <div class="swiper-button-next" aria-label="Next slide"></div>
    <div class="swiper-button-prev" aria-label="Previous slide"></div>
  </Swiper>
</template>

<style lang="scss" scoped>
.carousel {
  &__article {
    width: 100%;
    height: 100%;
    // position: relative;
    @include flex($align: stretch);
  }

  &__link {
    border-radius: 50%;
  }

  &__image {
    border-radius: 50%;
    width: 12rem;
    height: 12rem;
    border: 0.125rem solid var(--c-light-graphite);
    transition: var(--t-transition);
    &:hover {
      border-color: var(--c-secondary);
    }
  }

  &__product {
    text-align: center;
    margin: 0.5rem auto;
    font-size: var(--s-font-p);
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 12rem;
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: var(--c-primary);
  }

  ::v-deep(.swiper-pagination-bullet) {
    background-color: var(--c-primary);
    &.swiper-pagination-bullet-active {
      background-color: var(--c-primary);
    }
  }
}
</style>
