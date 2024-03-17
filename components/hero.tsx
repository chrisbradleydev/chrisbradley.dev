import * as React from 'react'

const mouseMove = ({screenX, screenY}: MouseEvent) =>
  console.log('x:', screenX, 'y:', screenY)
const mouseDown = (e: MouseEvent) => console.log('mouse down')
const mouseUp = (e: MouseEvent) => console.log('mouse up')
const doubleClick = (e: MouseEvent) => console.log('double click')

const Hero = () => {
  const highlightedWord = 'brain'
  const headerText = `From my ${highlightedWord} to yours.`
  const secondText = `Started from GeoCities, now we're here.`
  const customFont = '/Fredoka.woff2'

  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = React.useState<{
    width: number
    height: number
  }>({width: 0, height: 0})

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const fontFace = new FontFace('Fredoka', `url(${customFont})`)
    fontFace.load().then(loadedFont => {
      document.fonts.add(loadedFont)
      updateCanvasSize()
    })

    const handleResize = () => {
      updateCanvasSize()
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', mouseMove, false)
    canvas.addEventListener('mousedown', mouseDown, false)
    canvas.addEventListener('mouseup', mouseUp, false)
    canvas.addEventListener('dblclick', doubleClick, false)

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', mouseMove, false)
      canvas.removeEventListener('mousedown', mouseDown, false)
      canvas.removeEventListener('mouseup', mouseUp, false)
      canvas.removeEventListener('dblclick', doubleClick, false)
    }
  }, [])

  const updateCanvasSize = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.parentElement?.getBoundingClientRect()
    if (!rect) return

    console.log('x:', rect.width, 'y:', rect.height)
    console.log(`canvas width: ${rect.width}
canvas height: ${rect.height}`)

    setCanvasSize({width: rect.width, height: rect.height})
  }

  const drawText = React.useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const {width: w, height: h} = canvasSize
      ctx.clearRect(0, 0, w, h)

      // calculate font size based on canvas size
      const headerFontSize = Math.min(w / 320, h / 80)
      const secondFontSize = Math.min(w / 640, h / 160)
      const fontUnit = 'rem'
      console.log(`headerFontSize: ${headerFontSize}
secondFontSize: ${secondFontSize}
fontUnit: ${fontUnit}`)

      // set font properties
      ctx.font = `bold ${headerFontSize}${fontUnit} Fredoka`
      ctx.fillStyle = '#f472b6'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const centerX = w / 2
      const centerY = h / 2
      const offsetY = 80
      console.log(`centerX: ${centerX}
centerY: ${centerY}
offsetY: ${offsetY}`)

      // draw text
      ctx.fillText(headerText.toUpperCase(), centerX, centerY - offsetY)

      ctx.font = `bold ${secondFontSize}${fontUnit} Fredoka`
      ctx.fillStyle = '#a3a3a3'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(secondText, centerX, centerY)
    },
    [canvasSize, headerText, secondText],
  )

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    drawText(ctx)
  }, [canvasSize, headerText, drawText])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="h-full w-full"
      />
    </div>
  )
}

export default Hero
