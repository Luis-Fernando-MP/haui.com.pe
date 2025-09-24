'use client'

import { TechnologyStack, technologyStack } from '@/lib/techQuery/tech.type'
import Button from '@/shared/ui/components/Button'
import { type FC, useState } from 'react'

import useTechStore from '../../store/useTechStore'

const StackSelector: FC = () => {
  const setFilters = useTechStore(s => s.setFilters)
  const [currentStack, setCurrentStack] = useState<TechnologyStack | undefined>(undefined)

  const handleSelect = (type: TechnologyStack): void => {
    let stack: TechnologyStack | undefined = type
    if (currentStack === type) stack = undefined

    setFilters({ stack })
    setCurrentStack(stack)
  }

  return (
    <section className='flex flex-col gap-2.5'>
      <h3 className='text-fn2 font-light'>STACK:</h3>

      <div className='flex flex-wrap gap-5'>
        {Object.entries(technologyStack).map(type => {
          const [name, Icon] = type
          const isActive = name === currentStack

          return (
            <Button
              key={`stack-${name}`}
              variant='border'
              onClick={() => handleSelect(name as TechnologyStack)}
              className={`${isActive ? 'svg-gradient' : ''} text-fn2 px-2`}
            >
              <Icon />
              {isActive && <h5 className='text-gradient'>{name}</h5>}
            </Button>
          )
        })}
      </div>
    </section>
  )
}

export default StackSelector
