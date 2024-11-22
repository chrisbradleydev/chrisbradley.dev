import {SpeedInsights} from '@vercel/speed-insights/next'
import clsx from 'clsx'
import Head from 'next/head'
import * as React from 'react'
import * as THREE from 'three'
import {projectName} from '~/content/metadata'
import {Theme, useTheme} from '~/contexts/theme-provider'
import Container from './container'
import Footer from './footer'
import Header from './header'
import Nav from './nav'

const PARTICLE_COUNT = 200
const PARTICLE_RADIUS = 2
const FOCAL_LENGTH = 600
const DEFAULT_SPEED = 2
const BOOST_SPEED = 500
const FRAME_RATE = 90
const FRAME_INTERVAL = 1000 / FRAME_RATE

interface Particle {
  x: number
  y: number
  z: number
  prevZ: number
  mesh: THREE.Points
}

const getTitle = (pageName: string) => {
  if (pageName === 'Home') {
    return projectName
  }
  return `${pageName && pageName + ' | '}${projectName}`
}

const newParticle = (
  scene: THREE.Scene,
  material: THREE.PointsMaterial,
): Particle => {
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute([0, 0, 0], 3),
  )
  const mesh = new THREE.Points(geometry, material)
  scene.add(mesh)

  return {
    x: 0,
    y: 0,
    z: 0,
    prevZ: 0,
    mesh,
  }
}

const randomizeParticle = (
  p: Particle,
  width: number,
  height: number,
): Particle => {
  p.x = Math.random() * width
  p.y = Math.random() * height
  p.z = Math.random() * 1500 + 500
  return p
}

const Layout = ({
  children,
  header = true,
  pageName,
}: {
  children: React.ReactNode
  header?: boolean
  pageName: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const rendererRef = React.useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = React.useRef<THREE.Scene | null>(null)
  const cameraRef = React.useRef<THREE.PerspectiveCamera | null>(null)
  const frameIdRef = React.useRef<number>()
  const particlesRef = React.useRef<Particle[]>([])

  const speedRef = React.useRef(DEFAULT_SPEED)
  const targetSpeedRef = React.useRef(DEFAULT_SPEED)
  const mouseXRef = React.useRef(0)
  const mouseYRef = React.useRef(0)

  const [theme] = useTheme()

  React.useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const width = window.innerWidth
    const height = window.innerHeight
    const centerX = width * 0.5
    const centerY = height * 0.5

    // Center mouse position
    mouseXRef.current = centerX
    mouseYRef.current = centerY

    // Create scene and camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000)
    camera.position.z = FOCAL_LENGTH

    // Create renderer
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer

    // Create particle material
    const material = new THREE.PointsMaterial({
      size: PARTICLE_RADIUS,
      sizeAttenuation: true,
      color: theme === Theme.DARK ? 0xffffff : 0x000000,
      transparent: true,
      opacity: 0.9,
    })

    // Initialize particles
    particlesRef.current = Array.from({length: PARTICLE_COUNT}, () => {
      const p = newParticle(scene, material)
      return randomizeParticle(p, width, height)
    })

    // Animation loop
    const animate = () => {
      if (!scene || !camera || !renderer) {
        return
      }

      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.01

      particlesRef.current.forEach(p => {
        p.prevZ = p.z
        p.z -= speedRef.current

        if (p.z <= 0) {
          randomizeParticle(p, width, height)
          return
        }

        // Calculate mouse offset
        const cx = centerX - (mouseXRef.current - centerX) * 1.25
        const cy = centerY - (mouseYRef.current - centerY) * 1.25
        const rx = p.x - cx
        const ry = p.y - cy

        // Calculate perspective
        const f = FOCAL_LENGTH / p.z
        const x = cx + rx * f
        const y = cy + ry * f

        // Update particle position
        const positions = new Float32Array([x - width / 2, -y + height / 2, 0])
        p.mesh.geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(positions, 3),
        )
        ;(
          p.mesh.geometry.attributes.position as THREE.BufferAttribute
        ).needsUpdate = true
      })

      // Render scene
      renderer.render(scene, camera)
      setTimeout(() => {
        frameIdRef.current = requestAnimationFrame(animate)
      }, FRAME_INTERVAL)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX
      mouseYRef.current = e.clientY
    }

    const handleMouseDown = () => {
      targetSpeedRef.current = BOOST_SPEED
    }

    const handleMouseUp = () => {
      targetSpeedRef.current = DEFAULT_SPEED
    }

    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight

      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.setSize(newWidth, newHeight)
        cameraRef.current.aspect = newWidth / newHeight
        cameraRef.current.updateProjectionMatrix()
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    animate()

    const container = containerRef.current

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current)
      }

      // Cleanup particles
      particlesRef.current.forEach(p => {
        p.mesh.geometry.dispose()
        scene.remove(p.mesh)
      })

      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)

      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      if (container?.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [theme])

  return (
    <>
      <Head>
        <title>{getTitle(pageName)}</title>
      </Head>
      <div className={clsx(theme ? theme : undefined, 'relative')}>
        <div className="flex min-h-screen flex-col bg-white transition duration-500 dark:bg-neutral-900 dark:text-white">
          <Nav />
          {header ? <Header heading={pageName} /> : null}
          <main>
            <Container>{children}</Container>
          </main>
          <Footer />
        </div>
        <div
          ref={containerRef}
          className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden"
        />
        <SpeedInsights />
      </div>
    </>
  )
}

export default Layout
