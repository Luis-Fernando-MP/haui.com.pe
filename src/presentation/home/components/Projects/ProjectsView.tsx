'use client'

import Button from '@common/components/button'
import Chip from '@common/components/chip'
import Title from '@common/components/title'
import { cn } from '@common/core/cn'
import { CheckIcon, FilterIcon, XIcon } from 'lucide-react'
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
  imageBlur?: string
  website?: string
  github?: string
  figma?: string
  notion?: string
  readingTime?: number
}

const ease = [0.22, 1, 0.36, 1] as const

const ProjectsView: FC<{ projects: ProjectItem[] }> = ({ projects }) => {
  const [selected, setSelected] = useState<string[]>([])

  const tagSet = new Set<string>()
  for (const p of projects) for (const t of p.tags) tagSet.add(t)
  const tags = [...tagSet].sort((a, b) => a.localeCompare(b))

  const selectedLower = new Set(selected.map(t => t.toLowerCase()))
  const filtered = selected.length === 0 ? projects : projects.filter(p => p.tags.some(t => selectedLower.has(t.toLowerCase())))
  const hasFilters = selected.length > 0

  const toggle = (name: string) => {
    const lower = name.toLowerCase()
    setSelected(prev =>
      prev.some(t => t.toLowerCase() === lower) ? prev.filter(t => t.toLowerCase() !== lower) : [...prev, name]
    )
  }

  const isActive = (name: string) => selectedLower.has(name.toLowerCase())

  return (
    <section
      id='projects'
      className='max-region:px-5 flex w-full min-w-0 scroll-mt-24 flex-col items-center gap-8 sm:scroll-mt-28 sm:gap-10 md:gap-14'
    >
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease }}
        className='region max-region:items-center max-region:text-center flex w-full min-w-0 flex-col gap-3'
      >
        <p className='type-label text-fn2'>Trabajo seleccionado</p>
        <Title>
          Mis <span className='text-gradient'>Proyectos</span>
        </Title>
        <p className='type-lead text-fn2 max-w-[36rem] text-pretty'>
          Productos y sistemas construidos de extremo a extremo — diseño, interfaz y arquitectura en una sola pieza.
        </p>
      </motion.header>

      <div className='region mx-auto flex w-full flex-col gap-6 lg:flex-row lg:gap-10'>
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease }}
          className='hidden w-48 shrink-0 lg:block'
        >
          <div className='sticky top-28'>
            <div className='mb-4 flex items-center justify-between gap-2'>
              <span className='type-body-sm text-fn1 flex items-center gap-2 font-medium'>
                <FilterIcon className='size-4' aria-hidden />
                Filtros
              </span>
              {hasFilters && (
                <Button size='sm' status='danger' variant='ghost' onClick={() => setSelected([])}>
                  Limpiar
                </Button>
              )}
            </div>

            <nav className='flex flex-col gap-1' role='group' aria-label='Filtros de proyectos'>
              <Button
                variant={!hasFilters ? 'default' : 'ghost'}
                aria-pressed={!hasFilters}
                onClick={() => setSelected([])}
                center={false}
                className={cn(
                  'min-h-11 w-full justify-start gap-2 rounded-lg px-3',
                  hasFilters && 'text-fn2 hover:text-fn1'
                )}
              >
                Todos
              </Button>
              {tags.map(name => {
                const active = isActive(name)
                return (
                  <Button
                    key={name}
                    variant={active ? 'default' : 'ghost'}
                    aria-pressed={active}
                    onClick={() => toggle(name)}
                    center={false}
                    className={cn(
                      'min-h-11 w-full justify-start gap-2 rounded-lg px-3',
                      !active && 'text-fn2 hover:text-fn1'
                    )}
                  >
                    {active && <CheckIcon className='size-3.5 shrink-0' strokeWidth={2.5} aria-hidden />}
                    <span className='truncate'>{name}</span>
                  </Button>
                )
              })}
            </nav>
          </div>
        </motion.aside>

        <div className='flex min-w-0 w-full flex-1 flex-col gap-4'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, ease }}
            className='flex w-full flex-wrap items-center gap-2 lg:hidden'
            role='group'
            aria-label='Filtros de proyectos'
          >
            <Chip active={!hasFilters} onClick={() => setSelected([])}>
              Todos
            </Chip>
            {tags.map(name => (
              <Chip key={name} active={isActive(name)} onClick={() => toggle(name)}>
                {isActive(name) && <CheckIcon className='size-3 shrink-0' strokeWidth={2.5} aria-hidden />}
                <span className='max-w-[10rem] truncate'>{name}</span>
              </Chip>
            ))}
            {hasFilters && (
              <Button size='sm' status='danger' onClick={() => setSelected([])} className='min-h-11 shrink-0' aria-label='Limpiar filtros'>
                <XIcon className='size-3.5' aria-hidden />
              </Button>
            )}
          </motion.div>

          <AnimatePresence mode='wait' initial={false}>
            {filtered.length > 0 && (
              <motion.div
                key={selected.length === 0 ? 'all' : selected.toSorted().join('|')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease }}
                className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-6 xl:auto-rows-[minmax(17.5rem,auto)]'
              >
                {filtered.map((project, i) => (
                  <div
                    key={project.id}
                    className={cn(
                      'flex h-full min-h-0 min-w-0',
                      i === 0 ? 'sm:col-span-2 xl:col-span-4 xl:row-span-2' : 'xl:col-span-2'
                    )}
                  >
                    <ProjectCard project={project} index={i} featured={i === 0} />
                  </div>
                ))}
              </motion.div>
            )}

            {filtered.length === 0 && (
              <motion.div
                key='empty'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='border-bg3/50 flex flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-16 sm:py-20'
              >
                <p className='type-body-sm text-fn2 text-center font-mono'>Sin proyectos para estos filtros</p>
                <Button size='sm' variant='ghost' onClick={() => setSelected([])} className='mt-3 min-h-11'>
                  Ver todos
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default ProjectsView
