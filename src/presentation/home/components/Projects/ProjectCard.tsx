'use client'

import Button from '@common/components/button'
import ImageGallery from '@common/components/focus-gallery/ImageGallery'
import { cn } from '@common/core/cn'
import FigmaIcon from '@common/icons/figma'
import GithubIcon from '@common/icons/github'
import NotionIcon from '@common/icons/notion'
import { ClockIcon, ExternalLinkIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import type { FC, MouseEvent, ReactNode } from 'react'

import type { ProjectItem } from './ProjectsView'

const ease = [0.22, 1, 0.36, 1] as const

const ProjectCard: FC<{ project: ProjectItem; index: number; featured?: boolean }> = ({ project, index, featured = false }) => {
  const {
    website,
    github,
    figma,
    notion,
    readingTime,
    tags,
    banner,
    bannerWidth,
    bannerHeight,
    imageBlur,
    imageHash,
    title,
    summary,
    id
  } = project
  const readingMins = readingTime != null && readingTime > 0 ? Math.max(1, Math.round(readingTime)) : undefined

  const detailHref = `/project/${id}`
  const bannerBg = imageBlur || (imageHash?.startsWith('data:') ? imageHash : undefined)
  const visibleTags = tags.slice(0, featured ? 5 : 3)
  const hasSummary = featured && summary.trim().length > 0

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.24), ease }}
      className='group/card border-bg3 bg-bg2 hover:border-bg3 hover:bg-bg2 relative h-full min-h-[260px] w-full overflow-hidden rounded-xl border-[1.5px] transition-colors duration-500 sm:min-h-[280px]'
    >
      <ImageGallery
        src={banner}
        alt={title}
        width={bannerWidth || 1500}
        height={bannerHeight || 1125}
        layout='fullWidth'
        unstyled
        objectFit='cover'
        background={bannerBg}
        groupId={`project-${id}`}
        index={0}
        caption={`<p>${title}</p>`}
        action={detailHref}
        actionText='Ver proyecto'
        className='absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100'
      />

      <div
        aria-hidden
        className='from-bg1 via-bg1/50 pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t to-transparent'
      />

      <div className='absolute top-3 right-3 left-3 flex flex-wrap items-start justify-between gap-2 sm:top-4 sm:right-4 sm:left-4'>
        <div className='flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2'>
          {website && (
            <Button href={website} target='_blank' rel='noopener noreferrer' size='sm' variant='secondary' onClick={stop} className='min-h-11'>
              <ExternalLinkIcon className='size-3.5' aria-hidden />
              Demo
            </Button>
          )}
          {readingMins != null && (
            <span className='type-caption bg-bg2 text-fn1 flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 font-medium'>
              <ClockIcon className='size-3' aria-hidden />
              {readingMins} min
            </span>
          )}
        </div>
        <div className='flex shrink-0 gap-1'>
          {github && (
            <IconBtn href={github} label='GitHub'>
              <GithubIcon className='size-4' />
            </IconBtn>
          )}
          {figma && (
            <IconBtn href={figma} label='Figma'>
              <FigmaIcon className='size-4' />
            </IconBtn>
          )}
          {notion && (
            <IconBtn href={notion} label='Notion'>
              <NotionIcon className='size-4' />
            </IconBtn>
          )}
        </div>
      </div>

      <div className='absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4 sm:p-5 md:p-6'>
        {visibleTags.length > 0 && (
          <div className='flex flex-wrap gap-1.5'>
            {visibleTags.map(t => (
              <span key={t} className='type-caption bg-bg2 text-fn1 max-w-full truncate rounded-full px-2.5 py-1 font-medium'>
                {t}
              </span>
            ))}
          </div>
        )}

        <Link href={detailHref} className='focus-visible:ring-fnA/50 w-fit max-w-full rounded-sm outline-none focus-visible:ring-2'>
          <h3
            className={cn(
              'text-fn1 hover:text-fnA text-balance break-words tracking-tight transition-colors duration-300',
              featured ? 'type-display-sm' : 'type-heading'
            )}
          >
            {title}
          </h3>
        </Link>
        {hasSummary && <p className='type-lead text-fn2 line-clamp-2 max-w-xl text-pretty'>{summary}</p>}
      </div>
    </motion.article>
  )
}

const stop = (e: MouseEvent) => e.stopPropagation()

const IconBtn: FC<{ href: string; label: string; children: ReactNode }> = ({ href, label, children }) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    aria-label={label}
    onClick={stop}
    className='bg-bg2 text-fn1 hover:bg-bg3 focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 flex size-11 items-center justify-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
  >
    {children}
  </a>
)

export default ProjectCard
