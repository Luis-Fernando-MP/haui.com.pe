'use client'

import { useFocusGalleryStore } from '@common/components/focus-gallery/store'
import Image from '@common/components/image'
import { cn } from '@common/core/cn'
import { Achievements, achievementIcons, devContributionColor } from '@common/core/queries/achievementsQuery/achievement.type'
import { ArrowUpRightIcon } from 'lucide-react'
import { type FC, memo } from 'react'

const Achievement: FC<Achievements> = props => {
  const { achievementType, name, devContribution, acquisitionDate, path, AdditionalImages, actionLink, technologies } = props
  const open = useFocusGalleryStore(s => s.open)
  const TypeIcon = achievementIcons[achievementType]
  const accent = devContributionColor[devContribution]
  const year = acquisitionDate.slice(0, 4)
  const visibleTechs = technologies.filter(t => t !== '*').slice(0, 3)

  const handleOpen = () => {
    open(
      [
        {
          src: path,
          caption: `<p>${name}</p>`,
          action: actionLink,
          actionText: 'Consultar información'
        },
        ...(AdditionalImages?.map(src => ({ src })) ?? [])
      ],
      0
    )
  }

  return (
    <button
      type='button'
      onClick={handleOpen}
      className={cn(
        'group border-bg3/70 bg-bg1 relative flex h-full w-full flex-col overflow-hidden rounded-2xl border text-left',
        'transition-[border-color,background-color] duration-200 outline-none motion-reduce:transition-none',
        'hover:border-fn2/30 hover:bg-bg2/30',
        'focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 focus-visible:ring-2 focus-visible:ring-offset-2'
      )}
    >
      <span
        aria-hidden
        className='pointer-events-none absolute inset-x-4 top-0 z-[2] h-px opacity-80'
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      <div className='relative aspect-[16/10] w-full overflow-hidden contain-paint'>
        <Image
          className={cn(
            'absolute inset-0 size-full object-cover',
            'transition-transform duration-300 ease-out motion-reduce:transition-none',
            'group-hover:scale-[1.03] motion-reduce:group-hover:scale-100'
          )}
          src={path}
          width={480}
          height={300}
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          layout='constrained'
          unstyled
          alt=''
          loading='lazy'
          decoding='async'
          background='/fallback.webp'
        />

        <div
          aria-hidden
          className='pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/3 bg-gradient-to-t from-black/25 to-transparent'
        />

        <span className='bg-bg1/95 border-bg3 text-fn2 absolute top-3 left-3 z-[2] inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wide'>
          <TypeIcon className='size-3' aria-hidden />
          {achievementType}
        </span>

        <span className='bg-bg1/95 border-bg3 text-fn1 absolute top-3 right-3 z-[2] inline-flex size-7 items-center justify-center rounded-full border opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none'>
          <ArrowUpRightIcon className='size-3.5' aria-hidden />
        </span>
      </div>

      <div className='flex flex-1 flex-col gap-3 p-4'>
        <h3 className='text-fn1 line-clamp-2 text-sm leading-snug font-semibold tracking-tight'>{name}</h3>

        {visibleTechs.length > 0 && (
          <ul className='flex flex-wrap gap-1'>
            {visibleTechs.map(tech => (
              <li
                key={tech}
                className='bg-bg2/70 border-bg3 text-fn2 list-none rounded-md border px-1.5 py-0.5 font-mono text-[10px]'
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className='mt-auto flex items-center justify-between gap-3 pt-1'>
          <div className='flex min-w-0 items-center gap-2'>
            <span className='size-2.5 shrink-0 rounded-sm' style={{ background: accent }} aria-hidden />
            <span className='text-fn2 truncate font-mono text-[11px]'>{devContribution}</span>
          </div>
          <time className='text-fn2 shrink-0 font-mono text-[11px] tabular-nums' dateTime={acquisitionDate}>
            {year}
          </time>
        </div>
      </div>
    </button>
  )
}

export default memo(Achievement)
