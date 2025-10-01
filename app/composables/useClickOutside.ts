export function useClickOutside(
  targetRef: Ref<HTMLElement | null>,
  callback: () => void,
  options: {
    enabled?: Ref<boolean> | boolean
    delay?: number
    activateOnEnable?: boolean
  } = {},
) {
  const { enabled = ref(true), delay = 0, activateOnEnable = false } = options

  const isEnabled = typeof enabled === 'boolean' ? ref(enabled) : enabled
  let listener: ((e: MouseEvent) => void) | null = null
  let isFirstRun = true

  function setupListener() {
    if (listener) {
      document.removeEventListener('click', listener)
      listener = null
    }

    if (!unref(isEnabled)) return

    const setupListenerFn = () => {
      listener = (event: MouseEvent) => {
        const target = targetRef.value
        if (unref(isEnabled) && target && !target.contains(event.target as Node)) {
          callback()
        }
      }
      document.addEventListener('click', listener)
    }

    if (delay > 0 || (activateOnEnable && !isFirstRun)) {
      setTimeout(setupListenerFn, delay || 10)
    } else {
      nextTick(setupListenerFn)
    }

    isFirstRun = false
  }

  function cleanupListener() {
    if (listener) {
      document.removeEventListener('click', listener)
      listener = null
    }
  }

  watch(
    isEnabled,
    (newValue, oldValue) => {
      if (newValue) {
        if (!activateOnEnable || oldValue === false) {
          setupListener()
        }
      } else {
        cleanupListener()
      }
    },
    { immediate: !activateOnEnable },
  )

  onMounted(() => {
    if (!activateOnEnable) {
      setupListener()
    }
  })

  onBeforeUnmount(() => {
    cleanupListener()
  })

  return {
    enable: () => {
      isEnabled.value = true
    },
    disable: () => {
      isEnabled.value = false
    },
    toggle: () => {
      isEnabled.value = !isEnabled.value
    },
    cleanup: cleanupListener,
  }
}
