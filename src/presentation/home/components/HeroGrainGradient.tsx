'use client'

import dynamic from 'next/dynamic'
import { type FC, useEffect, useRef, useState } from 'react'
import { useIntersectionObserver, useMediaQuery } from 'usehooks-ts'

import useUseAppStore from '../store/useApp'

const GodRaysLazy = dynamic(() => import('@paper-design/shaders-react').then(mod => mod.GodRays), { ssr: false })

const MAX_PIXEL_COUNT = 1440 * 810
const WEBGL_CONTEXT = {
  antialias: false,
  depth: false,
  stencil: false,
  powerPreference: 'low-power' as const
}

const readGradientColors = () => {
  const root = getComputedStyle(document.documentElement)
  return [
    root.getPropertyValue('--gr-to').trim(),
    root.getPropertyValue('--gr-via').trim(),
    root.getPropertyValue('--gr-from').trim()
  ]
}

const HeroGrainGradient: FC = () => {
  const enabledGradient = useUseAppStore(s => s.enabledGradient)
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [colors, setColors] = useState<string[]>([])
  const [canMountShader, setCanMountShader] = useState(false)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const pendingSwap = useRef(false)
  const lastKey = useRef('')

  const { isIntersecting, ref } = useIntersectionObserver({
    rootMargin: '160px 0px',
    threshold: 0.05
  })

  useEffect(() => {
    const settle = () => {
      const root = document.documentElement

      if (root.classList.contains('theme-transition')) {
        pendingSwap.current = true
        setPaused(true)
        return
      }

      if (!pendingSwap.current && lastKey.current.length > 0) return

      const next = readGradientColors()
      if (next.some(c => c.length === 0)) return

      const key = next.join('|')
      if (key === lastKey.current && !pendingSwap.current) return

      lastKey.current = key
      pendingSwap.current = false
      setPaused(true)
      setColors(next)
    }

    settle()
    const raf = requestAnimationFrame(settle)

    const observer = new MutationObserver(() => {
      requestAnimationFrame(settle)
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (colors.length === 0) return

    let cancelled = false
    const play = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return
        setPaused(false)
        setVisible(true)
      })
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(play)
    }
  }, [colors])

  useEffect(() => {
    if (!enabledGradient || reduceMotion) {
      setCanMountShader(false)
      return
    }

    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    const allow = () => setCanMountShader(true)

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(allow, { timeout: 800 })
    }
    if (idleId === undefined) timeoutId = setTimeout(allow, 200)

    return () => {
      if (idleId !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [enabledGradient, reduceMotion])

  if (!enabledGradient || reduceMotion || colors.length === 0) return null

  const playing = canMountShader && isIntersecting && !paused

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute top-0 left-0 -z-10 block h-[130vh] w-full overflow-hidden transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none ${
          canMountShader ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: `
            radial-gradient(95% 75% at 50% -12%, color-mix(in srgb, var(--gr-from) 42%, transparent), transparent 58%),
            radial-gradient(65% 55% at 22% 12%, color-mix(in srgb, var(--gr-via) 26%, transparent), transparent 52%),
            radial-gradient(65% 55% at 78% 16%, color-mix(in srgb, var(--gr-to) 26%, transparent), transparent 52%)
          `
        }}
      />

      {canMountShader && (
        <div
          className={`h-full w-full transition-opacity duration-700 ease-out motion-reduce:transition-none ${
            isIntersecting ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <GodRaysLazy
            className='h-full w-full'
            colors={colors}
            colorBack='#00000000'
            colorBloom='#00000000'
            // bloom={1}
            // intensity={0.5}
            // density={0.02}
            // spotty={1}
            // midSize={0.1}
            // midIntensity={1}
            // speed={playing ? 1 : 0}
            // offsetY={-0.42}
            // minPixelRatio={1}

            bloom={1}
            intensity={0.05}
            density={3}
            spotty={1}
            midSize={0.2}
            midIntensity={0.95}
            speed={playing ? 1.3 : 0}
            offsetY={-0.56}
            scale={1.05}
            minPixelRatio={20}
            maxPixelCount={MAX_PIXEL_COUNT}
            webGlContextAttributes={WEBGL_CONTEXT}
          />
        </div>
      )}

      <div className='from-bg1 via-bg1/50 pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-25% to-transparent select-none' />
    </div>
  )
}

export default HeroGrainGradient
