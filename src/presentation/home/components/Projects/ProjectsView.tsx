'use client'

import Button from '@common/components/button'
import Chip from '@common/components/chip'
import Popup from '@common/components/popup'
import Title from '@common/components/title'
import { CheckIcon, PlusIcon, XIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { type FC, useState } from 'react'

import ProjectCard from './ProjectCard'

export type ProjectItem = {
  id: string
  title: string
  summary: string
  tags: string[]
  banner: string
  bannerWidth: number
  bannerHeight: number
  imageHash?: string
  readingTime?: number
  lastEditedTime?: string
  website?: string
  github?: string
  figma?: string
  notion?: string
  status?: string
  images: string[]
}

const TAG_LIMIT = 8
const ease = [0.22, 1, 0.36, 1] as const
const ALL = 'Todos'

const ProjectsView: FC<{ projects: ProjectItem[] }> = ({ projects }) => {
  const [selected, setSelected] = useState<string[]>([])

  const tagCounts = new Map<string, number>()
  for (const project of projects) {
    for (const t of project.tags) {
      tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)
    }
  }

  const rankedTags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([name]) => name)

  const principal = rankedTags.slice(0, TAG_LIMIT)
  const remaining = rankedTags.slice(TAG_LIMIT)
  const selectedSet = new Set(selected.map(t => t.toLowerCase()))
  const filtered =
    selected.length === 0 ? projects : projects.filter(p => p.tags.some(t => selectedSet.has(t.toLowerCase())))

  const toggleTag = (name: string) => {
    setSelected(prev => {
      if (prev.some(t => t.toLowerCase() === name.toLowerCase())) {
        return prev.filter(t => t.toLowerCase() !== name.toLowerCase())
      }
      return [...prev, name]
    })
  }

  const isActive = (name: string) => selectedSet.has(name.toLowerCase())
  const filterKey = selected.length === 0 ? ALL : selected.toSorted((a, b) => a.localeCompare(b)).join('|')
  const hasFilters = selected.length > 0
  const moreActive = remaining.some(isActive)

  return (
    <section id='projects' className='max-region:px-5 flex w-full scroll-mt-28 flex-col items-center gap-12 md:gap-16'>
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease }}
        className='region max-region:items-center max-region:text-center flex flex-col gap-3'
      >
        <p className='text-fn2 font-mono text-xs tracking-[0.2em] uppercase'>Trabajo seleccionado</p>
        <Title>
          Mis <span className='text-gradient'>Proyectos</span>
        </Title>
        <p className='text-fn2 max-w-[36rem] text-sm leading-relaxed text-pretty md:text-base'>
          Productos y sistemas construidos de extremo a extremo — diseño, interfaz y arquitectura en una sola pieza.
        </p>
      </motion.header>

      <div className='region mx-auto flex w-full flex-col gap-6'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, ease }}
          className='flex flex-wrap items-center gap-1.5'
          role='group'
          aria-label='Filtros de proyectos'
        >
          <Chip active={!hasFilters} onClick={() => setSelected([])}>
            {ALL}
          </Chip>

          {principal.map(name => {
            const on = isActive(name)
            return (
              <Chip key={name} active={on} onClick={() => toggleTag(name)}>
                {on && <CheckIcon className='size-3' strokeWidth={2.5} aria-hidden />}
                {name}
              </Chip>
            )
          })}

          {remaining.length > 0 && (
            <Popup>
              <Popup.Trigger asChild>
                <Button size='sm' variant={moreActive ? 'default' : 'outline'} aria-label='Más etiquetas'>
                  <PlusIcon className='size-3.5' aria-hidden />
                  Más
                </Button>
              </Popup.Trigger>
              <Popup.Content align='start' className='w-64'>
                <Popup.Header>
                  <Popup.Title>Etiquetas</Popup.Title>
                  <Popup.Close />
                </Popup.Header>
                <div className='no-scrollbar flex max-h-52 flex-wrap gap-1.5 overflow-y-auto p-2.5'>
                  {remaining.map(name => {
                    const on = isActive(name)
                    return (
                      <Chip key={name} active={on} onClick={() => toggleTag(name)}>
                        {on && <CheckIcon className='size-3' strokeWidth={2.5} aria-hidden />}
                        {name}
                      </Chip>
                    )
                  })}
                </div>
              </Popup.Content>
            </Popup>
          )}

          {hasFilters && (
            <Button size='sm' status='danger' onClick={() => setSelected([])} className='ml-auto'>
              <XIcon className='size-3.5' aria-hidden />
              Limpiar
            </Button>
          )}
        </motion.div>

        <AnimatePresence mode='wait' initial={false}>
          {filtered.length > 0 && (
            <motion.ul
              key={filterKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease }}
              className='flex flex-col gap-6 md:gap-8'
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
              className='text-fn2 py-12 text-center font-mono text-sm'
            >
              Sin proyectos para estos filtros
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ProjectsView
