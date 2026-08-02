'use client'

import { cn } from '@common/core/cn'
import { AchievementType, achievementIcons } from '@common/core/queries/achievementsQuery/achievement.type'
import { motion } from 'motion/react'
import type { FC } from 'react'

import useAchievementStore from '../../store/useAchievementStore'

const TYPES = Object.keys(achievementIcons) as AchievementType[]

const CategorySelector: FC = () => {
  const activeType = useAchievementStore(s => s.filters.achievementType)
  const setFilters = useAchievementStore(s => s.setFilters)

  const handleSelect = (type: AchievementType) => {
    if (activeType === type) {
      setFilters({ achievementType: undefined })
      return
    }
    setFilters({ achievementType: type })
  }

  return (
    <div className='bg-bg2/40 border-bg3 grid grid-cols-3 gap-1 rounded-xl border p-1'>
      {TYPES.map(type => {
        const Icon = achievementIcons[type]
        const active = activeType === type

        return (
          <button
            key={type}
            type='button'
            onClick={() => handleSelect(type)}
            aria-pressed={active}
            className={cn(
              'relative flex items-center justify-center gap-2 rounded-lg px-2.5 py-2 text-left transition-colors outline-none sm:justify-start',
              'focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 focus-visible:ring-2 focus-visible:ring-offset-2',
              !active && 'text-fn2 hover:bg-bg1/60'
            )}
          >
            {active && (
              <motion.span
                layoutId='achievement-type-active'
                className='bg-bg1 border-bg3 absolute inset-0 rounded-lg border shadow-[0_8px_20px_-16px_rgba(0,0,0,0.35)]'
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}

            <span
              className={cn(
                'relative z-[1] flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors',
                active ? 'bg-fn1 text-bg1 border-transparent' : 'border-bg3 bg-bg1/70'
              )}
            >
              <Icon className='size-3.5' aria-hidden />
            </span>

            <span
              className={cn(
                'relative z-[1] hidden text-sm font-semibold tracking-tight sm:inline',
                active ? 'text-fn1' : 'text-fn2'
              )}
            >
              {type}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default CategorySelector
