/**
 * All credit for the fancy particle effects goes to Akimitsu Hamamuro.
 * Check out their work on CodePen here: https://codepen.io/akm2.
 */
import * as React from 'react'
import {useTheme} from '../contexts/theme-provider'

const PARTICLE_COUNT = 200
const PARTICLE_RADIUS = 0.5
const FL = 500
const DEFAULT_SPEED = 2
const BOOST_SPEED = 300
const FRAME_RATE = 1000 / 60 // 60fps

type Particle = {
  x: number
  y: number
  z: number
  prevZ: number
}

let canvas: HTMLCanvasElement | null
let bufferCvs: HTMLCanvasElement | null
let screenWidth: number
let screenHeight: number
let centerX: number
let centerY: number

const getCanvasRefs = (
  ref1: React.RefObject<HTMLCanvasElement>,
  ref2: React.RefObject<HTMLCanvasElement>,
): HTMLCanvasElement[] => {
  canvas = ref1.current
  if (!canvas) {
    console.error('no canvas')
    return []
  }
  bufferCvs = ref2.current
  if (!bufferCvs) {
    console.error('no buffer canvas')
    return []
  }
  return [canvas, bufferCvs]
}

const getCanvasCtxs = (
  can1: HTMLCanvasElement,
  can2: HTMLCanvasElement,
): CanvasRenderingContext2D[] => {
  const ctx = can1.getContext('2d')
  if (!ctx) {
    console.log('no canvas context')
    return []
  }
  const bufferCtx = can2.getContext('2d')
  if (!bufferCtx) {
    console.log('no buffer canvas context')
    return []
  }
  return [ctx, bufferCtx]
}

const newParticle = (): Particle => ({
  x: 0,
  y: 0,
  z: 0,
  prevZ: 0,
})

const randomizeParticle = (
  p: Particle,
  cRef: React.RefObject<HTMLCanvasElement>,
  bRef: React.RefObject<HTMLCanvasElement>,
): Particle => {
  const [canvas] = getCanvasRefs(cRef, bRef)
  p.x = Math.random() * canvas.width
  p.y = Math.random() * canvas.height
  p.z = Math.random() * 1500 + 500
  return p
}

const Hero = () => {
  if (typeof window !== 'undefined') {
    screenWidth = window.innerWidth
    screenHeight = window.innerHeight
  }

  const [theme] = useTheme()
  const canvasRef = React.useRef<HTMLCanvasElement>(canvas)
  const bufferCvsRef = React.useRef<HTMLCanvasElement>(bufferCvs)
  const [particles, setParticles] = React.useState<Particle[]>([])
  const [speed, setSpeed] = React.useState(DEFAULT_SPEED)
  const [targetSpeed, setTargetSpeed] = React.useState(DEFAULT_SPEED)
  const [mouseX, setMouseX] = React.useState(0)
  const [mouseY, setMouseY] = React.useState(0)

  const animate = (
    particles: Particle[],
    mouseX: number,
    mouseY: number,
    speed: number,
    setSpeed: React.Dispatch<React.SetStateAction<number>>,
    targetSpeed: number,
  ) => {
    const [canvas, bufferCvs] = getCanvasRefs(canvasRef, bufferCvsRef)
    const [ctx, bufferCtx] = getCanvasCtxs(canvas, bufferCvs)

    ctx.save()
    ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.restore()

    bufferCtx.save()
    bufferCtx.globalCompositeOperation = 'destination-out'
    bufferCtx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    bufferCtx.restore()

    setSpeed(speed + (targetSpeed - speed) * 0.01)

    let p: Particle,
      cx: number,
      cy: number,
      rx: number,
      ry: number,
      f: number,
      x: number,
      y: number,
      r: number,
      pf: number,
      px: number,
      py: number,
      pr: number,
      a: number,
      a1: number,
      a2: number

    let halfPi = Math.PI * 0.5
    let atan2 = Math.atan2
    let cos = Math.cos
    let sin = Math.sin

    bufferCtx.beginPath()
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      p = particles[i]

      p.prevZ = p.z
      p.z -= speed

      if (p.z <= 0) {
        randomizeParticle(p, canvasRef, bufferCvsRef)
        continue
      }

      cx = centerX - (mouseX - centerX) * 1.25
      cy = centerY - (mouseY - centerY) * 1.25
      rx = p.x - cx
      ry = p.y - cy

      f = FL / p.z
      x = cx + rx * f
      y = cy + ry * f
      r = PARTICLE_RADIUS * f

      pf = FL / p.prevZ
      px = cx + rx * pf
      py = cy + ry * pf
      pr = PARTICLE_RADIUS * pf

      a = atan2(py - y, px - x)
      a1 = a + halfPi
      a2 = a - halfPi

      bufferCtx.moveTo(px + pr * cos(a1), py + pr * sin(a1))
      bufferCtx.arc(px, py, pr, a1, a2, true)
      bufferCtx.lineTo(x + r * cos(a2), y + r * sin(a2))
      bufferCtx.arc(x, y, r, a2, a1, true)
      bufferCtx.closePath()
    }

    bufferCtx.fill()
    bufferCtx.restore()

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(bufferCvs, 0, 0)
  }

  React.useEffect(() => {
    const handleResize = () => {
      const [canvas, bufferCvs] = getCanvasRefs(canvasRef, bufferCvsRef)
      const [ctx, bufferCtx] = getCanvasCtxs(canvas, bufferCvs)

      canvas.width = screenWidth
      canvas.height = screenHeight
      centerX = canvas.width * 0.5
      centerY = canvas.height * 0.5
      bufferCvs.width = screenWidth
      bufferCvs.height = screenHeight
      centerX = bufferCvs.width * 0.5
      centerY = bufferCvs.height * 0.5

      bufferCtx.fillStyle =
        theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'

      ctx.drawImage(bufferCvs, 0, 0)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    const initParticles = Array.from({length: PARTICLE_COUNT}, () =>
      randomizeParticle(newParticle(), canvasRef, bufferCvsRef),
    )
    setParticles(initParticles)

    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX)
      setMouseY(e.clientY)
    }
    const handleMouseDown = () => {
      setTargetSpeed(BOOST_SPEED)
    }
    const handleMouseUp = () => {
      setTargetSpeed(DEFAULT_SPEED)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  React.useEffect(() => {
    const intervalId = setInterval(
      () => animate(particles, mouseX, mouseY, speed, setSpeed, targetSpeed),
      FRAME_RATE,
    )
    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particles, mouseX, mouseY, speed, targetSpeed])

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="absolute left-0 top-0 h-full w-full">
        <div className="flex flex-col items-center py-10 text-center">
          <h1 className="text-4xl font-bold uppercase dark:text-white md:text-5xl lg:text-6xl">
            From my <span className="text-pink-400">brain</span> to yours.
          </h1>
          <p className="mt-4 text-2xl text-gray-600 md:text-3xl lg:text-4xl">
            Started from GeoCities, now we&apos;re here.
          </p>
        </div>
      </div>
      <canvas
        ref={bufferCvsRef}
        className="absolute left-0 top-0 h-full w-full"
      />
      <canvas ref={canvasRef} className="absolute left-0 top-0 h-full w-full" />
    </div>
  )
}

export default Hero
