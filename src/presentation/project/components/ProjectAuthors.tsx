'use client'

import type { ProjectAuthor } from '../project.types'
import { motion } from 'motion/react'
import type { FC } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const ProjectAuthors: FC<{ authors: ProjectAuthor[] }> = ({ authors }) => {
  if (authors.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease }}
      className='region w-full'
      aria-label='Autores'
    >
      <ul className='mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3'>
        {authors.map(author => (
          <li key={`${author.name}-${author.role ?? ''}`} className='text-fn2 list-none text-center text-sm'>
            {author.social?.trim() ? (
              <a
                href={author.social}
                target='_blank'
                rel='noopener noreferrer'
                className='text-fn1 font-medium underline-offset-4 hover:underline'
              >
                {author.name}
              </a>
            ) : (
              <span className='text-fn1 font-medium'>{author.name}</span>
            )}
            {author.role?.trim() && <span className='mt-0.5 block text-xs opacity-80'>{author.role}</span>}
          </li>
        ))}
      </ul>
    </motion.section>
  )
}

export default ProjectAuthors
