'use client'

import Button from '@common/components/button'
import Image from '@common/components/image'
import GithubIcon from '@common/icons/github'
import { cn } from '@common/core/cn'
import { ArrowUpRightIcon } from 'lucide-react'
import { motion } from 'motion/react'
import type { FC } from 'react'

import type { ProjectItem } from './ProjectsView'

const ease = [0.22, 1, 0.36, 1] as const

const CardProjects: FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
  const thumbs = project.images.slice(0, 2)
  const webHref = project.website?.trim()
  const gitHref = project.github?.trim()
  const tags = project.tags.slice(0, 5)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3), ease }}
      className={cn(
        'group border-bg3/60 bg-bg1 relative overflow-hidden rounded-2xl border',
        'transition-[border-color,box-shadow] duration-300',
        'hover:border-fn2/25 hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--fn2)_12%,transparent)]'
      )}
    >
      <div className='grid grid-cols-1 sm:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]'>
        <div className='relative aspect-[16/11] overflow-hidden sm:aspect-auto sm:min-h-[240px]'>
          <Image
            src={project.banner}
            alt={project.title}
            width={project.bannerWidth || 1200}
            height={project.bannerHeight || 900}
            className={cn(
              'absolute inset-0 size-full object-cover',
              'origin-center transform-gpu transition-transform duration-700 ease-out will-change-transform',
              'group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100'
            )}
          />
          <div
            aria-hidden
            className='from-bg1/90 via-bg1/20 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-bg1/40'
          />

          <div className='absolute top-3 left-3 flex flex-wrap gap-1.5'>
            {tags.slice(0, 2).map(t => (
              <span
                key={t}
                className='bg-bg1/85 text-fn2 border-bg3/80 rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wide backdrop-blur-sm'
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className='relative flex flex-col gap-4 p-5 md:p-6'>
          <div className='flex flex-col gap-2'>
            <h3 className='font-flowers text-fn1 text-3xl leading-none tracking-tight md:text-[2rem]'>{project.title}</h3>
            {project.summary.length > 0 && (
              <p className='text-fn2 line-clamp-3 text-sm leading-relaxed text-pretty md:line-clamp-4'>{project.summary}</p>
            )}
          </div>

          {tags.length > 0 && (
            <div className='flex flex-wrap gap-1.5'>
              {tags.map(t => (
                <span
                  key={`body-${t}`}
                  className='bg-bg2/70 text-fn2/90 rounded-md px-2 py-0.5 font-mono text-[11px] tracking-wide'
                >
                  {t}
                </span>
              ))}
              {project.tags.length > tags.length && (
                <span className='text-fn2/60 rounded-md px-1.5 py-0.5 font-mono text-[11px]'>
                  +{project.tags.length - tags.length}
                </span>
              )}
            </div>
          )}

          {thumbs.length > 0 && (
            <div className='flex gap-2'>
              {thumbs.map(src => (
                <div
                  key={src}
                  className='border-bg3/70 bg-bg2 relative size-12 overflow-hidden rounded-lg border sm:size-14'
                >
                  <Image src={src} alt='' width={112} height={112} className='size-full object-cover' />
                </div>
              ))}
            </div>
          )}

          <div className='mt-auto flex flex-wrap items-center gap-2 pt-1'>
            {webHref && (
              <Button
                href={webHref}
                target='_blank'
                rel='noopener noreferrer'
                size='sm'
                className='rounded-full'
                showIconLink
              >
                Abrir en web
              </Button>
            )}
            {gitHref && (
              <Button
                href={gitHref}
                target='_blank'
                rel='noopener noreferrer'
                variant='outline'
                size='sm'
                className='rounded-full gap-1.5'
              >
                <GithubIcon className='size-3.5' aria-hidden />
                Código
              </Button>
            )}
            {!webHref && !gitHref && (
              <span className='text-fn2 inline-flex items-center gap-1 font-mono text-xs'>
                <ArrowUpRightIcon className='size-3.5 opacity-50' aria-hidden />
                En construcción
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default CardProjects
