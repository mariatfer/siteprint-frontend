export const useImageColor = () => {
  const averageColor = ref<string>('')
  const contrastColor = ref<'var(--c-black)' | 'var(--c-white)'>('var(--c-black)')

  const getAverageColorAroundTopLeft = (imgUrl: string, size = 50): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = imgUrl

      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height

        const canvasContext = canvas.getContext('2d')
        if (!canvasContext) return resolve('var(--c-black)')

        canvasContext.drawImage(img, 0, 0)

        const imageData = canvasContext.getImageData(0, 0, size, size).data
        let redTotal = 0,
          greenTotal = 0,
          blueTotal = 0
        const pixelCount = imageData.length / 4

        for (let i = 0; i < imageData.length; i += 4) {
          redTotal += imageData[i] ?? 0
          greenTotal += imageData[i + 1] ?? 0
          blueTotal += imageData[i + 2] ?? 0
        }

        redTotal = Math.floor(redTotal / pixelCount)
        greenTotal = Math.floor(greenTotal / pixelCount)
        blueTotal = Math.floor(blueTotal / pixelCount)

        resolve(`rgb(${redTotal}, ${greenTotal}, ${blueTotal})`)
      }

      img.onerror = () => {
        resolve('var(--c-black)')
      }
    })
  }

  const getContrastColor = (rgb: string): 'var(--c-black)' | 'var(--c-white)' => {
    const matches = rgb.match(/\d+/g)
    if (!matches || matches.length < 3) return 'var(--c-black)'

    const [redTotal, greenTotal, blueTotal] = matches.map(Number)

    if (redTotal === undefined || greenTotal === undefined || blueTotal === undefined)
      return 'var(--c-black)'

    const brightness = (redTotal * 299 + greenTotal * 587 + blueTotal * 114) / 1000
    return brightness > 128 ? 'var(--c-black)' : 'var(--c-white)'
  }

  const analyzeImageColor = async (imgUrl: string, size = 50) => {
    try {
      const color = await getAverageColorAroundTopLeft(imgUrl, size)
      averageColor.value = color
      contrastColor.value = getContrastColor(color)
    } catch {
      averageColor.value = '#000000'
      contrastColor.value = 'var(--c-white)'
    }
  }

  return {
    averageColor,
    contrastColor,
    analyzeImageColor,
  }
}
