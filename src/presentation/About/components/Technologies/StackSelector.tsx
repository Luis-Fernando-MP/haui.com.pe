'use client'

import { TechnologyStack, technologyStack } from '@/lib/techQuery/tech.type'
import { useState } from 'react'

import CategorySelectorBase from '../../shared/CategorySelectorBase'
import useTechStore from '../../store/useTechStore'

const StackSelector = () => {
  const setFilters = useTechStore(s => s.setFilters)
  const [currentStack, setCurrentStack] = useState<TechnologyStack | undefined>(undefined)

  const handleSelect = (type: TechnologyStack) => {
    const stack = currentStack === type ? undefined : type
    setFilters({ stack })
    setCurrentStack(stack)
  }

  return (
    <CategorySelectorBase
      title='STACK:'
      items={Object.keys(technologyStack) as TechnologyStack[]}
      getLabel={item => (currentStack === item ? <h5 className='text-gradient'>{item}</h5> : <h5>{item}</h5>)}
      getIcon={item => {
        const Icon = technologyStack[item]
        return <Icon />
      }}
      isActive={item => currentStack === item}
      onSelect={handleSelect}
    />
  )
}

export default StackSelector
