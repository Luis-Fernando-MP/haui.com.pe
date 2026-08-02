'use client'

import Button from '@common/components/button'
import Chip from '@common/components/chip'
import Image from '@common/components/image'
import { cn } from '@common/core/cn'
import { HistoryJob } from '@common/core/constants/historyJobs'
import { BriefcaseIcon, CalendarIcon, ChevronDownIcon, GlobeIcon, Share2Icon } from 'lucide-react'
import { motion } from 'motion/react'
import type { FC, KeyboardEvent, MouseEvent } from 'react'

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

  const handleToggle = (e: MouseEvent<HTMLElement>): void => {
    if ((e.target as HTMLElement).closest('a,button')) return
    setSelectedJob(name)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>): void => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()
    setSelectedJob(name)
  }

  return (
    <article
      role='button'
      tabIndex={0}
      aria-expanded={more}
      aria-label={`${position} en ${name}. ${more ? 'Contraer' : 'Expandir'} detalles`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={cn(
        'bg-bg1/30 border-bg3/50 relative w-full cursor-pointer rounded-2xl border p-4 transition-all duration-300 outline-none md:p-6',
        'hover:border-bg3 hover:bg-bg2/20',
        'focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 focus-visible:ring-2 focus-visible:ring-offset-2',
        more && 'border-fn2/15 bg-bg2/30'
      )}
    >
      <div className='flex w-full items-start justify-between gap-4 md:items-center'>
        <div className='flex min-w-0 flex-1 flex-col items-start gap-3 md:flex-row md:items-center md:gap-4'>
          <div className='bg-bg2 border-bg3/50 flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border p-2 md:size-12'>
            <Image
              src={logo}
              alt={`Logo de ${name}`}
              width={40}
              height={40}
              objectFit='contain'
              className='size-full object-contain'
            />
          </div>

          <div className='flex min-w-0 flex-col gap-0.5'>
            <h3 className='text-fn1 text-base leading-snug font-bold tracking-tight text-pretty md:text-lg'>{position}</h3>
            <div className='text-fn2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs md:text-sm'>
              <Button
                href={websiteUrl}
                target='_blank'
                rel='noopener noreferrer'
                variant='link'
                showIconLink
                className='text-fn2 hover:text-fn1 h-auto min-h-0 px-0 text-left text-xs font-semibold whitespace-normal transition-colors md:text-sm'
                aria-label={`Visitar sitio de ${name}`}
              >
                {name}
              </Button>
              <span className='text-fn2/30' aria-hidden>
                ·
              </span>
              <span className='text-fn2/80 flex items-center gap-1 text-[11px] font-medium md:text-xs'>
                <CalendarIcon className='size-3' />
                {period}
              </span>
            </div>

            {!more && (
              <div className='mt-1.5 flex flex-wrap gap-1'>
                {usedTools.slice(0, 4).map(tool => (
                  <span
                    key={`${tool}-preview-${name}`}
                    className='bg-bg2/50 text-fn2/80 rounded-md px-1.5 py-0.5 text-[10px] font-medium md:text-[11px]'
                  >
                    {tool}
                  </span>
                ))}
                {usedTools.length > 4 && (
                  <span className='bg-bg2/30 text-fn2/60 rounded-md px-1.5 py-0.5 text-[10px] font-medium md:text-[11px]'>
                    +{usedTools.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className='flex shrink-0 items-center gap-3 pt-1 md:pt-0'>
          <span className='bg-bg2/40 text-fn2 hidden rounded-lg px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider sm:inline-block md:text-xs'>
            {year}
          </span>

          <Button
            variant='ghost'
            size='icon'
            className='text-fn2 hover:text-fn1 hover:bg-bg2/50 size-8 rounded-full'
            onClick={e => {
              e.stopPropagation()
              setSelectedJob(name)
            }}
            aria-label={more ? 'Contraer detalles' : 'Expandir detalles'}
          >
            <motion.span
              animate={{ rotate: more ? 180 : 0 }}
              transition={{ duration: 0.25, ease }}
              className='flex items-center justify-center'
              aria-hidden
            >
              <ChevronDownIcon className='size-4' />
            </motion.span>
          </Button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: more ? 'auto' : 0, opacity: more ? 1 : 0 }}
        transition={{ duration: 0.35, ease }}
        className='overflow-hidden'
      >
        <div className='border-bg3/30 mt-4 grid grid-cols-1 gap-6 border-t pt-4 md:grid-cols-[1.6fr_1fr] md:gap-8'>
          <div className='flex flex-col gap-3'>
            <h4 className='text-fn2/60 flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider uppercase'>
              <BriefcaseIcon className='size-3.5' />
              Logros y Actividades
            </h4>
            <ul className='text-fn2 marker:text-via [&_strong]:text-fn1 list-outside list-disc space-y-3 pl-5 text-sm leading-relaxed md:text-base [&_strong]:font-semibold'>
              {Activities}
            </ul>
          </div>

          <div className='flex flex-col gap-6'>
            {Extra != null && (
              <div className='bg-bg2/30 border-bg3/30 flex flex-col gap-3 rounded-xl border p-4'>
                <h4 className='text-fn2/60 font-mono text-xs font-bold tracking-wider uppercase'>Contexto y Aprendizaje</h4>
                <ul className='text-fn2 marker:text-fn2/50 [&_strong]:text-fn1 list-outside list-disc space-y-3 pl-5 text-xs leading-relaxed md:text-sm [&_strong]:font-medium'>
                  {Extra}
                </ul>
              </div>
            )}

            <div className='flex flex-col gap-2.5'>
              <h4 className='text-fn2/60 font-mono text-xs font-bold tracking-wider uppercase'>Tecnologías y Herramientas</h4>
              <div className='flex flex-wrap gap-1.5'>
                {usedTools.map(tool => (
                  <Chip key={`${tool}-${name}`} className='pointer-events-none rounded-md px-2.5 py-0.5 text-xs font-medium'>
                    {tool}
                  </Chip>
                ))}
              </div>
            </div>

            {((facebookUrl != null && facebookUrl.length > 0) || (externalUrl != null && externalUrl.length > 0)) && (
              <div className='flex flex-col gap-2.5'>
                <h4 className='text-fn2/60 font-mono text-xs font-bold tracking-wider uppercase'>Enlaces de Interés</h4>
                <div className='flex flex-wrap gap-2'>
                  {facebookUrl != null && facebookUrl.length > 0 && (
                    <Button
                      href={facebookUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      variant='outline'
                      size='sm'
                      className='gap-1.5 rounded-lg text-xs font-medium'
                    >
                      <Share2Icon className='size-3.5' />
                      Red Social
                    </Button>
                  )}
                  {externalUrl != null && externalUrl.length > 0 && (
                    <Button
                      href={externalUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      variant='outline'
                      size='sm'
                      className='gap-1.5 rounded-lg text-xs font-medium'
                    >
                      <GlobeIcon className='size-3.5' />
                      Sitio Externo
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
