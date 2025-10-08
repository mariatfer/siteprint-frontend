<script setup lang="ts">
import type { Carousel, Media } from '@/interfaces/common'

const props = defineProps<{
  carousel: Carousel[]
  borderRadius?: boolean
  height?: string
}>()

const { Swiper, SwiperSlide, modules } = useSwiper()

const transformDataToMediaThumbnail = (mediaItem: Carousel) => {
  return {
    url: mediaItem.media.url,
    alternativeText: mediaItem.media.alternativeText,
    documentId: mediaItem.media.documentId,
    id: mediaItem.media.id,
    mime: mediaItem.media.mime,
    poster: mediaItem.cover.url,
  }
}
const carouselData = props.carousel?.map((item) =>
  transformDataToMediaThumbnail(item),
) as Media[]
</script>

<template>
  <div class="carousel-wrapper">
    <Swiper
      :modules="modules"
      :loop="carousel.length > 1 ? true : false"
      :keyboard="true"
      :pagination="{ dynamicBullets: true, clickable: true }"
      :grab-cursor="true"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      class="carousel"
      :style="{ height }"
    >
      <SwiperSlide
        v-for="carouselItem in carouselData"
        :key="carouselItem.id"
        class="carousel__article"
      >
        <NuxtImg
          v-if="carouselItem.mime?.includes('image')"
          :src="carouselItem.url"
          :alt="carouselItem.alternativeText"
          :title="carouselItem.alternativeText"
          :placeholder="carouselItem.placeholder"
          class="carousel__image"
          fetchpriority="high"
          preload
          :sizes="'100vw'"
          :width="1200"
          :height="800"
          quality="85"
        />
        <video
          v-else
          :src="carouselItem.url"
          :poster="carouselItem.poster"
          :controls="carouselItem.controls"
          :autoplay="carouselItem.autoPlay"
          :loop="carouselItem.loop"
          :muted="carouselItem.muted"
          controlsList="nodownload"
        ></video>
      </SwiperSlide>
      <div class="swiper-button-next" aria-label="Siguiente diapositiva"></div>
      <div class="swiper-button-prev" aria-label="Diapositiva anterior"></div>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
.carousel-wrapper {
  overflow: hidden;
  border-radius: var(--s-border-radius);
}

.carousel {
  max-height: 35.125rem;
  aspect-ratio: 21 / 9;
  max-width: 100%;
  width: 100%;
  height: 100%;
  @include responsive() {
    aspect-ratio: 4 / 5;
    max-height: 25rem;
  }

  &__article {
    width: 100%;
    height: 100%;
    position: relative;
    @include flex($align: stretch);
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
