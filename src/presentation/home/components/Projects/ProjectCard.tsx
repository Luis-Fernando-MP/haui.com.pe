'use client'

import Button from '@common/components/button'
import Chip from '@common/components/chip'
import { DateFormat } from '@common/components/DateFormat'
import ImageGallery from '@common/components/focus-gallery/ImageGallery'
import { cn } from '@common/core/cn'
import FigmaIcon from '@common/icons/figma'
import GithubIcon from '@common/icons/github'
import NotionIcon from '@common/icons/notion'
import { ClockIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import type { FC } from 'react'

import type { ProjectItem } from './ProjectsView'

const ease = [0.22, 1, 0.36, 1] as const

const ProjectCard: FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
  const webHref = project.website?.trim()
  const gitHref = project.github?.trim()
  const figmaHref = project.figma?.trim()
  const notionHref = project.notion?.trim()
  const tags = project.tags.slice(0, 4)
  const detailHref = `/project/${project.id}`
  const groupId = `project-${project.id}`
  const thumbs = project.images.slice(1, 4)
  const extraTags = project.tags.length - tags.length
  const bannerW = project.bannerWidth || 1500
  const bannerH = project.bannerHeight || 1125
  const bannerBackground = project.imageBlur || (project.imageHash?.startsWith('data:') ? project.imageHash : undefined)
  const readingMins =
    project.readingTime != null && project.readingTime > 0 ? Math.max(1, Math.round(project.readingTime)) : undefined

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.16), ease }}
      className={cn(
        'group/card border-bg3/50 bg-bg2/20 grid w-full overflow-hidden rounded-2xl border',
        'grid-cols-1 sm:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]',
        'transition-[border-color,background-color] duration-500 ease-out',
        'hover:bg-bg2 motion-reduce:transition-none'
      )}
    >
      <div className='bg-bg2 relative isolate aspect-[16/10] w-full overflow-hidden sm:aspect-auto sm:min-h-[16rem] sm:self-stretch'>
        <ImageGallery
          src={project.banner}
          alt={project.title}
          width={bannerW}
          height={bannerH}
          layout='fullWidth'
          unstyled
          objectFit='cover'
          background={bannerBackground}
          groupId={groupId}
          index={0}
          caption={`<p>${project.title}</p>`}
          action={detailHref}
          actionText='Ver proyecto'
          className={cn(
            'absolute inset-0 size-full object-cover object-center',
            'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            'group-hover/card:scale-[1.04]',
            'motion-reduce:transition-none motion-reduce:group-hover/card:scale-100'
          )}
        />

        <div
          aria-hidden
          className='from-bg1/40 pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent sm:hidden'
        />
        <div
          aria-hidden
          className='from-bg2/30 pointer-events-none absolute inset-y-0 right-0 hidden w-12 bg-gradient-to-l via-transparent to-transparent sm:block'
        />
      </div>

      <div className='flex min-w-0 flex-col gap-3.5 p-5 md:gap-4 md:p-6 lg:p-7'>
        <div className='text-fn2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-wide'>
          {readingMins != null && (
            <span className='inline-flex items-center gap-1'>
              <ClockIcon className='size-3' aria-hidden />
              {readingMins} min
            </span>
          )}

          {project.lastEditedTime && <DateFormat date={project.lastEditedTime} mode='relative' />}
        </div>

        <div className='flex items-start justify-between gap-3'>
          <Link
            href={detailHref}
            className='group/title focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 w-fit max-w-full rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
          >
            <h3 className='text-fn1 group-hover/title:text-fn2 text-xl leading-snug font-semibold tracking-tight transition-colors duration-300 md:text-2xl'>
              {project.title}
            </h3>
          </Link>

          <Button href={detailHref} variant='link' size='sm' showIconLink className='shrink-0'>
            Ver proyecto
          </Button>
        </div>

        {project.summary.length > 0 && (
          <p className='text-fn2 line-clamp-3 max-w-[42rem] text-sm leading-relaxed text-pretty'>{project.summary}</p>
        )}

        {tags.length > 0 && (
          <div className='flex flex-wrap gap-1.5'>
            {tags.map(tag => (
              <Chip key={tag}>{tag}</Chip>
            ))}
            {extraTags > 0 && <Chip>+{extraTags}</Chip>}
          </div>
        )}

        <div className='mt-auto flex flex-wrap items-end justify-between gap-3 pt-1'>
          {thumbs.length > 0 && (
            <ul className='flex gap-2' aria-label={`Capturas de ${project.title}`}>
              {thumbs.map((src, i) => (
                <li key={src} className='list-none'>
                  <ImageGallery
                    src={src}
                    alt=''
                    width={96}
                    height={72}
                    layout='fullWidth'
                    unstyled
                    objectFit='cover'
                    groupId={groupId}
                    index={i + 1}
                    className='h-12 w-16 shrink-0 rounded-xl object-cover transition-transform duration-300 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100'
                  />
                </li>
              ))}
            </ul>
          )}

          {thumbs.length === 0 && <span />}

          <div className='flex flex-wrap items-center gap-1.5'>
            {gitHref && (
              <Button
                href={gitHref}
                target='_blank'
                rel='noopener noreferrer'
                size='icon'
                variant='ghost'
                aria-label={`GitHub de ${project.title}`}
              >
                <GithubIcon className='size-4' />
              </Button>
            )}

            {figmaHref && (
              <Button
                href={figmaHref}
                target='_blank'
                rel='noopener noreferrer'
                size='icon'
                variant='ghost'
                aria-label={`Figma de ${project.title}`}
              >
                <FigmaIcon className='size-4' />
              </Button>
            )}

            {notionHref && (
              <Button
                href={notionHref}
                target='_blank'
                rel='noopener noreferrer'
                size='icon'
                variant='ghost'
                aria-label={`Notion de ${project.title}`}
              >
                <NotionIcon className='size-4' />
              </Button>
            )}

            {webHref && (
              <Button href={webHref} target='_blank' rel='noopener noreferrer' size='sm' showIconLink>
                Probar aplicación
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
