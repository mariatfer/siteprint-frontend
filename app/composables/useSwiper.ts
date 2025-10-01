import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export function useSwiper() {
  return {
    Swiper,
    SwiperSlide,
    modules: [Pagination, Navigation, Autoplay, Keyboard],
  }
}
