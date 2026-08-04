'use client'

import { motion } from 'motion/react'
import type { FC } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const toHtml = (raw: string) =>
  raw
    .replace(/\bclassName=/g, 'class=')
    .replace(/\bhtmlFor=/g, 'for=')

const ProjectMdx: FC<{ raw: string }> = ({ raw }) => {
  if (raw.trim().length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, ease }}
      className='region w-full'
    >
      <article
        className='project-mdx mx-auto max-w-2xl'
        dangerouslySetInnerHTML={{ __html: toHtml(raw) }}
      />
    </motion.section>
  )
}

export default ProjectMdx
