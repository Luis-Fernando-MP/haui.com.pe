'use client'

import ImageGallery from '@common/components/focus-gallery/ImageGallery'
import { cn } from '@common/core/cn'
import { motion } from 'motion/react'
import type { FC } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const ProjectGallery: FC<{ id: string; title: string; images: string[] }> = ({ id, title, images }) => {
  const groupId = `project-detail-${id}`
  const shots = images.slice(0, 6)

  if (shots.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease }}
      aria-label={`Galería de ${title}`}
      className='region w-full'
    >
      <ul
        className={cn(
          'mx-auto grid w-full gap-3 md:gap-4',
          shots.length === 1 && 'max-w-2xl grid-cols-1',
          shots.length === 2 && 'max-w-3xl grid-cols-2',
          shots.length >= 3 && 'grid-cols-2 md:max-w-4xl md:grid-cols-3'
        )}
      >
        {shots.map((src, i) => (
          <li key={src} className='list-none'>
            <ImageGallery
              src={src}
              alt={`${title} — captura ${i + 1}`}
              width={640}
              height={400}
              groupId={groupId}
              index={i}
              caption={`<p>${title}</p>`}
              className={cn(
                'border-bg3/40 bg-bg2 aspect-[16/10] w-full rounded-xl border object-cover',
                'opacity-95 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                'hover:opacity-100 hover:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:scale-100'
              )}
            />
          </li>
        ))}
      </ul>
    </motion.section>
  )
}

export default ProjectGallery
