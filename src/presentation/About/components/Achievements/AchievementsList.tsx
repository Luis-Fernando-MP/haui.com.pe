'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { FC } from 'react'

import useAchievementStore from '../../store/useAchievementStore'
import Achievement from '../Achievement'

const AchievementsList: FC = () => {
  const achievements = useAchievementStore(s => s.achievements)
  const [parent] = useAutoAnimate()

  return (
    <section
      className='no-scrollbar max-region:justify-center flex w-full flex-wrap content-start justify-end gap-5'
      ref={parent}
    >
      {achievements.map(achievement => (
        <Achievement key={achievement.name} {...achievement} />
      ))}
    </section>
  )
}

export default AchievementsList
