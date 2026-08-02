'use client'

import ImageGallery from '@common/components/focus-gallery/ImageGallery'
import type { Journey } from '@common/core/constants/personalJourneys'
import { motion } from 'motion/react'
import type { FC } from 'react'

interface Props {
  journey: Journey
}

const ease = [0.22, 1, 0.36, 1] as const

const JourneyComponent: FC<Props> = ({ journey }) => {
  const { title, description, images, date } = journey

  return (
    <motion.article
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.32, ease }}
      className='flex flex-col gap-5'
    >
      <header className='flex flex-col gap-1'>
        <h2 className='text-fn1 text-xl font-bold tracking-tight md:text-2xl'>{title}</h2>
        <time className='text-fn2 font-mono text-xs' dateTime={date}>
          {date}
        </time>
      </header>

      <div className='text-fn2 [&_strong]:text-fn1 max-w-[560px] space-y-3 text-sm leading-relaxed text-pretty md:text-[15px] [&_strong]:font-semibold'>
        {description}
      </div>

      {images.length > 0 && (
        <ul className='flex flex-wrap gap-2'>
          {images.map((image, i) => (
            <li key={`${image.src}-${image.caption ?? i}`} className='list-none'>
              <ImageGallery
                className='border-bg3/50 size-16 rounded-xl border object-cover transition-[transform,opacity] duration-300 hover:scale-[1.03] hover:opacity-90'
                width={64}
                height={64}
                alt={image.caption ?? `${title} — imagen ${i + 1}`}
                groupId={`journey-${title}`}
                index={i}
                {...image}
              />
            </li>
          ))}
        </ul>
      )}
    </motion.article>
  )
}

export default JourneyComponent
