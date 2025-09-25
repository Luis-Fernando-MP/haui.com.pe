'use client'

import { SkillDomain, skillDomainCategories } from '@/lib/achievementsQuery/achievement.type'
import type { FC } from 'react'

import CategoryMultiSelectorBase from '../../shared/CategoryMultiSelectorBase'
import useAchievementStore from '../../store/useAchievementStore'

const SkillSelector: FC = () => {
  const filters = useAchievementStore(s => s.filters)
  const setFilters = useAchievementStore(s => s.setFilters)

  const handleSelect = (skill: SkillDomain) => {
    const currentCategories = filters.skillDomain || []
    const isActive = currentCategories.includes(skill)

    if (isActive) {
      return setFilters({ skillDomain: currentCategories.filter(c => c !== skill) })
    }
    setFilters({ skillDomain: [...currentCategories, skill] })
  }

  const clearAllCategories = () => {
    setFilters({ skillDomain: [] })
  }

  return (
    <CategoryMultiSelectorBase
      title='CATEGORÍAS:'
      categories={Object.keys(skillDomainCategories) as SkillDomain[]}
      activeCategories={filters.skillDomain || []}
      onSelectCategory={handleSelect}
      clearAllCategories={clearAllCategories}
      getLabel={cat => <h5>{cat}</h5>}
      principalCount={3}
    />
  )
}

export default SkillSelector
