'use client'

import { motion } from 'motion/react'
import type { FC } from 'react'

import useTechStore from '../../store/useTechStore'
import CategorySelector from './CategorySelector'
import StackSelector from './StackSelector'
import TechnologiesList from './TechnologiesList'

const ease = [0.22, 1, 0.36, 1] as const

const Technologies: FC = () => {
  const count = useTechStore(s => s.technologies.length)

  return (
    <section className='region max-region:px-5 relative mx-auto w-full'>
      <div className='border-bg3/70 relative overflow-hidden rounded-3xl border'>
        <div
          aria-hidden
          className='from-from/15 via-via/10 to-to/15 pointer-events-none absolute -top-20 right-0 h-52 w-52 rounded-full bg-gradient-to-br blur-3xl'
        />

        <div className='relative flex flex-col gap-5 p-5 sm:gap-6 sm:p-6 md:p-7'>
          <header className='flex items-end justify-between gap-4'>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, ease }}
              className='flex max-w-[820px] min-w-0 flex-col gap-2'
            >
              <p className='text-fn2 font-mono text-[11px] tracking-[0.16em] uppercase'>Toolkit</p>

              <h2 className='text-fn1 text-[clamp(2rem,5.5vw,3.5rem)] leading-[0.98] font-bold tracking-tight'>
                <p className='font-flowers text-gradient font-normal'>Tecnologías</p>
                &nbsp;de desarrollo
              </h2>

              <p className='text-fn2 max-w-[400px] text-sm leading-relaxed text-pretty'>
                Un mapa vivo de herramientas. Filtra por stack o categoría y ve qué queda en la mesa.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, ease, delay: 0.06 }}
              className='hidden shrink-0 flex-col items-end sm:flex'
            >
              <span className='text-fn1 font-mono text-4xl leading-none font-bold tracking-tight tabular-nums md:text-5xl'>
                {String(count).padStart(2, '0')}
              </span>
              <span className='text-fn2 mt-1 font-mono text-[10px] tracking-[0.14em] uppercase'>en vista</span>
            </motion.div>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease, delay: 0.08 }}
            className='flex flex-col gap-3'
          >
            <StackSelector />
            <CategorySelector />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease, delay: 0.1 }}
          >
            <TechnologiesList />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Technologies
