'use client'

import { TechnologyCategory } from '@/lib/techQuery/tech.type'
import Button from '@/shared/ui/components/Button'
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import type { FC } from 'react'

interface CategoriesModalProps {
  categories: TechnologyCategory[]
  onSelectCategory: (category: TechnologyCategory) => void
  activeCategories: TechnologyCategory[]
  clearAllCategories: () => void
}

const CategoriesModal: FC<CategoriesModalProps> = ({ categories, onSelectCategory, activeCategories, clearAllCategories }) => {
  const isActive = (cat: TechnologyCategory): boolean => {
    return activeCategories.includes(cat)
  }

  const handleCategoryClick = (category: TechnologyCategory): void => {
    onSelectCategory(category)
  }

  return (
    <Menu as='div' className='relative'>
      <MenuButton as={Button} variant='border' className='text-fn2'>
        <h5>+{categories.length}</h5>
        <ChevronDownIcon />
      </MenuButton>

      <MenuItems anchor='bottom' className='bg-bg1 border-bg3 z-50 mt-2 w-64 rounded-xl border px-1 py-2 focus:outline-none'>
        <div className='flex flex-col gap-1 p-3'>
          <h4>Más Categorías</h4>
          <p className='text-fn2'>
            {activeCategories.length > 0
              ? `${activeCategories.length} seleccionada${activeCategories.length > 1 ? 's' : ''}`
              : 'Selecciona categorías'}
          </p>
        </div>

        <MenuSeparator className='bg-bg3 my-1 h-px' />

        <div className='no-scrollbar max-h-60 overflow-y-auto py-1'>
          {categories.map(category => {
            const active = isActive(category)
            return (
              <MenuItem key={`modal-category-${category}`}>
                {({ focus }) => (
                  <Button
                    onClick={() => handleCategoryClick(category)}
                    className={`flex w-full items-center justify-between rounded-none text-left ${focus ? 'bg-bg3 text-fn1' : 'text-fn2'} ${active ? 'text-gradient' : ''} `}
                  >
                    <p className='text-a font-mono'>{category}</p>
                    {active && <CheckIcon className='text-fn1 w-5' />}
                  </Button>
                )}
              </MenuItem>
            )
          })}
        </div>

        <MenuSeparator className='bg-bg3 my-3 h-px' />

        {activeCategories.length > 0 && (
          <div>
            <MenuItem>
              {() => (
                <Button onClick={clearAllCategories} className={`danger w-full rounded-md text-left`}>
                  Limpiar selección
                </Button>
              )}
            </MenuItem>
          </div>
        )}
      </MenuItems>
    </Menu>
  )
}

export default CategoriesModal
