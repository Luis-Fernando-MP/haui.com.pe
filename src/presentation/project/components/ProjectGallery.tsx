'use client'

import ImageGallery from '@common/components/focus-gallery/ImageGallery'
import { cn } from '@common/core/cn'
import { motion } from 'motion/react'
import type { FC } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const ProjectGallery: FC<{
  id: string
  title: string
  images: { src: string; caption?: string }[]
}> = ({ id, title, images }) => {
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
      className='region w-full min-w-0'
    >
      <ul
        className={cn(
          'mx-auto grid w-full min-w-0 gap-2.5 sm:gap-3 md:gap-4',
          shots.length === 1 && 'max-w-2xl grid-cols-1',
          shots.length === 2 && 'max-w-3xl grid-cols-1 sm:grid-cols-2',
          shots.length >= 3 && 'grid-cols-1 sm:grid-cols-2 md:max-w-4xl md:grid-cols-3'
        )}
      >
        {shots.map((img, i) => (
          <li key={img.src} className='list-none'>
            <ImageGallery
              src={img.src}
              alt={img.caption?.trim() || `${title} — captura ${i + 1}`}
              width={640}
              height={400}
              layout='constrained'
              unstyled
              objectFit='cover'
              sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
              groupId={groupId}
              index={i}
              caption={`<p>${img.caption?.trim() || title}</p>`}
              className={cn(
                'border-bg3/40 bg-bg2 aspect-[16/10] w-full rounded-xl border object-cover',
                'opacity-95 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                'hover:scale-[1.015] hover:opacity-100 motion-reduce:transition-none motion-reduce:hover:scale-100'
              )}
            />
          </li>
        ))}
      </ul>
    </motion.section>
  )
}

export default ProjectGallery
