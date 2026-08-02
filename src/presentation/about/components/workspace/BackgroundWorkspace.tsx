'use client'

import { easeOut, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

const BackgroundWorkspace = () => {
  const $element = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: $element,
    offset: ['start end', 'start 0.1']
  })

  const maskSize = useTransform(scrollYProgress, [0, 1], ['2000%', '42%'], { ease: easeOut })
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.01, 1.1], { ease: easeOut })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '3.5%'], { ease: easeOut })
  const opacityMask = useTransform(scrollYProgress, [0.1, 0.85], [0, 1], { ease: easeOut })
  const frameOpacity = useTransform(scrollYProgress, [0, 0.35], [0.45, 1], { ease: easeOut })
  const labelY = useTransform(scrollYProgress, [0.45, 0.85], [16, 0], { ease: easeOut })
  const labelOpacity = useTransform(scrollYProgress, [0.45, 0.85], [0, 1], { ease: easeOut })

  const maskStyle = reducedMotion
    ? {
        maskImage: "url('/assets/mask.webp')",
        WebkitMaskImage: "url('/assets/mask.webp')",
        maskRepeat: 'no-repeat' as const,
        WebkitMaskRepeat: 'no-repeat' as const,
        maskPosition: 'center' as const,
        WebkitMaskPosition: 'center' as const,
        maskSize: '42%',
        WebkitMaskSize: '42%'
      }
    : {
        maskImage: "url('/assets/mask.webp')",
        WebkitMaskImage: "url('/assets/mask.webp')",
        maskRepeat: 'no-repeat' as const,
        WebkitMaskRepeat: 'no-repeat' as const,
        maskPosition: 'center' as const,
        WebkitMaskPosition: 'center' as const,
        maskSize,
        WebkitMaskSize: maskSize,
        scale: backgroundScale,
        y: imageY
      }

  return (
    <motion.div
      ref={$element}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className='relative w-full'
    >
      <div className='gradient rounded-[1.65rem] p-px sm:rounded-[1.85rem]'>
        <div className='bg-bg1 relative overflow-hidden rounded-[calc(1.65rem-1px)] sm:rounded-[calc(1.85rem-1px)]'>
          <motion.div
            className='relative aspect-[16/10] w-full overflow-hidden'
            style={reducedMotion ? undefined : { opacity: frameOpacity }}
          >
            <div
              aria-hidden
              className='pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_42%,color-mix(in_srgb,var(--bg1)_55%,transparent)_100%)]'
            />

            <motion.div
              className='absolute inset-0 bg-cover bg-center will-change-transform'
              style={{ ...maskStyle, backgroundImage: "url('/assets/workspace.webp')" }}
            />

            <motion.div
              className='gradient absolute inset-0 z-[1] bg-cover bg-center mix-blend-soft-light will-change-transform'
              style={{
                ...maskStyle,
                opacity: reducedMotion ? 0.85 : opacityMask
              }}
            />

            <div
              aria-hidden
              className='from-bg1/80 via-bg1/10 pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-1/3 bg-gradient-to-t to-transparent'
            />
            <div
              aria-hidden
              className='from-bg1/50 pointer-events-none absolute inset-y-0 left-0 z-[3] w-1/5 bg-gradient-to-r to-transparent'
            />
            <div
              aria-hidden
              className='from-bg1/50 pointer-events-none absolute inset-y-0 right-0 z-[3] w-1/5 bg-gradient-to-l to-transparent'
            />
          </motion.div>

          <motion.div
            className='pointer-events-none absolute top-4 left-4 z-10 flex items-center gap-2 sm:top-5 sm:left-5'
            style={
              reducedMotion
                ? undefined
                : {
                    y: labelY,
                    opacity: labelOpacity
                  }
            }
          >
            <span className='bg-bg1/90 border-bg3 text-fn2 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase backdrop-blur-sm'>
              <span className='bg-semantic-success size-1.5 rounded-full' aria-hidden />
              Live desk
            </span>
          </motion.div>

          <motion.div
            className='pointer-events-none absolute right-4 bottom-4 z-10 sm:right-5 sm:bottom-5'
            style={
              reducedMotion
                ? undefined
                : {
                    y: labelY,
                    opacity: labelOpacity
                  }
            }
          >
            <span className='bg-bg1/90 border-bg3 text-fn1 inline-flex rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase backdrop-blur-sm'>
              Setup 01
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default BackgroundWorkspace
