'use client'

import { GodRays } from '@paper-design/shaders-react'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'
import type { FC } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

import useUseAppStore from '../store/useApp'

const HeroGrainGradient: FC = () => {
  const { theme } = useTheme()
  const { enabledGradient } = useUseAppStore()
  const [colors, setColors] = useState<string[]>([])

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.1
  })

  console.log(`Render Section ${isIntersecting}`)

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
  }, [theme, isIntersecting])

  const godRayColors = useMemo(() => colors, [colors])
  if (colors.length === 0 || !enabledGradient) return null

  return (
    <div className='absolute top-0 left-0 -z-10 block h-[120vh] w-full' ref={ref}>
      {isIntersecting && (
        <GodRays
          className='h-full w-full'
          colors={godRayColors}
          colorBack={'#00000000'}
          colorBloom={'#00000000'}
          bloom={1}
          intensity={0.5}
          density={0.02}
          spotty={1}
          midSize={0.1}
          midIntensity={1}
          speed={1}
          offsetY={-0.45}
        />
      )}

      {/* Gradient overlay */}
      <div className='from-bg1 pointer-events-none absolute bottom-0 z-50 h-3/12 w-full bg-gradient-to-t from-30% to-transparent to-100% pt-5 pb-10 select-none' />
    </div>
  )
}

export default HeroGrainGradient
