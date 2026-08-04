'use client'

import Button from '@common/components/button'
import Popup from '@common/components/popup'
import Title from '@common/components/title'
import { cn } from '@common/core/cn'
import { CheckIcon, PlusIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { type FC, type ReactNode, useState } from 'react'

import ProjectCard from './ProjectCard'

export type ProjectItem = {
  id: string
  title: string
  summary: string
  tags: string[]
  banner: string
  bannerWidth: number
  bannerHeight: number
  website?: string
  github?: string
  status?: string
  images: string[]
}

const TAG_LIMIT = 8
const ease = [0.22, 1, 0.36, 1] as const
const ALL = 'Todos'

const ProjectsView: FC<{ projects: ProjectItem[] }> = ({ projects }) => {
  const [tag, setTag] = useState(ALL)

  const tagCounts = new Map<string, number>()
  for (const project of projects) {
    for (const t of project.tags) {
      tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)
    }
  }

  const rankedTags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name]) => name)

  const principal = rankedTags.slice(0, TAG_LIMIT)
  const remaining = rankedTags.slice(TAG_LIMIT)
  const filtered =
    tag === ALL ? projects : projects.filter(p => p.tags.some(t => t.toLowerCase() === tag.toLowerCase()))

  return (
    <section id='projects' className='max-region:px-5 flex w-full scroll-mt-28 flex-col items-center gap-14 md:gap-20'>
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease }}
        className='region max-region:items-center max-region:text-center flex flex-col gap-4'
      >
        <p className='text-fn2 font-mono text-xs tracking-[0.2em] uppercase'>Trabajo seleccionado</p>
        <Title>
          Mis <span className='text-gradient'>Proyectos</span>
        </Title>
        <p className='text-fn2 max-w-[36rem] text-sm leading-relaxed text-pretty md:text-base'>
          Productos y sistemas construidos de extremo a extremo — diseño, interfaz y arquitectura en una sola pieza.
        </p>
      </motion.header>

      <div className='region mx-auto flex w-full flex-col gap-8 md:gap-10'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease }}
          className='border-bg3/50 flex flex-wrap items-center gap-x-1 gap-y-2 border-b pb-4'
        >
          <FilterPill active={tag === ALL} onClick={() => setTag(ALL)}>
            {ALL}
          </FilterPill>

          {principal.map(name => (
            <FilterPill key={name} active={tag === name} onClick={() => setTag(name)}>
              {name}
            </FilterPill>
          ))}

          {remaining.length > 0 && (
            <Popup>
              <Popup.Trigger asChild>
                <button
                  type='button'
                  aria-label='Más etiquetas'
                  className={cn(
                    'text-fn2 hover:text-fn1 inline-flex h-9 items-center gap-1 px-2.5 font-mono text-xs tracking-wide transition-colors duration-300 outline-none',
                    'focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2',
                    remaining.includes(tag) && 'text-fn1'
                  )}
                >
                  <PlusIcon className='size-3' aria-hidden />
                  Más
                </button>
              </Popup.Trigger>
              <Popup.Content align='start' className='w-52'>
                <Popup.Header>
                  <Popup.Title>Etiquetas</Popup.Title>
                  <Popup.Close />
                </Popup.Header>
                <div className='no-scrollbar flex max-h-52 flex-col gap-0.5 overflow-y-auto p-1.5'>
                  {remaining.map(name => (
                    <Button
                      key={name}
                      variant='ghost'
                      size='sm'
                      onClick={() => setTag(name)}
                      className={cn(
                        'h-8 w-full justify-between rounded-lg px-2.5 font-mono text-[11px]',
                        tag === name && 'bg-bg2 text-fn1',
                        tag !== name && 'text-fn2'
                      )}
                    >
                      <span>{name}</span>
                      {tag === name && <CheckIcon className='size-3.5' aria-hidden />}
                    </Button>
                  ))}
                </div>
              </Popup.Content>
            </Popup>
          )}

          <span className='text-fn2/60 ml-auto font-mono text-[11px] tracking-wide tabular-nums'>
            {filtered.length} proyectos
          </span>
        </motion.div>

        <AnimatePresence mode='wait' initial={false}>
          {filtered.length > 0 && (
            <motion.ul
              key={tag}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease }}
              className='flex flex-col gap-8 md:gap-10'
            >
              {filtered.map((project, i) => (
                <li key={project.id} className='list-none'>
                  <ProjectCard project={project} index={i} />
                </li>
              ))}
            </motion.ul>
          )}

          {filtered.length === 0 && (
            <motion.p
              key='empty'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='text-fn2 py-20 text-center font-mono text-sm'
            >
              Sin proyectos para este filtro
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

const FilterPill: FC<{ active: boolean; onClick: () => void; children: ReactNode }> = ({
  active,
  onClick,
  children
}) => (
  <button
    type='button'
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      'relative h-9 shrink-0 px-2.5 font-mono text-xs tracking-wide transition-colors duration-300 outline-none',
      'focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2',
      active && 'text-fn1',
      !active && 'text-fn2 hover:text-fn1'
    )}
  >
    {children}
    {active && (
      <motion.span
        layoutId='project-filter-line'
        className='bg-fn1 absolute inset-x-2.5 -bottom-4 h-px'
        transition={{ duration: 0.35, ease }}
      />
    )}
  </button>
)

export default ProjectsView
