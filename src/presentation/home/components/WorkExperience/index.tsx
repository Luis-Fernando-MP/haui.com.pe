'use client'

import Title from '@common/components/title'
import { HISTORY_JOBS } from '@common/core/constants/historyJobs'
import { motion } from 'motion/react'
import type { FC } from 'react'

import JobExperience from './JobExperience'

const WorkExperience: FC = () => {
  return (
    <article id='experience' className='max-region:px-5 flex w-full flex-col items-center gap-12'>
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='region max-region:text-center max-region:items-center flex flex-col gap-3'
      >
        <p className='text-fn2 font-mono text-sm'>2019 ― 2026</p>
        <Title>
          Mi Experiencia
          <br />
          <span className='text-gradient'>Laboral</span>
        </Title>
        <p className='text-fn2 max-w-[650px] font-mono'>
          <strong className='text-fn1'>He participado en el desarrollo de software para diversas empresas</strong>, colaborando
          tanto en equipos reducidos como en grupos de gran escala. Priorizo sistemas robustos, seguros y confiables.
        </p>
      </motion.header>

      <ul className='flex w-full flex-col'>
        {HISTORY_JOBS.map((job, i) => (
          <motion.li
            key={job.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.08, 0.32), ease: 'easeOut' }}
          >
            <JobExperience job={job} />
          </motion.li>
        ))}
      </ul>
    </article>
  )
}

export default WorkExperience
