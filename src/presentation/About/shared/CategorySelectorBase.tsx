'use client'

import Button from '@/shared/ui/components/Button'
import type { ReactNode } from 'react'

interface CategorySelectorBaseProps<T extends string> {
  title?: string
  items: T[]
  getLabel: (item: T) => ReactNode
  getIcon?: (item: T) => ReactNode
  isActive: (item: T) => boolean
  onSelect: (item: T) => void
  extraActions?: ReactNode
  className?: string
}

const CategorySelectorBase = <T extends string>({
  title = 'CATEGORÍAS:',
  items,
  getLabel,
  getIcon,
  isActive,
  onSelect,
  extraActions,
  className = ''
}: CategorySelectorBaseProps<T>) => {
  return (
    <section className={`flex flex-col gap-2.5 ${className}`}>
      <h3 className='text-fn2 font-light'>{title}</h3>

      <div className='flex flex-wrap gap-5'>
        {items.map(item => {
          const active = isActive(item)

          return (
            <Button
              key={`category-${item}`}
              variant='border'
              onClick={() => onSelect(item)}
              className={`${active ? 'svg-gradient text-gradient' : 'text-fn2'} px-2`}
            >
              {getIcon?.(item)}
              {active && getLabel(item)}
            </Button>
          )
        })}

        {extraActions}
      </div>
    </section>
  )
}

export default CategorySelectorBase
