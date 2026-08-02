'use client'

import Button from '@common/components/button'
import Popup from '@common/components/popup'
import { cn } from '@common/core/cn'
import { type TechnologyCategory, technologyCategories } from '@common/core/queries/techQuery/tech.type'
import { CheckIcon, PlusIcon } from 'lucide-react'
import type { FC } from 'react'

import useTechStore from '../../store/useTechStore'

const PRINCIPAL_COUNT = 7
const categories = Object.keys(technologyCategories) as TechnologyCategory[]

const CategorySelector: FC = () => {
  const filters = useTechStore(s => s.filters)
  const setFilters = useTechStore(s => s.setFilters)
  const activeCategories = filters.categories ?? []
  const principal = categories.slice(0, PRINCIPAL_COUNT)
  const remaining = categories.slice(PRINCIPAL_COUNT)

  const handleSelect = (cat: TechnologyCategory) => {
    if (activeCategories.includes(cat)) {
      setFilters({ categories: activeCategories.filter(c => c !== cat) })
      return
    }
    setFilters({ categories: [...activeCategories, cat] })
  }

  const clearAll = () => setFilters({ categories: [] })

  return (
    <div className='flex items-center gap-2'>
      <div className='no-scrollbar flex min-w-0 flex-1 gap-0.5 overflow-x-auto'>
        {principal.map(cat => {
          const active = activeCategories.includes(cat)

          return (
            <button
              key={cat}
              type='button'
              onClick={() => handleSelect(cat)}
              aria-pressed={active}
              className={cn(
                'shrink-0 rounded-md px-2 py-1 font-mono text-[11px] tracking-wide transition-colors outline-none',
                'focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 focus-visible:ring-2 focus-visible:ring-offset-2',
                active && 'bg-fn1 text-bg1',
                !active && 'text-fn2 hover:bg-bg2 hover:text-fn1'
              )}
            >
              {cat}
            </button>
          )
        })}

        {remaining.length > 0 && (
          <Popup>
            <Popup.Trigger asChild>
              <button
                type='button'
                className='text-fn2 hover:text-fn1 flex shrink-0 items-center gap-1 rounded-md px-2 py-1 font-mono text-[11px] transition-colors'
              >
                <PlusIcon className='size-3' aria-hidden />
                {remaining.length}
              </button>
            </Popup.Trigger>

            <Popup.Content align='end' className='w-56'>
              <Popup.Header>
                <Popup.Title>Más categorías</Popup.Title>
                <Popup.Close />
              </Popup.Header>

              <div className='no-scrollbar flex max-h-56 flex-col gap-0.5 overflow-y-auto p-1.5'>
                {remaining.map(cat => {
                  const active = activeCategories.includes(cat)

                  return (
                    <Button
                      key={cat}
                      variant='ghost'
                      size='sm'
                      onClick={() => handleSelect(cat)}
                      className={cn(
                        'h-8 w-full justify-between rounded-lg px-2.5 font-mono text-[11px]',
                        active && 'bg-bg2 text-fn1',
                        !active && 'text-fn2'
                      )}
                    >
                      <span>{cat}</span>
                      {active && <CheckIcon className='size-3.5' aria-hidden />}
                    </Button>
                  )
                })}
              </div>
            </Popup.Content>
          </Popup>
        )}
      </div>

      {activeCategories.length > 0 && (
        <button
          type='button'
          onClick={clearAll}
          className='text-fn2 hover:text-semantic-text-danger shrink-0 font-mono text-[11px] transition-colors'
        >
          reset
        </button>
      )}
    </div>
  )
}

export default CategorySelector
