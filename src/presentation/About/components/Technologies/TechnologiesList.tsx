'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { FC } from 'react'

import useTechStore from '../../store/useTechStore'
import TechChip from '../TechChip'

const TechnologiesList: FC = () => {
  const techs = useTechStore(s => s.technologies)
  const [parent] = useAutoAnimate()

  return (
    <section className='bg-bg1 border-bg3 no-scrollbar h-[450px] w-[600px] overflow-y-auto rounded-xl border p-10 max-sm:w-full'>
      <div
        className='flex h-full w-full flex-wrap content-center justify-center gap-5 max-sm:h-max max-sm:content-start'
        ref={parent}
      >
        {techs.map(tech => (
          <TechChip className='px-2' noLabel key={`${tech.name}-tachList-${tech.icon}`} {...tech} />
        ))}
      </div>
    </section>
  )
}

export default TechnologiesList
