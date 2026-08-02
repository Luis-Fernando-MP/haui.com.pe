'use client'

import { GodRays } from '@paper-design/shaders-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { useIntersectionObserver, useMediaQuery } from 'usehooks-ts'

import useUseAppStore from '../store/useApp'

/**
 * HeroGrainGradient
 * descripcion: fondo WebGL GodRays solo en home; pausa fuera de viewport y respeta reduced-motion
 * propiedades: ninguna
 * ejemplos: <HeroGrainGradient />
 */
const HeroGrainGradient: FC = () => {
  const { theme } = useTheme()
  const enabledGradient = useUseAppStore(s => s.enabledGradient)
  const [colors, setColors] = useState<string[]>([])
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.1
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
  }, [theme])

  if (colors.length === 0 || !enabledGradient || reduceMotion || isMobile) return null

  return (
    <div className='absolute top-0 left-0 -z-10 block h-[120vh] w-full' ref={ref}>
      <div className={isIntersecting ? 'h-full w-full' : 'pointer-events-none invisible h-full w-full'}>
        <GodRays
          className='h-full w-full'
          colors={colors}
          colorBack={'#00000000'}
          colorBloom={'#00000000'}
          bloom={1}
          intensity={0.5}
          density={0.02}
          spotty={1}
          midSize={0.1}
          midIntensity={1}
          speed={isIntersecting ? 1 : 0}
          offsetY={-0.45}
        />
      </div>
      <div className='from-bg1 pointer-events-none absolute bottom-0 z-50 h-3/12 w-full bg-gradient-to-t from-30% to-transparent to-100% pt-5 pb-10 select-none' />
    </div>
  )
}

export default HeroGrainGradient
