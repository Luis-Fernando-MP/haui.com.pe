'use client'

import { motion } from 'motion/react'
import type { FC } from 'react'

import BackgroundWorkspace from './BackgroundWorkspace'

const ease = [0.22, 1, 0.36, 1] as const

const SETUP = [
  { label: 'Focus', value: 'Deep work' },
  { label: 'Ritmo', value: 'Diario' },
  { label: 'Ambiente', value: 'Silencioso' },
  { label: 'Modo', value: 'Build' }
] as const

const Workspace: FC = () => {
  return (
    <section className='region max-region:px-5 relative mx-auto w-full'>
      <div className='relative flex flex-col gap-8 md:gap-10'>
        <header className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease }}
            className='flex max-w-[640px] flex-col gap-2'
          >
            <p className='text-fn2 font-mono text-[11px] tracking-[0.16em] uppercase'>Workspace</p>

            <h2 className='text-fn1 text-[clamp(2rem,5.5vw,3.5rem)] leading-[0.98] font-bold tracking-tight'>
              Mi espacio de <span className='font-flowers text-gradient font-normal'>trabajo</span>
            </h2>

            <p className='text-fn2 max-w-[460px] text-sm leading-relaxed text-pretty'>
              Un rincón pensado para concentración y flujo: herramientas claras, luz controlada y cero ruido de más.
            </p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, ease, delay: 0.12 }}
            className='grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-8'
          >
            {SETUP.map((item, index) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease, delay: 0.18 + index * 0.08 }}
                className='flex list-none flex-col gap-0.5'
              >
                <span className='text-fn2 font-mono text-[10px] tracking-[0.14em] uppercase'>{item.label}</span>
                <span className='text-fn1 text-sm font-semibold tracking-tight'>{item.value}</span>
              </motion.li>
            ))}
          </motion.ul>
        </header>

        <BackgroundWorkspace />

        <div
          aria-hidden
          className='from-from/20 via-via/12 to-to/18 pointer-events-none absolute top-16 left-1/2 -z-10 h-[280px] w-[min(92%,640px)] -translate-x-1/2 rounded-full bg-gradient-to-r opacity-45 blur-[110px] select-none'
        />
      </div>
    </section>
  )
}

export default Workspace
