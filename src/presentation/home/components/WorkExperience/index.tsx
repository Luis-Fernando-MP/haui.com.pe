'use client'

import Title from '@common/components/title'
import { HISTORY_JOBS } from '@common/core/data/historyJobs'
import { motion } from 'motion/react'
import type { FC } from 'react'

import JobExperience from './JobExperience'

const ease = [0.22, 1, 0.36, 1] as const

const WorkExperience: FC = () => {
  return (
    <section
      id='experience'
      className='max-region:px-5 flex w-full min-w-0 scroll-mt-24 flex-col items-center gap-8 sm:scroll-mt-28 sm:gap-12 md:gap-16'
    >
      <motion.header
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease }}
        className='region max-region:items-center max-region:text-center flex w-full min-w-0 flex-col gap-3 sm:gap-4'
      >
        <p className='type-label text-fn2'>Trayectoria Profesional</p>
        <Title>
          Mi Experiencia
          <br />
          <span className='text-gradient'>Laboral</span>
        </Title>
        <p className='type-lead text-fn2 max-w-[520px] text-pretty'>
          Diseño y desarrollo de sistemas robustos, escalables y centrados en el usuario para startups y empresas consolidadas.
        </p>
      </motion.header>

      <div className='region mx-auto flex w-full min-w-0 flex-col gap-3.5 sm:gap-5'>
        {HISTORY_JOBS.map((job, i) => (
          <motion.div
            key={job.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.08, 0.3), ease }}
            className='min-w-0'
          >
            <JobExperience job={job} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default WorkExperience
