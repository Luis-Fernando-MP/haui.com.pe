'use client'

import { motion } from 'motion/react'
import type { FC } from 'react'

import useAchievementStore from '../../store/useAchievementStore'
import AchievementsList from './AchievementsList'
import CategorySelector from './CategorySelector'
import SkillSelector from './SkillSelector'
import TechnologiesSelector from './TechnologiesSelector'

const ease = [0.22, 1, 0.36, 1] as const

const Achievements: FC = () => {
  const count = useAchievementStore(s => s.achievements.length)
  const filters = useAchievementStore(s => s.filters)
  const resetFilters = useAchievementStore(s => s.resetFilters)

  const hasFilters =
    Boolean(filters.achievementType) || (filters.skillDomain?.length ?? 0) > 0 || (filters.technologies?.length ?? 0) > 0

  return (
    <section className='region max-region:px-5 relative mx-auto w-full'>
      <div className='border-bg3/70 relative overflow-hidden rounded-3xl border'>
        <div
          aria-hidden
          className='from-from/15 via-via/10 to-to/15 pointer-events-none absolute -top-24 left-0 h-56 w-56 rounded-full bg-gradient-to-br blur-3xl'
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
              <p className='text-fn2 font-mono text-[11px] tracking-[0.16em] uppercase'>Credenciales</p>

              <h2 className='text-fn1 text-[clamp(2rem,5.5vw,3.5rem)] leading-[0.98] font-bold tracking-tight'>
                <span className='font-flowers text-gradient font-normal'>Certificados</span>
                &nbsp;y títulos
              </h2>

              <p className='text-fn2 max-w-[440px] text-sm leading-relaxed text-pretty'>
                Cada día intento aprender algo nuevo. Filtra por tipo, dominio o tecnología y abre cada credencial.
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
              {hasFilters && (
                <button
                  type='button'
                  onClick={resetFilters}
                  className='text-fn2 hover:text-semantic-text-danger mt-2 font-mono text-[11px] transition-colors'
                >
                  reset filtros
                </button>
              )}
            </motion.div>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease, delay: 0.08 }}
            className='flex flex-col gap-3'
          >
            <CategorySelector />
            <SkillSelector />
            <TechnologiesSelector />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease, delay: 0.1 }}
          >
            <AchievementsList />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Achievements
