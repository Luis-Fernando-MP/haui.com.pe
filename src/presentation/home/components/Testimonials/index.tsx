'use client'

import Button from '@common/components/button'
import Image from '@common/components/image'
import Title from '@common/components/title'
import { cn } from '@common/core/cn'
import { INFO } from '@common/core/constants'
import { testimonies } from '@common/core/constants/testimonies'
import { motion } from 'motion/react'
import { type FC, useState } from 'react'

import TestimonyCard from './TestimonyCard'

const ease = [0.22, 1, 0.36, 1] as const

const Testimonials: FC = () => {
  const [activeId, setActiveId] = useState(testimonies[0]?.id)
  const active = testimonies.find(item => item.id === activeId) ?? testimonies[0]

  return (
    <section id='testimonials' className='max-region:px-5 relative mx-auto w-full scroll-mt-28'>
      <div className='region mx-auto flex flex-col gap-12 md:gap-16'>
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease }}
          className='max-region:items-center max-region:text-center flex max-w-[560px] flex-col gap-4'
        >
          <p className='text-fn2 font-mono text-xs tracking-[0.18em] uppercase'>Testimonios</p>
          <Title>
            Algunas
            <br />
            <span className='text-gradient'>Bonitas Palabras</span>
          </Title>
          <p className='text-fn2 font-mono text-base leading-relaxed text-pretty'>
            Fragmentos de gratitud de personas con quienes he construido productos y equipos.
          </p>
        </motion.header>

        <div className='max-region:flex-col grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] lg:gap-12'>
          <aside className='flex flex-col gap-6'>
            <ul className='border-bg3 flex flex-col gap-2 border-y py-2'>
              {testimonies.map((item, i) => {
                const selected = item.id === active.id

                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.2), ease }}
                    className='list-none'
                  >
                    <button
                      type='button'
                      onClick={() => setActiveId(item.id)}
                      aria-pressed={selected}
                      aria-label={`Ver testimonio de ${item.autor}`}
                      className={cn(
                        'group flex w-full items-center gap-3.5 rounded-xl px-3 py-3 text-left transition-colors outline-none',
                        'hover:bg-bg2/50 focus-visible:ring-fn2/40 focus-visible:ring-offset-bg1 focus-visible:ring-2 focus-visible:ring-offset-2',
                        selected && 'bg-bg2/60'
                      )}
                    >
                      <span
                        className={cn(
                          'border-bg3 bg-bg2 relative size-12 shrink-0 overflow-hidden rounded-xl border transition-colors',
                          selected && 'border-via/50'
                        )}
                      >
                        <Image
                          src={item.photo}
                          alt={`Foto de ${item.autor}`}
                          width={48}
                          height={48}
                          className='size-full object-cover'
                        />
                      </span>

                      <span className='flex min-w-0 flex-col gap-0.5'>
                        <span className='text-fn1 truncate text-sm font-semibold tracking-tight'>{item.autor}</span>
                        <span className='text-fn2 truncate font-mono text-[11px]'>{item.role}</span>
                      </span>

                      {selected && <span className='bg-via ml-auto size-1.5 shrink-0 rounded-full' aria-hidden />}
                    </button>
                  </motion.li>
                )
              })}
            </ul>

            <div className='flex flex-col gap-3'>
              <h3 className='text-fn1 text-base font-semibold tracking-tight'>¿Quieres dejar tu huella?</h3>
              <p className='text-fn2 font-mono text-sm leading-relaxed'>
                Cada palabrita suma a esta colección de recuerdos compartidos.
              </p>
              <Button
                href={INFO.testimonios_discussions}
                target='_blank'
                rel='noopener noreferrer'
                className='w-fit px-5'
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
          >
            <TestimonyCard testimony={active} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
