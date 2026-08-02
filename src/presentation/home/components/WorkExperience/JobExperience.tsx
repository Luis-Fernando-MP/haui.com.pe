'use client'

import Button from '@common/components/button'
import Chip from '@common/components/chip'
import { cn } from '@common/core/cn'
import { HistoryJob } from '@common/core/constants/historyJobs'
import { ArrowUpRightIcon, GlobeIcon, Share2Icon } from 'lucide-react'
import type { FC, KeyboardEvent, MouseEvent } from 'react'

import useJobExperienceStore from '../../store/useJobExperience'

interface Props {
  job: HistoryJob
}

const JobExperience: FC<Props> = ({ job }) => {
  const selectedJob = useJobExperienceStore(s => s.selectedJob)
  const setSelectedJob = useJobExperienceStore(s => s.setSelectedJob)

  const { year, name, position, websiteUrl, facebookUrl, externalUrl, Activities, usedTools, Extra, period } = job
  const more = selectedJob === name
  const listOfTools = more ? usedTools : usedTools.slice(0, 5)

  const handleToggle = (e: MouseEvent<HTMLDivElement>): void => {
    if ((e.target as HTMLElement).closest('a,button')) return
    setSelectedJob(name)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()
    setSelectedJob(name)
  }

  return (
    <div
      role='button'
      tabIndex={0}
      aria-expanded={more}
      aria-label={`${position} en ${name}. ${more ? 'Contraer' : 'Expandir'} detalles`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={cn(
        'border-bg3 group w-full border-b py-8 last:border-b-0 md:py-10',
        'outline-none transition-colors duration-200',
        'hover:bg-bg2/60 focus-visible:bg-bg2/60 focus-visible:ring-fn2/40 focus-visible:ring-2 focus-visible:ring-inset',
        more && 'bg-bg2'
      )}
    >
      <div className='region max-region:flex max-region:max-w-[700px] max-region:flex-col mx-auto grid grid-cols-[96px_1fr_280px] items-start gap-6 max-md:items-center md:gap-8'>
        <time
          className='text-fn2 order-1 w-fit font-mono text-2xl font-light tabular-nums md:text-3xl'
          dateTime={year.toString()}
        >
          {year}
        </time>

        <div className='order-2 flex min-w-0 flex-col gap-5'>
          <div className='flex flex-col gap-2 max-md:items-center max-md:text-center'>
            <h3 className='text-pretty max-w-[420px] text-xl font-semibold tracking-tight md:text-2xl'>{position}</h3>
            <Button
              href={websiteUrl}
              target='_blank'
              rel='noopener noreferrer'
              variant='link'
              className='text-fn2 hover:text-fn1 font-mono text-sm'
              aria-label={`Visitar sitio de ${name}`}
            >
              <ArrowUpRightIcon className='size-4 max-sm:hidden' aria-hidden />
              {name}
            </Button>
          </div>

          <div className='relative'>
            <ul
              className={cn(
                'text-fn2 flex max-h-[96px] list-disc flex-col gap-2.5 overflow-hidden pl-5 font-mono text-sm leading-relaxed',
                more && 'max-h-none overflow-visible'
              )}
            >
              {Activities}
            </ul>
            {!more && (
              <div
                aria-hidden
                className='from-bg1 group-hover:from-bg2 pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t to-transparent'
              />
            )}
          </div>

          {more && Extra && (
            <ul className='text-fn2 flex list-disc flex-col gap-2.5 pl-5 font-mono text-sm leading-relaxed'>{Extra}</ul>
          )}
        </div>

        <div className='order-3 flex h-fit w-full flex-col gap-4 max-md:items-center max-md:text-center'>
          <div className='flex flex-wrap gap-2 max-md:justify-center'>
            {listOfTools.map(tool => (
              <Chip key={`${tool}-${name}`} className='pointer-events-none text-xs'>
                {tool}
              </Chip>
            ))}
            {!more && usedTools.length > 5 && (
              <Chip className='pointer-events-none text-xs'>+{usedTools.length - 5}</Chip>
            )}
          </div>

          {more && (
            <time className='text-fn2 px-1 font-mono text-xs tracking-wide' dateTime={period.toString()}>
              {period}
            </time>
          )}

          {more && (facebookUrl || externalUrl) && (
            <div className='flex flex-wrap gap-1 max-md:justify-center'>
              {facebookUrl && (
                <Button
                  href={facebookUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='outline'
                  className='text-fn2 px-3'
                  aria-label={`Red social de ${name}`}
                >
                  <Share2Icon aria-hidden />
                </Button>
              )}
              {externalUrl && (
                <Button
                  href={externalUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='outline'
                  className='text-fn2 px-3'
                  aria-label={`Sitio externo de ${name}`}
                >
                  <GlobeIcon aria-hidden />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobExperience
