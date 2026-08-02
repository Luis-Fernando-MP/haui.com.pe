'use client'

import Button from '@common/components/button'
import Popup from '@common/components/popup'
import { cn } from '@common/core/cn'
import { type SkillDomain, skillDomainCategories } from '@common/core/queries/achievementsQuery/achievement.type'
import { CheckIcon, PlusIcon } from 'lucide-react'
import type { FC } from 'react'

import useAchievementStore from '../../store/useAchievementStore'

const PRINCIPAL_COUNT = 6
const domains = Object.keys(skillDomainCategories) as SkillDomain[]

const SkillSelector: FC = () => {
  const filters = useAchievementStore(s => s.filters)
  const setFilters = useAchievementStore(s => s.setFilters)
  const active = filters.skillDomain ?? []
  const principal = domains.slice(0, PRINCIPAL_COUNT)
  const remaining = domains.slice(PRINCIPAL_COUNT)

  const handleSelect = (skill: SkillDomain) => {
    if (active.includes(skill)) {
      setFilters({ skillDomain: active.filter(s => s !== skill) })
      return
    }
    setFilters({ skillDomain: [...active, skill] })
  }

  const clearAll = () => setFilters({ skillDomain: [] })

  return (
    <div className='flex items-center gap-2'>
      <span className='text-fn2 hidden shrink-0 font-mono text-[10px] tracking-[0.14em] uppercase sm:inline'>Dominio</span>

      <div className='no-scrollbar flex min-w-0 flex-1 gap-0.5 overflow-x-auto'>
        {principal.map(skill => {
          const isActive = active.includes(skill)

          return (
            <button
              key={skill}
              type='button'
              onClick={() => handleSelect(skill)}
              aria-pressed={isActive}
              className={cn(
                'shrink-0 rounded-md px-2 py-1 font-mono text-[11px] tracking-wide transition-colors outline-none',
                'focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 focus-visible:ring-2 focus-visible:ring-offset-2',
                isActive && 'bg-fn1 text-bg1',
                !isActive && 'text-fn2 hover:bg-bg2 hover:text-fn1'
              )}
            >
              {skill}
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

            <Popup.Content align='start' className='w-56'>
              <Popup.Header>
                <Popup.Title>Más dominios</Popup.Title>
                <Popup.Close />
              </Popup.Header>

              <div className='no-scrollbar flex max-h-56 flex-col gap-0.5 overflow-y-auto p-1.5'>
                {remaining.map(skill => {
                  const isActive = active.includes(skill)

                  return (
                    <Button
                      key={skill}
                      variant='ghost'
                      size='sm'
                      onClick={() => handleSelect(skill)}
                      className={cn(
                        'h-8 w-full justify-between rounded-lg px-2.5 font-mono text-[11px]',
                        isActive && 'bg-bg2 text-fn1',
                        !isActive && 'text-fn2'
                      )}
                    >
                      <span>{skill}</span>
                      {isActive && <CheckIcon className='size-3.5' aria-hidden />}
                    </Button>
                  )
                })}
              </div>
            </Popup.Content>
          </Popup>
        )}
      </div>

      {active.length > 0 && (
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

export default SkillSelector
