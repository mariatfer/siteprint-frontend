export function useCardHover(cardSelector: string, itemsSource?: Ref<unknown[]>) {
  const DISTANCE_THRESHOLD = 250
  const BLOB_CLASS_NAME = '.blob'
  const FAKEBLOB_CLASS_NAME = '.fakeblob'

  const allCards = ref<NodeListOf<HTMLElement> | null>(null)
  let animationFrameId: number | null = null
  let latestMouseEvent: MouseEvent | null = null

  const updateCards = async (waitNextTick = false) => {
    if (waitNextTick) {
      await nextTick()
    }
    allCards.value = document.querySelectorAll(cardSelector)
  }

  const handleMouseMove = (ev: MouseEvent) => {
    latestMouseEvent = ev
    if (animationFrameId !== null) return

    animationFrameId = requestAnimationFrame(() => {
      animationFrameId = null
      if (!allCards.value || !latestMouseEvent) return

      const ev = latestMouseEvent

      allCards.value.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const cardCenterX = rect.left + rect.width / 2
        const cardCenterY = rect.top + rect.height / 2

        const deltaX = ev.clientX - cardCenterX
        const deltaY = ev.clientY - cardCenterY
        const distanceToCardCenter = Math.hypot(deltaX, deltaY)

        if (distanceToCardCenter > DISTANCE_THRESHOLD) {
          const blob = card.querySelector(BLOB_CLASS_NAME) as HTMLElement | null
          if (blob) blob.style.opacity = '0'
          return
        }

        const blob = card.querySelector(BLOB_CLASS_NAME) as HTMLElement | null
        const fakeBlob = card.querySelector(FAKEBLOB_CLASS_NAME) as HTMLElement | null
        if (!blob || !fakeBlob) return

        const offsetX = ev.clientX - rect.left - rect.width / 2
        const offsetY = ev.clientY - rect.top - rect.height / 2

        blob.style.opacity = '1'
        blob.animate([{ transform: `translate(${offsetX}px, ${offsetY}px)` }], {
          duration: 300,
          fill: 'forwards',
        })
      })
    })
  }

  const handleMouseLeave = (card: HTMLElement) => {
    const blob = card.querySelector(BLOB_CLASS_NAME) as HTMLElement | null
    if (blob) blob.style.opacity = '0'
  }

  const setupEvents = () => {
    updateCards()
    if (!allCards.value) return

    window.addEventListener('mousemove', handleMouseMove)

    allCards.value.forEach((card) => {
      card.addEventListener('mouseleave', () => handleMouseLeave(card))
    })
  }

  const removeEvents = () => {
    window.removeEventListener('mousemove', handleMouseMove)
  }

  onMounted(async () => {
    await updateCards(true)
    setupEvents()
  })

  onUnmounted(() => {
    removeEvents()
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }
  })

  if (itemsSource) {
    watch(itemsSource, async () => {
      removeEvents()
      await updateCards()
      setupEvents()
    })
  }

  return {}
}
