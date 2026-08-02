'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useEffect, useState, type FC } from 'react'
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

const HeroGrainGradient: FC = () => {
  const { theme, resolvedTheme } = useTheme()
  const enabledGradient = useUseAppStore(s => s.enabledGradient)
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [colors, setColors] = useState<string[]>([])
  const [canMountShader, setCanMountShader] = useState(false)

  const { isIntersecting, ref } = useIntersectionObserver({
    rootMargin: '160px 0px',
    threshold: 0.05
  })

  useEffect(() => {
    const updateColors = () => {
      const root = getComputedStyle(document.documentElement)
      setColors([
        root.getPropertyValue('--gr-to').trim(),
        root.getPropertyValue('--gr-via').trim(),
        root.getPropertyValue('--gr-from').trim()
      ])
    }

    const raf = requestAnimationFrame(updateColors)
    return () => cancelAnimationFrame(raf)
  }, [theme, resolvedTheme])

  useEffect(() => {
    if (!enabledGradient || reduceMotion || isMobile) {
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
  }, [enabledGradient, reduceMotion, isMobile])

  if (!enabledGradient || reduceMotion || isMobile || colors.length === 0) return null

  return (
    <div
      ref={ref}
      aria-hidden
      className='pointer-events-none absolute top-0 left-0 -z-10 block h-[130vh] w-full overflow-hidden'
    >
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${canMountShader ? 'opacity-0' : 'opacity-100'}`}
        style={{
          background: `radial-gradient(95% 75% at 50% -5%, ${colors[2]}70, transparent 58%),
            radial-gradient(65% 55% at 22% 18%, ${colors[1]}45, transparent 52%),
            radial-gradient(65% 55% at 78% 22%, ${colors[0]}45, transparent 52%)`
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
            bloom={1}
            intensity={0.5}
            density={0.02}
            spotty={1}
            midSize={0.1}
            midIntensity={1}
            speed={isIntersecting ? 1 : 0}
            offsetY={-0.42}
            minPixelRatio={1}
            maxPixelCount={MAX_PIXEL_COUNT}
            webGlContextAttributes={WEBGL_CONTEXT}
          />
        </div>
      )}

      <div className='from-bg1 pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-25% via-bg1/50 to-transparent select-none' />
    </div>
  )
}

export default HeroGrainGradient
