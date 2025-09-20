import { MOBILE_RESOLUTION } from '@/constants/resolutions'

export function useWindowsResize() {
  const isResponsiveResolution = ref(false)

  const updateWindowsResize = () => {
    isResponsiveResolution.value = window.innerWidth < MOBILE_RESOLUTION
  }
  onMounted(() => {
    updateWindowsResize()
    window.addEventListener('resize', updateWindowsResize)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowsResize)
  })

  return { isResponsiveResolution }
}
