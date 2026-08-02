'use client'

import { cn } from '@common/core/cn'
import { type TechnologyStack, technologyStack } from '@common/core/queries/techQuery/tech.type'
import { motion } from 'motion/react'
import { type FC, useState } from 'react'

import useTechStore from '../../store/useTechStore'

const STACK_ORDER = ['frontend', 'backend', 'devops', 'Kit'] as const satisfies TechnologyStack[]

const STACK_LABEL: Record<TechnologyStack, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  devops: 'DevOps',
  Kit: 'Kit'
}

const StackSelector: FC = () => {
  const setFilters = useTechStore(s => s.setFilters)
  const [currentStack, setCurrentStack] = useState<TechnologyStack>()

  const handleSelect = (type: TechnologyStack) => {
    const stack = currentStack === type ? undefined : type
    setFilters({ stack })
    setCurrentStack(stack)
  }

  return (
    <div className='bg-bg2/40 border-bg3 grid grid-cols-2 gap-1 rounded-xl border p-1 sm:grid-cols-4'>
      {STACK_ORDER.map(stack => {
        const Icon = technologyStack[stack]
        const active = currentStack === stack

        return (
          <button
            key={stack}
            type='button'
            onClick={() => handleSelect(stack)}
            aria-pressed={active}
            className={cn(
              'relative flex items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-colors outline-none',
              'focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 focus-visible:ring-2 focus-visible:ring-offset-2',
              !active && 'text-fn2 hover:bg-bg1/60'
            )}
          >
            {active && (
              <motion.span
                layoutId='tech-stack-active'
                className='bg-bg1 border-bg3 absolute inset-0 rounded-lg border shadow-[0_8px_20px_-16px_rgba(0,0,0,0.35)]'
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}

            <span
              className={cn(
                'relative z-[1] flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors',
                active ? 'bg-fn1 text-bg1 border-transparent' : 'border-bg3 bg-bg1/70'
              )}
            >
              <Icon className='size-3.5' aria-hidden />
            </span>

            <span className={cn('relative z-[1] text-sm font-semibold tracking-tight', active ? 'text-fn1' : 'text-fn2')}>
              {STACK_LABEL[stack]}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default StackSelector
