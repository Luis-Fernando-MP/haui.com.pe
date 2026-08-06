'use client'

import Button from '@common/components/button'
import Title from '@common/components/title'
import { cn } from '@common/core/cn'
import { CheckIcon, FilterIcon, XIcon } from 'lucide-react'
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
    <section id='projects' className='max-region:px-5 flex w-full scroll-mt-28 flex-col items-center gap-10 md:gap-14'>
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

      <div className='region mx-auto flex w-full gap-8 lg:gap-10'>
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease }}
          className='hidden w-48 shrink-0 lg:block'
        >
          <div className='sticky top-28'>
            <div className='mb-4 flex items-center justify-between'>
              <span className='text-fn1 flex items-center gap-2 text-sm font-medium'>
                <FilterIcon className='size-4' aria-hidden />
                Filtros
              </span>
              {hasFilters && (
                <Button size='sm' status='danger' variant='ghost' onClick={() => setSelected([])}>
                  Limpiar
                </Button>
              )}
            </div>

            <nav className='flex flex-col gap-1' role='group' aria-label='Filtros'>
              <FilterBtn active={!hasFilters} onClick={() => setSelected([])}>
                Todos
              </FilterBtn>
              {tags.map(name => (
                <FilterBtn key={name} active={isActive(name)} onClick={() => toggle(name)}>
                  {isActive(name) && <CheckIcon className='size-3.5 shrink-0' strokeWidth={2.5} aria-hidden />}
                  <span className='truncate'>{name}</span>
                </FilterBtn>
              ))}
            </nav>
          </div>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, ease }}
          className='mb-2 flex flex-wrap items-center gap-2 lg:hidden'
          role='group'
          aria-label='Filtros'
        >
          <Chip active={!hasFilters} onClick={() => setSelected([])}>
            Todos
          </Chip>
          {tags.slice(0, 6).map(name => (
            <Chip key={name} active={isActive(name)} onClick={() => toggle(name)}>
              {isActive(name) && <CheckIcon className='size-3' strokeWidth={2.5} aria-hidden />}
              {name}
            </Chip>
          ))}
          {hasFilters && (
            <Button size='sm' status='danger' onClick={() => setSelected([])} className='ml-auto'>
              <XIcon className='size-3.5' aria-hidden />
            </Button>
          )}
        </motion.div>

        <div className='min-w-0 flex-1'>
          <AnimatePresence mode='wait' initial={false}>
            {filtered.length > 0 && (
              <motion.div
                key={selected.length === 0 ? 'all' : selected.toSorted().join('|')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease }}
                className='grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-6'
              >
                {filtered.map((project, i) => (
                  <div key={project.id} className={cn(i === 0 ? 'sm:col-span-2 xl:col-span-4 xl:row-span-2' : 'xl:col-span-2')}>
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
                className='border-bg3/50 flex flex-col items-center justify-center rounded-2xl border border-dashed py-20'
              >
                <p className='text-fn2 font-mono text-sm'>Sin proyectos para estos filtros</p>
                <Button size='sm' variant='ghost' onClick={() => setSelected([])} className='mt-3'>
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

const FilterBtn: FC<{ active: boolean; onClick: () => void; children: ReactNode }> = ({ active, onClick, children }) => (
  <button
    type='button'
    onClick={onClick}
    className={cn(
      'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors',
      active ? 'bg-fn1 text-bg1 font-medium' : 'text-fn2 hover:bg-bg2 hover:text-fn1'
    )}
  >
    {children}
  </button>
)

const Chip: FC<{ active: boolean; onClick: () => void; children: ReactNode }> = ({ active, onClick, children }) => (
  <button
    type='button'
    onClick={onClick}
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
      active ? 'bg-fn1 text-bg1' : 'bg-bg2 text-fn2 hover:text-fn1'
    )}
  >
    {children}
  </button>
)

export default ProjectsView
