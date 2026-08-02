'use client'

import { cn } from '@common/core/cn'
import { personalJourneys } from '@common/core/constants/personalJourneys'
import { AnimatePresence, motion } from 'motion/react'
import { type FC, useState } from 'react'

import JourneyComponent from './Journey'

const ease = [0.22, 1, 0.36, 1] as const

const HeroHeader: FC = () => {
  const [activeId, setActiveId] = useState(personalJourneys[1]?.id ?? personalJourneys[0].id)
  const active = personalJourneys.find(j => j.id === activeId) ?? personalJourneys[0]
  const activeIndex = personalJourneys.findIndex(j => j.id === active.id)

  return (
    <header className='region max-region:px-5 relative mx-auto w-full overflow-x-hidden pt-24 pb-14 md:pt-28 md:pb-20'>
      <div className='mb-10 flex flex-col gap-5 md:mb-12'>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className='flex flex-wrap items-center justify-between gap-3 max-md:justify-center'
        >
          <p className='text-fn2 font-mono text-[11px] tracking-[0.18em] uppercase'>Sobre mí</p>
          <p className='text-fn2 font-mono text-[11px] tracking-[0.12em]'>Lima · UTC-5 · ES</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.06 }}
          className='flex flex-col gap-3 max-md:items-center max-md:text-center'
        >
          <h1 className='text-[clamp(2.75rem,11vw,6rem)] font-extrabold'>
            <p className='text-fn1 inline-block text-[clamp(2.75rem,11vw,6rem)]'>DIME</p>&nbsp;
            <p className='text-gradient inline-block'>HAUI</p>
          </h1>
          <p className='text-fn2 max-w-[420px] text-sm leading-relaxed text-pretty md:text-base'>
            Dime Haui. Construyo experiencias digitales claras — código, detalle y una forma propia de mirar.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease, delay: 0.14 }}
        className='border-bg3/60 grid gap-8 border-t pt-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 md:pt-10'
      >
        <nav aria-label='Capítulos del journey' className='relative flex flex-col gap-0'>
          <div aria-hidden className='bg-bg3/70 absolute top-3 bottom-3 left-[15px] hidden w-px md:block' />

          {personalJourneys.map((journey, i) => {
            const selected = journey.id === active.id
            const Icon = journey.Icon

            return (
              <button
                key={journey.id}
                type='button'
                onClick={() => setActiveId(journey.id)}
                aria-pressed={selected}
                className={cn(
                  'group relative flex items-center gap-3 rounded-xl px-2 py-3 text-left transition-colors outline-none md:py-4',
                  'focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 focus-visible:ring-2 focus-visible:ring-offset-2',
                  selected ? 'bg-bg2/40' : 'hover:bg-bg2/20'
                )}
              >
                <span
                  className={cn(
                    'relative z-[1] flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors',
                    selected ? 'bg-fn1 text-bg1 border-transparent' : 'border-bg3 bg-bg1 text-fn2 group-hover:text-fn1'
                  )}
                >
                  <Icon className='size-3.5' />
                </span>

                <span className='flex min-w-0 flex-col gap-0.5'>
                  <span
                    className={cn(
                      'truncate text-sm font-semibold tracking-tight transition-colors',
                      selected ? 'text-fn1' : 'text-fn2 group-hover:text-fn1'
                    )}
                  >
                    {journey.title}
                  </span>
                  <span className='text-fn2/70 font-mono text-[10px] tabular-nums'>
                    {String(i + 1).padStart(2, '0')} · {journey.date}
                  </span>
                </span>
              </button>
            )
          })}
        </nav>

        <div className='min-w-0'>
          <div className='mb-4 flex items-center gap-3'>
            <span className='text-fn2 font-mono text-[11px] tracking-[0.16em] uppercase'>Capítulo</span>
            <span className='text-fn1 font-mono text-sm font-semibold tabular-nums'>
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className='bg-bg3/70 h-px flex-1' aria-hidden />
          </div>

          <AnimatePresence mode='wait'>
            <JourneyComponent key={active.id} journey={active} />
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  )
}

export default HeroHeader
