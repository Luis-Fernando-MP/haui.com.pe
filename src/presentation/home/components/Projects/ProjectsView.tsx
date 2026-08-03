'use client'

import Button from '@common/components/button'
import Popup from '@common/components/popup'
import Title from '@common/components/title'
import { cn } from '@common/core/cn'
import { ChartNoAxesColumnIcon, CheckIcon, PlusIcon } from 'lucide-react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { type FC, useState } from 'react'

import CardProjects from './CardProjects'

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

  const pill = (active: boolean) =>
    cn(
      'shrink-0 rounded-full border px-3 py-1.5 font-mono text-xs tracking-wide transition-[background-color,border-color,color] duration-200 outline-none',
      'focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 focus-visible:ring-2 focus-visible:ring-offset-2',
      active && 'border-fn1 bg-fn1 text-bg1',
      !active && 'border-bg3/80 text-fn2 hover:border-fn2/35 hover:text-fn1 hover:bg-bg2/40'
    )

  return (
    <section id='projects' className='max-region:px-5 flex w-full scroll-mt-28 flex-col gap-12 md:gap-16'>
      <div className='region mx-auto grid w-full gap-10 lg:grid-cols-[minmax(280px,0.88fr)_minmax(0,1.2fr)] lg:items-start lg:gap-12 xl:gap-16'>
        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease }}
          className='lg:sticky lg:top-28 lg:self-start'
        >
          <div className='flex flex-col gap-8 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-1'>
            <header className='flex flex-col gap-4'>
              <p className='text-fn2 font-mono text-xs tracking-[0.18em] uppercase'>
                Son los pasos que dieron forma a mi camino
              </p>
              <Title>
                <span aria-hidden className='font-emoji text-semantic-success mb-1 block text-3xl leading-none'>
                  🌱
                </span>
                Mis Proyectos
              </Title>
              <p className='text-fn2 max-w-[28rem] font-mono text-sm leading-relaxed text-pretty md:text-base'>
                En cada uno de estos proyectos he aplicado todo lo que he aprendido. En cada versión que he construido, he
                buscado siempre mejorar y refinar mi enfoque. Cada proyecto representa una parte de mí: un fragmento de mis
                saberes y una experiencia que comparto con quienes lo visitan.
              </p>
            </header>

            <div className='flex flex-col gap-3'>
              <div className='flex items-baseline justify-between gap-3'>
                <h3 className='text-fn1 text-sm font-semibold tracking-tight md:text-base'>Enfocar</h3>
                <span className='text-fn2 font-mono text-[11px] tracking-wide'>
                  {filtered.length}/{projects.length}
                </span>
              </div>

              <div className='flex flex-wrap gap-2'>
                <button type='button' onClick={() => setTag(ALL)} aria-pressed={tag === ALL} className={pill(tag === ALL)}>
                  <span className='inline-flex items-center gap-1.5'>
                    <ChartNoAxesColumnIcon className='size-3.5' aria-hidden />
                    {ALL}
                  </span>
                </button>

                {principal.map(name => (
                  <button
                    key={name}
                    type='button'
                    onClick={() => setTag(name)}
                    aria-pressed={tag === name}
                    className={pill(tag === name)}
                  >
                    {name}
                  </button>
                ))}

                {remaining.length > 0 && (
                  <Popup>
                    <Popup.Trigger asChild>
                      <button type='button' className={pill(remaining.includes(tag))}>
                        <span className='inline-flex items-center gap-1'>
                          <PlusIcon className='size-3' aria-hidden />
                          {remaining.length}
                        </span>
                      </button>
                    </Popup.Trigger>
                    <Popup.Content align='start' className='w-56'>
                      <Popup.Header>
                        <Popup.Title>Más etiquetas</Popup.Title>
                        <Popup.Close />
                      </Popup.Header>
                      <div className='no-scrollbar flex max-h-56 flex-col gap-0.5 overflow-y-auto p-1.5'>
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
              </div>
            </div>
          </div>
        </motion.aside>

        <div className='min-w-0'>
          <LayoutGroup>
            <AnimatePresence mode='popLayout'>
              {filtered.length > 0 && (
                <motion.ul
                  key={tag}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className='flex flex-col gap-5 md:gap-6'
                >
                  {filtered.map((project, i) => (
                    <li key={project.id} className='list-none'>
                      <CardProjects project={project} index={i} />
                    </li>
                  ))}
                </motion.ul>
              )}

              {filtered.length === 0 && (
                <motion.div
                  key='empty'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='border-bg3/70 bg-bg2/20 text-fn2 flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed font-mono text-sm'
                >
                  Sin proyectos para este filtro
                </motion.div>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </div>
    </section>
  )
}

export default ProjectsView
