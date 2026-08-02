'use client'

import Title from '@common/components/title'
import { HISTORY_JOBS } from '@common/core/constants/historyJobs'
import { motion, useReducedMotion } from 'motion/react'
import type { FC } from 'react'

import JobExperience from './JobExperience'

const WorkExperience: FC = () => {
  const reduceMotion = useReducedMotion()

  return (
    <section id='experience' className='max-region:px-5 flex w-full scroll-mt-28 flex-col items-center gap-12'>
      <motion.header
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className='region max-region:items-center max-region:text-center flex flex-col gap-4'
      >
        <p className='text-fn2 font-mono text-xs tracking-[0.18em] uppercase'>2019 — 2026</p>
        <Title>
          Mi Experiencia
          <br />
          <span className='text-gradient'>Laboral</span>
        </Title>
        <p className='text-fn2 text-pretty max-w-[640px] font-mono text-base leading-relaxed'>
          <strong className='text-fn1 font-semibold'>He construido software para empresas de distinto tamaño</strong>, desde
          equipos pequeños hasta organizaciones grandes. Priorizo sistemas robustos, seguros y fáciles de mantener.
        </p>
      </motion.header>

      <ul className='border-bg3 flex w-full flex-col border-y'>
        {HISTORY_JOBS.map((job, i) => (
          <motion.li
            key={job.name}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.4, delay: reduceMotion ? 0 : Math.min(i * 0.06, 0.24), ease: 'easeOut' }}
            className='list-none'
          >
            <JobExperience job={job} />
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

export default WorkExperience
