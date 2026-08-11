'use client'

import Button from '@common/components/button'
import Image from '@common/components/image'
import Title from '@common/components/title'
import { cn } from '@common/core/cn'
import { INFO } from '@common/core/data/info'
import { testimonies } from '@common/core/data/testimonies'
import { motion } from 'motion/react'
import { type FC, useState } from 'react'

import TestimonyCard from './TestimonyCard'

const ease = [0.22, 1, 0.36, 1] as const

const Testimonials: FC = () => {
  const [activeId, setActiveId] = useState(testimonies[0]?.id)
  const active = testimonies.find(item => item.id === activeId) ?? testimonies[0]

  return (
    <section id='testimonials' className='max-region:px-5 relative mx-auto w-full min-w-0 scroll-mt-24 sm:scroll-mt-28'>
      <div className='region mx-auto flex w-full min-w-0 flex-col gap-8 sm:gap-12 md:gap-16'>
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease }}
          className='max-region:items-center max-region:text-center flex w-full max-w-[560px] min-w-0 flex-col gap-3 sm:gap-4'
        >
          <p className='text-fn2 font-mono text-[11px] tracking-[0.18em] uppercase sm:text-xs'>Testimonios</p>
          <Title>
            Algunas
            <br />
            <span className='text-gradient'>Bonitas Palabras</span>
          </Title>
          <p className='text-fn2 text-sm leading-relaxed text-pretty sm:font-mono sm:text-base'>
            Fragmentos de gratitud de personas con quienes he construido productos y equipos.
          </p>
        </motion.header>

        <div className='grid w-full min-w-0 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] lg:gap-12'>
          <aside className='flex min-w-0 flex-col gap-5 sm:gap-6'>
            <ul className='no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-col sm:gap-2 sm:overflow-visible sm:border-bg3 sm:border-y sm:px-0 sm:py-2 sm:pb-2'>
              {testimonies.map((item, i) => {
                const selected = item.id === active.id

                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.2), ease }}
                    className='list-none sm:w-full'
                  >
                    <button
                      type='button'
                      onClick={() => setActiveId(item.id)}
                      aria-pressed={selected}
                      aria-label={`Ver testimonio de ${item.autor}`}
                      className={cn(
                        'group flex items-center gap-2.5 rounded-xl text-left transition-colors outline-none',
                        'hover:bg-bg2/50 focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 focus-visible:ring-2 focus-visible:ring-offset-2',
                        'w-[min(16.5rem,78vw)] shrink-0 border px-3 py-2.5 sm:w-full sm:gap-3.5 sm:border-transparent sm:px-3 sm:py-3',
                        selected ? 'border-via/40 bg-bg2/60 sm:border-transparent' : 'border-bg3/60 bg-bg1/40 sm:bg-transparent'
                      )}
                    >
                      <span
                        className={cn(
                          'border-bg3 bg-bg2 relative size-10 shrink-0 overflow-hidden rounded-xl border transition-colors sm:size-12',
                          selected && 'border-via/50'
                        )}
                      >
                        <Image
                          src={item.photo}
                          alt={`Foto de ${item.autor}`}
                          width={48}
                          height={48}
                          layout='fixed'
                          unstyled
                          objectFit='cover'
                          className='size-full object-cover'
                        />
                      </span>

                      <span className='flex min-w-0 flex-col gap-0.5'>
                        <span className='text-fn1 truncate text-sm font-semibold tracking-tight'>{item.autor}</span>
                        <span className='text-fn2 truncate font-mono text-[10px] sm:text-[11px]'>{item.role}</span>
                      </span>

                      {selected && <span className='bg-via ml-auto hidden size-1.5 shrink-0 rounded-full sm:block' aria-hidden />}
                    </button>
                  </motion.li>
                )
              })}
            </ul>

            <div className='max-region:items-center max-region:text-center flex flex-col gap-2.5 sm:gap-3 lg:items-start lg:text-left'>
              <h3 className='text-fn1 text-base font-semibold tracking-tight'>¿Quieres dejar tu huella?</h3>
              <p className='text-fn2 text-sm leading-relaxed sm:font-mono'>
                Cada palabrita suma a esta colección de recuerdos compartidos.
              </p>
              <Button
                href={INFO.testimonios_discussions}
                target='_blank'
                rel='noopener noreferrer'
                className='w-full max-w-xs px-5 sm:w-fit'
                showIconLink
              >
                Comparte una palabrita
              </Button>
            </div>
          </aside>

          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
            className='min-w-0'
          >
            <TestimonyCard testimony={active} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
