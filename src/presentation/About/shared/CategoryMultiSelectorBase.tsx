'use client'

import Button from '@/shared/ui/components/Button'
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'

interface CategoryMultiSelectorBaseProps<T extends string> {
  title: string
  categories: T[]
  principalCount?: number
  activeCategories: T[]
  onSelectCategory: (category: T) => void
  clearAllCategories: () => void
  getLabel?: (category: T) => React.ReactNode
}

const CategoryMultiSelectorBase = <T extends string>({
  title,
  categories,
  principalCount = 6,
  activeCategories,
  onSelectCategory,
  clearAllCategories,
  getLabel
}: CategoryMultiSelectorBaseProps<T>) => {
  const principalCategories = categories.slice(0, principalCount)
  const remainingCategories = categories.slice(principalCount)

  const isActive = (cat: T): boolean => activeCategories.includes(cat)

  return (
    <section className='max-region:max-w-[600px] flex w-full flex-col gap-2.5'>
      <h3 className='text-fn2 font-light'>{title}</h3>

      <div className='max-region:justify-center flex flex-wrap gap-5'>
        {principalCategories.map(cat => {
          const active = isActive(cat)

          return (
            <Button
              variant='border'
              key={`category-${cat}`}
              onClick={() => onSelectCategory(cat)}
              className={`text-fn2 ${active ? 'text-gradient' : 'text-fn2'}`}
            >
              {getLabel ? getLabel(cat) : <h5>{cat}</h5>}
            </Button>
          )
        })}

        {remainingCategories.length > 0 && (
          <Menu as='div' className='relative'>
            <MenuButton as={Button} variant='border' className='text-fn2'>
              <h5>+{remainingCategories.length}</h5>
              <ChevronDownIcon />
            </MenuButton>

            <MenuItems
              anchor='bottom'
              className='bg-bg1 border-bg3 z-50 mt-2 w-64 rounded-xl border px-1 py-2 focus:outline-none'
            >
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
                {remainingCategories.map(category => {
                  const active = isActive(category)
                  return (
                    <MenuItem key={`modal-category-${category}`}>
                      {({ focus }) => (
                        <Button
                          onClick={() => onSelectCategory(category)}
                          className={`flex w-full items-center justify-between rounded-none text-left ${focus ? 'bg-bg3 text-fn1' : 'text-fn2'} ${active ? 'text-gradient' : ''}`}
                        >
                          <div className='text-a font-mono'>{getLabel ? getLabel(category) : category}</div>
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
                      <Button onClick={clearAllCategories} className='danger w-full rounded-md text-left'>
                        Limpiar selección
                      </Button>
                    )}
                  </MenuItem>
                </div>
              )}
            </MenuItems>
          </Menu>
        )}

        {activeCategories.length > 0 && (
          <Button onClick={clearAllCategories} variant='border' className='danger'>
            <p>Limpiar</p>
          </Button>
        )}
      </div>
    </section>
  )
}

export default CategoryMultiSelectorBase
