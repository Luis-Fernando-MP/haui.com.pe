'use client'

import Image from '@common/components/image'
import { cn } from '@common/core/cn'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { FC } from 'react'

import useTechStore from '../../store/useTechStore'

const TechnologiesList: FC = () => {
  const techs = useTechStore(s => s.technologies)
  const [parent] = useAutoAnimate()

  if (techs.length === 0) {
    return (
      <div className='border-bg3/70 flex min-h-[180px] items-center justify-center rounded-2xl border border-dashed px-5 text-center'>
        <p className='text-fn2 text-sm'>Nada con esos filtros. Prueba otro stack o reset.</p>
      </div>
    )
  }

  return (
    <ul ref={parent} className='grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10'>
      {techs.map(tech => (
        <li key={`${tech.name}-${tech.icon}`} className='list-none'>
          <article
            title={`${tech.name} · ${tech.level}`}
            className={cn(
              'group border-bg3/70 bg-bg1 relative flex aspect-square flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border p-1',
              'transition-[transform,border-color,background-color] duration-200 motion-reduce:transition-none',
              'hover:border-fn2/25 hover:bg-bg2/30 hover:-translate-y-0.5'
            )}
          >
            <span
              aria-hidden
              className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100'
              style={{
                background: `radial-gradient(circle at 50% 35%, ${tech.color}28, transparent 62%)`
              }}
            />

            <div className='relative z-[1] flex size-7 items-center justify-center transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none sm:size-8'>
              <Image
                className='size-[26px] object-contain'
                src={tech.icon}
                width={26}
                height={26}
                layout='fixed'
                unstyled
                objectFit='contain'
                alt=''
                background='/fallback.webp'
              />
            </div>

            <h3 className='text-fn1 relative z-[1] w-full truncate px-0.5 text-center text-[10px] font-medium tracking-tight sm:text-[11px]'>
              {tech.name}
            </h3>
          </article>
        </li>
      ))}
    </ul>
  )
}

export default TechnologiesList
