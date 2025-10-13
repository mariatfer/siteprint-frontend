<script setup lang="ts">
import type { Product } from '@/interfaces/products'
import type { CarouselLocales } from '@/interfaces/carousel'

defineProps<{
  products: Product[]
}>()

const { data: carouselLocales } = await useLocales<CarouselLocales>('carousel')

const { productUrl } = useAppUrls()

const { Swiper, SwiperSlide, modules } = useSwiper()
</script>

<template>
  <Swiper
    v-if="products.length"
    :modules="modules"
    :loop="true"
    :keyboard="true"
    :grab-cursor="true"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
    :slides-per-view="1"
    :breakpoints="{
      '1024': {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      '1260': {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      '1440': {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      '1600': {
        slidesPerView: 5,
        spaceBetween: 10,
      },
    }"
    class="carousel"
  >
    <SwiperSlide
      v-for="product in products.filter((product) => product.productImage)"
      :key="product.id"
      class="carousel__article"
    >
      <NuxtLinkLocale
        :to="productUrl(product.slug)"
        :title="product.title"
        class="carousel__link"
      >
        <NuxtImg
          v-if="product.productImage"
          :src="product.productImage.url"
          :alt="product.productImage.alternativeText"
          :title="product.productImage.alternativeText"
          :placeholder="product.productImage.placeholder"
          fetchpriority="high"
          preload
          sizes="192px"
          width="192"
          height="192"
          quality="85"
          class="carousel__image"
        />
        <h3 class="carousel__product">{{ product.name }}</h3>
      </NuxtLinkLocale>
    </SwiperSlide>
    <button class="swiper-button-next" :aria-label="carouselLocales.nextSlide"></button>
    <button class="swiper-button-prev" :aria-label="carouselLocales.prevSlide"></button>
  </Swiper>
</template>

<style lang="scss" scoped>
.carousel {
  &__article {
    width: 100%;
    height: 100%;
    padding: 1rem 0;
    @include flex($align: stretch);
  }

  &__link {
    border-radius: 50%;
    transition: var(--t-transition);
    will-change: transform;
    &:hover {
      transform: translateY(-0.125rem);
      .carousel__image {
        border-color: var(--c-secondary);
        @include box-shadow($blur: 0.5rem, $color: #0000001e);
      }
    }
  }

  &__image {
    border-radius: 50%;
    width: 12rem;
    height: 12rem;
    border: 0.125rem solid var(--c-light-graphite);
    transition: var(--t-transition);
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
