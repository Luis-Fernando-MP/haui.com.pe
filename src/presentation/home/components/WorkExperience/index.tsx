'use client'

import Title from '@common/components/title'
import { HISTORY_JOBS } from '@common/core/constants/historyJobs'
import { motion } from 'motion/react'
import type { FC } from 'react'

import JobExperience from './JobExperience'

const ease = [0.22, 1, 0.36, 1] as const

const WorkExperience: FC = () => {
  return (
    <section id='experience' className='max-region:px-5 flex w-full scroll-mt-28 flex-col items-center gap-12 md:gap-16'>
      <motion.header
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease }}
        className='region max-region:items-center max-region:text-center flex flex-col gap-4'
      >
        <p className='text-fn2 font-mono text-xs tracking-[0.18em] uppercase'>Trayectoria Profesional</p>
        <Title>
          Mi Experiencia
          <br />
          <span className='text-gradient'>Laboral</span>
        </Title>
        <p className='text-fn2 max-w-[520px] font-mono text-base leading-relaxed text-pretty'>
          Diseño y desarrollo de sistemas robustos, escalables y centrados en el usuario para startups y empresas consolidadas.
        </p>
      </motion.header>

      <div className='region mx-auto flex w-full flex-col gap-5'>
        {HISTORY_JOBS.map((job, i) => (
          <motion.div
            key={job.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.08, 0.3), ease }}
          >
            <JobExperience job={job} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default WorkExperience
