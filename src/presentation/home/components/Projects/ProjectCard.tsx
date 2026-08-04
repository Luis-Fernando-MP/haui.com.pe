'use client'

import Button from '@common/components/button'
import ImageGallery from '@common/components/focus-gallery/ImageGallery'
import GithubIcon from '@common/icons/github'
import { cn } from '@common/core/cn'
import { motion } from 'motion/react'
import Link from 'next/link'
import type { FC } from 'react'

import type { ProjectItem } from './ProjectsView'

const ease = [0.22, 1, 0.36, 1] as const

const ProjectCard: FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
  const webHref = project.website?.trim()
  const gitHref = project.github?.trim()
  const tags = project.tags.slice(0, 4)
  const detailHref = `/project/${project.id}`
  const groupId = `project-${project.id}`
  const thumbs = project.images.slice(1, 4)
  const order = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.16), ease }}
      className='group/card grid w-full grid-cols-1 gap-4 sm:grid-cols-[minmax(0,11.5rem)_minmax(0,1fr)] sm:gap-5 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-6 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]'
    >
      <div
        className={cn(
          'bg-bg2/30 relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-bg3/40 sm:aspect-auto sm:min-h-[8.5rem] sm:self-stretch',
          'transition-colors duration-500 ease-out motion-reduce:transition-none',
          'group-hover/card:border-fn2/25'
        )}
      >
        <ImageGallery
          src={project.banner}
          alt={project.title}
          width={project.bannerWidth || 1200}
          height={project.bannerHeight || 900}
          groupId={groupId}
          index={0}
          caption={`<p>${project.title}</p>`}
          action={detailHref}
          actionText='Ver proyecto'
          className={cn(
            'absolute inset-0 size-full object-cover',
            'opacity-[0.96] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            'group-hover/card:opacity-100 group-hover/card:scale-[1.02]',
            'motion-reduce:transition-none motion-reduce:group-hover/card:scale-100'
          )}
        />
      </div>

      <div className='flex min-w-0 flex-col gap-2.5 md:gap-3'>
        <div className='flex items-baseline justify-between gap-3'>
          <div className='text-fn2 flex min-w-0 items-baseline gap-2 font-mono text-[11px] tracking-wide'>
            <span className='text-fn2/45 tabular-nums'>{order}</span>
            {project.status && <span className='truncate'>{project.status}</span>}
          </div>

          <Link
            href={detailHref}
            className={cn(
              'text-fn2 hover:text-fn1 group/link inline-flex shrink-0 items-center gap-1 font-mono text-[11px] tracking-wide',
              'transition-colors duration-300 outline-none',
              'focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2'
            )}
          >
            Ver caso
            <span
              aria-hidden
              className='inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-0.5 motion-reduce:transition-none'
            >
              →
            </span>
          </Link>
        </div>

        <Link
          href={detailHref}
          className='group/title focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 w-fit rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
        >
          <h3 className='text-fn1 text-lg leading-snug font-semibold tracking-tight transition-opacity duration-300 group-hover/title:opacity-70 md:text-xl'>
            {project.title}
          </h3>
        </Link>

        {project.summary.length > 0 && (
          <p className='text-fn2 line-clamp-2 text-sm leading-relaxed text-pretty'>{project.summary}</p>
        )}

        {tags.length > 0 && (
          <p className='text-fn2/70 font-mono text-[10px] tracking-wide'>
            {tags.join(' · ')}
            {project.tags.length > tags.length && ` · +${project.tags.length - tags.length}`}
          </p>
        )}

        <div className='mt-auto flex flex-wrap items-center gap-2 pt-0.5'>
          {thumbs.length > 0 && (
            <ul className='flex gap-1.5' aria-label={`Capturas de ${project.title}`}>
              {thumbs.map((src, i) => (
                <li key={src} className='list-none'>
                  <ImageGallery
                    src={src}
                    alt=''
                    width={56}
                    height={56}
                    groupId={groupId}
                    index={i + 1}
                    caption={`<p>${project.title}</p>`}
                    action={detailHref}
                    actionText='Ver proyecto'
                    className={cn(
                      'border-bg3/50 bg-bg2 size-9 shrink-0 rounded-lg border object-cover',
                      'opacity-90 transition-opacity duration-500 hover:opacity-100'
                    )}
                  />
                </li>
              ))}
            </ul>
          )}

          <div className='ml-auto flex flex-wrap items-center gap-1.5'>
            <Button href={detailHref} size='sm' variant='outline' className='h-7 rounded-full px-2.5 text-xs' showIconLink>
              Ver
            </Button>

            {webHref && (
              <Button
                href={webHref}
                target='_blank'
                rel='noopener noreferrer'
                variant='ghost'
                size='sm'
                className='h-7 rounded-full px-2.5 text-xs'
                showIconLink
              >
                Sitio
              </Button>
            )}

            {gitHref && (
              <Button
                href={gitHref}
                target='_blank'
                rel='noopener noreferrer'
                variant='ghost'
                size='icon'
                className='size-7 rounded-full'
                aria-label={`Código de ${project.title}`}
              >
                <GithubIcon className='size-3.5' aria-hidden />
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
