'use client'

import Button from '@common/components/button'
import Chip from '@common/components/chip'
import Image from '@common/components/image'
import { cn } from '@common/core/cn'
import { HistoryJob } from '@common/core/data/historyJobs'
import { BriefcaseIcon, CalendarIcon, ChevronDownIcon, GlobeIcon, Share2Icon } from 'lucide-react'
import { motion } from 'motion/react'
import type { FC } from 'react'

import useJobExperienceStore from '../../store/useJobExperience'

interface Props {
  job: HistoryJob
}

const ease = [0.22, 1, 0.36, 1] as const

const JobExperience: FC<Props> = ({ job }) => {
  const selectedJob = useJobExperienceStore(s => s.selectedJob)
  const setSelectedJob = useJobExperienceStore(s => s.setSelectedJob)

  const { year, name, position, websiteUrl, facebookUrl, externalUrl, Activities, usedTools, Extra, period, logo } = job
  const more = selectedJob === name

  return (
    <article
      className={cn(
        'bg-bg1/40 border-bg3/50 relative w-full min-w-0 rounded-2xl border p-4 transition-colors duration-300 md:p-6',
        'hover:border-bg3 hover:bg-bg2/20',
        more && 'border-fn2/15 bg-bg2/30'
      )}
    >
      <div className='flex w-full min-w-0 flex-col gap-3 md:flex-row md:items-center md:gap-4'>
        <div className='flex items-center justify-between gap-3 md:contents'>
          <div className='bg-bg2 border-bg3/50 flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border p-2 md:size-12'>
            <Image
              src={logo}
              alt={`Logo de ${name}`}
              width={40}
              height={40}
              layout='fixed'
              unstyled
              objectFit='contain'
              className='size-full object-contain'
            />
          </div>

          <div className='flex shrink-0 items-center gap-1.5 md:order-last'>
            <span className='type-caption bg-bg2/50 text-fn2 rounded-md px-2.5 py-1 font-mono font-semibold tracking-wider'>
              {year}
            </span>
            <Button
              variant='ghost'
              size='icon'
              className='text-fn2 hover:text-fn1 hover:bg-bg2/50 size-11 rounded-full'
              onClick={() => setSelectedJob(name)}
              aria-expanded={more}
              aria-controls={`job-panel-${name}`}
              aria-label={more ? `Contraer detalles de ${position} en ${name}` : `Expandir detalles de ${position} en ${name}`}
            >
              <motion.span
                animate={{ rotate: more ? 180 : 0 }}
                transition={{ duration: 0.25, ease }}
                className='flex items-center justify-center motion-reduce:transition-none'
                aria-hidden
              >
                <ChevronDownIcon className='size-4' />
              </motion.span>
            </Button>
          </div>
        </div>

        <div className='flex w-full min-w-0 flex-col gap-1.5 md:w-auto md:max-w-none md:flex-1'>
          <button
            type='button'
            onClick={() => setSelectedJob(name)}
            aria-expanded={more}
            aria-controls={`job-panel-${name}`}
            className='focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 w-full min-w-0 rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
          >
            <h3 className='type-heading text-fn1 w-full text-pretty'>{position}</h3>
          </button>

          <div className='text-fn2 flex w-full min-w-0 flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-1.5 sm:gap-y-0.5'>
            <a
              href={websiteUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='type-link text-fn2 hover:text-fn1 w-full font-semibold underline-offset-2 transition-colors hover:underline sm:w-auto'
              aria-label={`Visitar sitio de ${name}`}
            >
              {name}
            </a>
            <span className='text-fn2/30 hidden sm:inline' aria-hidden>
              ·
            </span>
            <span className='type-caption text-fn2/80 inline-flex w-full min-w-0 items-center gap-1.5 font-medium sm:w-auto'>
              <CalendarIcon className='size-3 shrink-0' aria-hidden />
              <span className='min-w-0 text-pretty'>{period}</span>
            </span>
          </div>

          {!more && (
            <div className='mt-0.5 flex w-full flex-wrap gap-1'>
              {usedTools.slice(0, 3).map(tool => (
                <span
                  key={`${tool}-preview-${name}`}
                  className='type-caption bg-bg2/50 text-fn2/80 rounded-md px-1.5 py-0.5'
                >
                  {tool}
                </span>
              ))}
              {usedTools.length > 3 && (
                <span className='type-caption bg-bg2/30 text-fn2/60 rounded-md px-1.5 py-0.5'>
                  +{usedTools.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <motion.div
        id={`job-panel-${name}`}
        role='region'
        aria-label={`Detalles de ${position} en ${name}`}
        initial={false}
        animate={{ height: more ? 'auto' : 0, opacity: more ? 1 : 0 }}
        transition={{ duration: 0.35, ease }}
        className='overflow-hidden motion-reduce:transition-none'
        inert={!more}
      >
        <div className='border-bg3/30 mt-4 grid grid-cols-1 gap-5 border-t pt-4 md:grid-cols-[1.6fr_1fr] md:gap-8'>
          <div className='flex min-w-0 flex-col gap-2.5'>
            <h4 className='type-label text-fn2/60 flex items-center gap-1.5'>
              <BriefcaseIcon className='size-3.5 shrink-0' aria-hidden />
              Logros y Actividades
            </h4>
            <ul className='type-body text-fn2 marker:text-via [&_strong]:text-fn1 list-outside list-disc space-y-2.5 pl-4 [&_strong]:font-semibold'>
              {Activities}
            </ul>
          </div>

          <div className='flex min-w-0 flex-col gap-5'>
            {Extra != null && (
              <div className='bg-bg2/30 border-bg3/30 flex flex-col gap-2.5 rounded-xl border p-3.5 sm:p-4'>
                <h4 className='type-label text-fn2/60'>Contexto y Aprendizaje</h4>
                <ul className='type-body-sm text-fn2 marker:text-fn2/50 [&_strong]:text-fn1 list-outside list-disc space-y-2.5 pl-4 [&_strong]:font-medium'>
                  {Extra}
                </ul>
              </div>
            )}

            <div className='flex flex-col gap-2'>
              <h4 className='type-label text-fn2/60'>Tecnologías y Herramientas</h4>
              <div className='flex flex-wrap gap-1.5'>
                {usedTools.map(tool => (
                  <Chip key={`${tool}-${name}`} className='pointer-events-none rounded-md px-2 py-0.5 sm:px-2.5'>
                    {tool}
                  </Chip>
                ))}
              </div>
            </div>

            {((facebookUrl != null && facebookUrl.length > 0) || (externalUrl != null && externalUrl.length > 0)) && (
              <div className='flex flex-col gap-2'>
                <h4 className='type-label text-fn2/60'>Enlaces de Interés</h4>
                <div className='flex flex-wrap gap-2'>
                  {facebookUrl != null && facebookUrl.length > 0 && (
                    <Button
                      href={facebookUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      variant='outline'
                      size='sm'
                      className='min-h-11 gap-1.5 rounded-lg'
                    >
                      <Share2Icon className='size-3.5' aria-hidden />
                      <span>Red Social</span>
                    </Button>
                  )}
                  {externalUrl != null && externalUrl.length > 0 && (
                    <Button
                      href={externalUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      variant='outline'
                      size='sm'
                      className='min-h-11 gap-1.5 rounded-lg'
                    >
                      <GlobeIcon className='size-3.5' aria-hidden />
                      <span>Sitio Externo</span>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </article>
  )
}

export default JobExperience
