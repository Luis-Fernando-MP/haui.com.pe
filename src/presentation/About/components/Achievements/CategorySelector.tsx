'use client'

import { AchievementType, achievementIcons } from '@/lib/achievementsQuery/achievement.type'
import { useState } from 'react'

import CategorySelectorBase from '../../shared/CategorySelectorBase'
import useAchievementStore from '../../store/useAchievementStore'

const AchievementCategorySelector = () => {
  const setFilters = useAchievementStore(s => s.setFilters)
  const [currentStack, setCurrentStack] = useState<AchievementType | undefined>(undefined)

  const handleSelect = (type: AchievementType) => {
    const achievement = currentStack === type ? undefined : type
    setFilters({ achievementType: achievement })
    setCurrentStack(achievement)
  }

  return (
    <CategorySelectorBase
      title='CATEGORÍA:'
      items={Object.keys(achievementIcons) as AchievementType[]}
      getLabel={item => (currentStack === item ? <h5 className='text-gradient'>{item}</h5> : <h5>{item}</h5>)}
      getIcon={item => {
        const Icon = achievementIcons[item]
        return <Icon />
      }}
      isActive={item => currentStack === item}
      onSelect={handleSelect}
    />
  )
}

export default AchievementCategorySelector
