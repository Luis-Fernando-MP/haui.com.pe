'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { FC } from 'react'

import useAchievementStore from '../../store/useAchievementStore'
import Achievement from '../Achievement'

const AchievementsList: FC = () => {
  const achievements = useAchievementStore(s => s.achievements)
  const resetFilters = useAchievementStore(s => s.resetFilters)
  const [parent] = useAutoAnimate()

  if (achievements.length === 0) {
    return (
      <div className='border-bg3/70 flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-5 text-center'>
        <p className='text-fn2 text-sm'>Nada con esos filtros. Prueba otro tipo o dominio.</p>
        <button
          type='button'
          onClick={resetFilters}
          className='text-fn1 hover:text-fn2 font-mono text-[11px] tracking-wide underline-offset-4 transition-colors hover:underline'
        >
          reset filtros
        </button>
      </div>
    )
  }

  return (
    <ul ref={parent} className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
      {achievements.map(achievement => (
        <li key={achievement.name} className='list-none [content-visibility:auto] [contain-intrinsic-size:auto_340px]'>
          <Achievement {...achievement} />
        </li>
      ))}
    </ul>
  )
}

export default AchievementsList
