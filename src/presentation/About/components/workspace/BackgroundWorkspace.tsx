'use client'

import { easeInOut, motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

const BackgroundWorkspace = () => {
  const $element = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: $element,
    offset: ['start end', 'end start']
  })

  const maskSize = useTransform(scrollYProgress, [0.3, 0.6], ['2000%', '50%'], { ease: easeInOut })
  const backgroundScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.5], { ease: easeInOut })
  const opacityMask = useTransform(scrollYProgress, [0.5, 0.6], [0, 1], { ease: easeInOut })

  const maskStyle = {
    maskImage: "url('/assets/mask.webp')",
    WebkitMaskImage: "url('/assets/mask.webp')",
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
    maskSize,
    WebkitMaskSize: maskSize,
    scale: backgroundScale
  }

  return (
    <section
      ref={$element}
      className='region max-region:min-w-fit max-region:max-w-[500px] relative h-fit min-w-[1100px] max-md:max-w-[80%]'
    >
      <motion.div
        className='aspect-[16/10] h-fit w-full bg-cover bg-center'
        style={{ ...maskStyle, backgroundImage: "url('/assets/workspace.webp')" }}
      />
      <motion.div
        className='gradient absolute inset-0 z-[1] aspect-[16/10] h-fit w-full bg-cover bg-center'
        style={{ ...maskStyle, opacity: opacityMask }}
      />
    </section>
  )
}

export default BackgroundWorkspace
