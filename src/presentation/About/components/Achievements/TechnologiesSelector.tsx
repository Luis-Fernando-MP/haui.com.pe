'use client'

import { achievementCategories } from '@/shared/config/constants/achievements'
import type { FC } from 'react'

import CategoryMultiSelectorBase from '../../shared/CategoryMultiSelectorBase'
import useAchievementStore from '../../store/useAchievementStore'

const TechnologiesSelector: FC = () => {
  const filters = useAchievementStore(s => s.filters)
  const setFilters = useAchievementStore(s => s.setFilters)

  const handleSelect = (tech: string) => {
    const currentTechnologies = filters.technologies || []
    const isActive = currentTechnologies.includes(tech)

    if (isActive) {
      return setFilters({
        technologies: currentTechnologies.filter(t => t !== tech)
      })
    }
    setFilters({
      technologies: [...currentTechnologies, tech]
    })
  }

  const clearAllCategories = () => {
    setFilters({ technologies: [] })
  }

  return (
    <CategoryMultiSelectorBase
      title='TECNOLOGÍAS:'
      categories={achievementCategories}
      activeCategories={filters.technologies || []}
      onSelectCategory={handleSelect}
      clearAllCategories={clearAllCategories}
      getLabel={cat => <h5>{cat}</h5>}
      principalCount={3}
    />
  )
}

export default TechnologiesSelector
