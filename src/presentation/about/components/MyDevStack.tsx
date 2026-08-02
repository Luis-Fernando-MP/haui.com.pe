'use client'

import { cn } from '@common/core/cn'
import { technologies } from '@common/core/constants/technologies'
import { type TechnologyStack, technologyStack } from '@common/core/queries/techQuery/tech.type'
import { Image } from '@unpic/react/nextjs'
import { motion } from 'motion/react'
import type { FC } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const STACK_ORDER = ['frontend', 'backend', 'devops', 'Kit'] as const satisfies TechnologyStack[]

const STACK_LABEL: Record<TechnologyStack, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  devops: 'DevOps',
  Kit: 'Kit'
}

const MyDevStack: FC = () => {
  const favTechs = technologies.filter(tech => tech.favorite)

  const groups = STACK_ORDER.map(stack => ({
    stack,
    items: favTechs.filter(tech => tech.stack[0] === stack)
  })).filter(group => group.items.length > 0)

  return (
    <section className='region max-region:px-5 relative mx-auto mt-10 mb-20 flex w-full flex-col gap-6 md:gap-7'>
      <header className='flex flex-col gap-2 max-md:items-center max-md:text-center'>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease }}
          className='text-fn2 font-mono text-[11px] tracking-[0.18em] uppercase'
        >
          Stack diario
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease, delay: 0.04 }}
          className='flex flex-col gap-1.5'
        >
          <h2 className='text-fn1 text-[clamp(1.85rem,4.5vw,2.75rem)] font-bold tracking-tight'>
            Mi stack <span className='text-gradient'>favorito</span>
          </h2>
          <p className='text-fn2 max-w-[420px] text-sm leading-relaxed text-pretty'>
            Las herramientas que uso en proyectos personales, prototipos rápidos y aprendizajes diarios.
          </p>
        </motion.div>
      </header>

      <div className='flex flex-col gap-5'>
        {groups.map((group, groupIndex) => {
          const StackIcon = technologyStack[group.stack]

          return (
            <motion.div
              key={group.stack}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease, delay: groupIndex * 0.05 }}
              className='flex flex-col gap-2.5'
            >
              <div className='flex items-center gap-2 max-md:justify-center'>
                <span className='bg-bg2 border-bg3 text-fn2 flex size-7 items-center justify-center rounded-md border'>
                  <StackIcon className='size-3.5' aria-hidden />
                </span>
                <p className='text-fn2 font-mono text-[11px] tracking-[0.14em] uppercase'>{STACK_LABEL[group.stack]}</p>
                <span className='bg-bg3/80 h-px min-w-8 flex-1 max-md:hidden' aria-hidden />
                <span className='text-fn2/70 font-mono text-[11px] max-md:hidden'>
                  {String(group.items.length).padStart(2, '0')}
                </span>
              </div>

              <ul className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                {group.items.map((tech, index) => (
                  <motion.li
                    key={`${tech.name}-${group.stack}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.35, ease, delay: 0.04 + index * 0.03 }}
                    className='list-none'
                  >
                    <article
                      className={cn(
                        'border-bg3 bg-bg1 group relative flex h-full items-center gap-2.5 overflow-hidden rounded-xl border px-3 py-2.5',
                        'transition-[border-color,background-color,transform] duration-300 motion-reduce:transition-none',
                        'hover:border-fn2/30 hover:bg-bg2/40'
                      )}
                    >
                      <span
                        aria-hidden
                        className='pointer-events-none absolute inset-x-3 top-0 h-px opacity-80'
                        style={{
                          background: `linear-gradient(90deg, transparent, ${tech.color}, transparent)`
                        }}
                      />

                      <div
                        className='bg-bg2 border-bg3 flex size-8 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none'
                        style={{ boxShadow: `inset 0 0 0 1px ${tech.color}33` }}
                      >
                        <Image className='contain' src={tech.icon} width={20} height={20} alt='' background='/fallback.webp' />
                      </div>

                      <div className='flex min-w-0 flex-col'>
                        <h3 className='text-fn1 truncate text-sm font-semibold tracking-tight'>{tech.name}</h3>
                        <p className='text-fn2 font-mono text-[10px]'>{tech.level}</p>
                      </div>
                    </article>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>

      <div
        aria-hidden
        className='from-from/25 via-via/15 to-to/20 pointer-events-none absolute top-8 left-1/2 -z-10 h-[240px] w-[min(90%,520px)] -translate-x-1/2 rounded-full bg-gradient-to-r opacity-50 blur-[100px] select-none'
      />
    </section>
  )
}

export default MyDevStack
