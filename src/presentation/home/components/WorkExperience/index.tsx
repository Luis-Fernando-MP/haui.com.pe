'use client'

import { HISTORY_JOBS } from '@/shared/config/constants/historyJobs'
import Title from '@/shared/ui/components/Title'
import { motion } from 'framer-motion'
import type { FC } from 'react'

import JobExperience from './JobExperience'

const WorkExperience: FC = () => {
  return (
    <article id='experience' className='max-region:px-5 flex min-h-screen w-full cursor-pointer flex-col items-center gap-20'>
      <motion.header
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-400px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='region max-region:text-center max-region:items-center flex flex-col gap-3.5'
      >
        <h3 className='text-fn2 font-mono'>2019 ― 2025</h3>
        <Title>
          Mi Experiencia
          <br />
          <span className='text-gradient text-6xl leading-normal font-bold max-sm:text-4xl'>Laboral</span>
        </Title>
        <p className='text-fn2 max-w-[650px] font-mono'>
          <strong>He participado en el desarrollo de software para diversas empresas</strong>, colaborando tanto en equipos
          reducidos como en grupos de gran escala. Durante este proceso, he diseñado y mantenido sistemas robustos y seguros,
          priorizando siempre la eficiencia y la confiabilidad.
        </p>
      </motion.header>

      <ul className='flex w-full flex-col gap-0'>
        {HISTORY_JOBS.map((job, i) => (
          <motion.div
            key={job.name}
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, type: 'spring', delay: i * 0.15, stiffness: 50, damping: 10 }}
          >
            <JobExperience job={job} />
          </motion.div>
        ))}
      </ul>
    </article>
  )
}

export default WorkExperience
