'use client'

import { TechnologyCategory, technologyCategories } from '@/lib/techQuery/tech.type'
import Button from '@/shared/ui/components/Button'
import type { FC } from 'react'

import useTechStore from '../../store/useTechStore'
import CategoriesModal from './CategoriesModal'

const categories = Object.keys(technologyCategories)
const principalCategories = categories.slice(0, 6)
const remainingCategories = categories.slice(6)

const CategorySelector: FC = () => {
  const filters = useTechStore(s => s.filters)
  const setFilters = useTechStore(s => s.setFilters)

  const handleSelect = (cat: TechnologyCategory) => {
    const currentCategories = filters.categories || []
    const isActive = currentCategories.includes(cat)

    // Si está activo, lo removemos
    if (isActive) {
      return setFilters({ categories: currentCategories.filter(c => c !== cat) })
    }

    // Si no está activo, lo agregamos
    setFilters({ categories: [...currentCategories, cat] })
  }

  const clearAllCategories = () => {
    setFilters({ categories: [] })
  }

  const isActive = (cat: TechnologyCategory) => {
    return filters.categories?.includes(cat) || false
  }

  return (
    <section className='max-region:max-w-[600px] flex w-full flex-col gap-2.5'>
      <h3 className='text-fn2 font-light'>CATEGORÍAS:</h3>

      <div className='max-region:justify-center flex flex-wrap gap-5'>
        {principalCategories.map(cat => {
          const active = isActive(cat as TechnologyCategory)

          return (
            <Button
              variant='border'
              key={`category-${cat}`}
              onClick={() => handleSelect(cat as TechnologyCategory)}
              className={`text-fn2 ${active ? 'text-gradient' : 'text-fn2'}`}
            >
              <h5>{cat}</h5>
            </Button>
          )
        })}

        {remainingCategories.length > 0 && (
          <CategoriesModal
            clearAllCategories={clearAllCategories}
            categories={remainingCategories as TechnologyCategory[]}
            onSelectCategory={handleSelect}
            activeCategories={filters.categories || []}
          />
        )}

        {filters.categories && filters.categories.length > 0 && (
          <Button onClick={clearAllCategories} variant='border' className='danger'>
            <p>Limpiar</p>
          </Button>
        )}
      </div>
    </section>
  )
}

export default CategorySelector
