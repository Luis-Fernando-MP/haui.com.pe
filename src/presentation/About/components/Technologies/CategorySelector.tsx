'use client'

import { TechnologyCategory, technologyCategories } from '@/lib/techQuery/tech.type'

import CategoryMultiSelectorBase from '../../shared/CategoryMultiSelectorBase'
import useTechStore from '../../store/useTechStore'

const CategorySelector = () => {
  const filters = useTechStore(s => s.filters)
  const setFilters = useTechStore(s => s.setFilters)

  const handleSelect = (cat: TechnologyCategory) => {
    const currentCategories = filters.categories || []
    const isActive = currentCategories.includes(cat)

    if (isActive) {
      return setFilters({ categories: currentCategories.filter(c => c !== cat) })
    }
    setFilters({ categories: [...currentCategories, cat] })
  }

  const clearAllCategories = () => {
    setFilters({ categories: [] })
  }

  return (
    <CategoryMultiSelectorBase
      title='CATEGORÍAS:'
      categories={Object.keys(technologyCategories) as TechnologyCategory[]}
      activeCategories={filters.categories || []}
      onSelectCategory={handleSelect}
      clearAllCategories={clearAllCategories}
      getLabel={cat => <h5>{cat}</h5>}
    />
  )
}

export default CategorySelector
