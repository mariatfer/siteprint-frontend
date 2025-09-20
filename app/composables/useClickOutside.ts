export function useClickOutside(
  targetRef: Ref<HTMLElement | null>,
  callback: () => void,
) {
  let enabled = false

  function handleClickOutside(event: MouseEvent) {
    const target = targetRef.value
    if (enabled && target && !target.contains(event.target as Node)) {
      callback()
    }
  }

  onMounted(() => {
    nextTick(() => {
      enabled = true
      document.addEventListener('click', handleClickOutside)
    })
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
}
