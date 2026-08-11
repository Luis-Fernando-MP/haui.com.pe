'use client'

import Mdx from '@common/components/mdx'
import { motion } from 'motion/react'
import type { FC } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const ProjectMdx: FC<{ code: string }> = ({ code }) => (
  <motion.section
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: 0.5, ease }}
    className='region w-full min-w-0'
  >
    <Mdx code={code} className='mx-auto w-full max-w-2xl min-w-0 overflow-x-auto' />
  </motion.section>
)

export default ProjectMdx
