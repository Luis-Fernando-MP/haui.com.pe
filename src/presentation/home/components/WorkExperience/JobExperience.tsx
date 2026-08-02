'use client'

import { cn } from '@common/core/cn'
import { HistoryJob } from '@common/core/constants/historyJobs'
import Button from '@common/components/button'
import { ArrowUpRightIcon, GlobeIcon, Share2Icon } from 'lucide-react'
import Link from 'next/link'
import { type FC, type MouseEvent } from 'react'

import useJobExperienceStore from '../../store/useJobExperience'

interface JobExperienceProps {
  job: HistoryJob
}

const JobExperience: FC<JobExperienceProps> = ({ job }) => {
  const selectedJob = useJobExperienceStore(s => s.selectedJob)
  const setSelectedJob = useJobExperienceStore(s => s.setSelectedJob)

  const { year, name, position, websiteUrl, facebookUrl, externalUrl, Activities, usedTools, Extra, period } = job

  const more = selectedJob === name

  const handleToggle = (e: MouseEvent<HTMLLIElement>): void => {
    const target = e.target as HTMLElement
    if (target.closest('a')) return
    setSelectedJob(name)
  }

  const listOfTools = more ? usedTools : usedTools.slice(0, 5)

  return (
    <li
      className={cn('border-bg3 mt-0 w-full border-b py-10 last:border-b-0 md:py-12', more && 'bg-bg2')}
      onClick={handleToggle}
      aria-expanded={more}
      role='button'
    >
      <div className='region max-region:max-w-[700px] max-region:flex max-region:flex-col mx-auto grid grid-cols-[100px_1fr_300px] gap-6 max-md:items-center md:gap-8'>
        <time className='text-h2 text-fn2 order-1 w-fit font-mono font-light' dateTime={year.toString()}>
          {year}
        </time>

        <section className='order-2 flex w-fit flex-col gap-6'>
          <div className='flex flex-col gap-2.5 max-md:items-center max-md:text-center'>
            <h2 className='max-w-[400px] text-2xl font-medium max-sm:text-xl'>{position}</h2>
            <Link
              href={websiteUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-fn2 flex w-fit items-center justify-center gap-2 font-mono underline-offset-4 hover:underline'
              aria-label={`Visitar sitio de ${name}`}
            >
              <ArrowUpRightIcon className='max-sm:hidden' />
              <h5 className='max-sm:underline'>{name}</h5>
            </Link>
          </div>

          <ul
            className={cn(
              'text-fn2 relative flex max-h-[100px] list-disc flex-col gap-3.5 overflow-y-clip pl-6 font-mono',
              more && 'max-h-max'
            )}
          >
            {Activities}
            {!more && (
              <div className='from-bg1 pointer-events-none absolute bottom-0 left-0 h-[50px] w-full bg-gradient-to-t from-0% to-transparent to-70%'></div>
            )}
          </ul>

          {more && (
            <ul className='text-fn2 relative flex max-h-max list-disc flex-col gap-3.5 overflow-y-clip pl-6 font-mono'>
              {Extra}
            </ul>
          )}
        </section>

        <section className='order-3 flex h-fit w-fit flex-col gap-6 max-md:text-center'>
          <div className='flex flex-wrap gap-3.5 max-md:items-center max-md:justify-center'>
            {listOfTools.map(tool => (
              <Button className='text-fn2' key={`${tool}-${name}`}>
                {tool}
              </Button>
            ))}
            {!more && usedTools.length > 5 && (
              <Button className='text-fn2' variant='border'>
                +{usedTools.length - 5}
              </Button>
            )}
          </div>

          {more && (
            <time className='text-h5 text-fn2 px-4 font-mono' dateTime={period.toString()}>
              {period}
            </time>
          )}

          {more && (
            <div className='flex flex-wrap gap-1 max-md:justify-center'>
              {facebookUrl && (
                <Button
                  href={facebookUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-fn2'
                  aria-label={`Visitar Facebook de ${name}`}
                >
                  <Share2Icon />
                </Button>
              )}

              {externalUrl && (
                <Button
                  href={externalUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-fn2'
                  aria-label={`Visitar sitio de ${name}`}
                >
                  <GlobeIcon />
                </Button>
              )}
            </div>
          )}
        </section>
      </div>
    </li>
  )
}

export default JobExperience
