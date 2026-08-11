'use client'

import Button from '@common/components/button'
import Title from '@common/components/title'
import { SOCIAL } from '@common/core/data/info'
import { ArrowRightIcon, MailIcon } from 'lucide-react'
import { motion } from 'motion/react'
import type { FC } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const Contact: FC = () => {
  const socialList = Object.entries(SOCIAL).slice(1)

  return (
    <section id='contact' className='max-region:px-5 relative mx-auto w-full min-w-0 scroll-mt-24 py-10 sm:scroll-mt-28 sm:py-16 md:py-24'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease }}
        className='region bg-bg1 border-bg3 relative mx-auto flex w-full min-w-0 flex-col items-center gap-8 overflow-hidden rounded-2xl border px-4 py-10 text-center sm:gap-10 sm:px-6 sm:py-12 md:gap-12 md:px-10 md:py-16'
      >
        <div aria-hidden className='bg-gr-via absolute -top-32 -left-32 -z-10 h-64 w-64 rounded-full opacity-10 blur-[100px]' />
        <div
          aria-hidden
          className='bg-gr-to absolute -right-32 -bottom-32 -z-10 h-64 w-64 rounded-full opacity-10 blur-[100px]'
        />

        <header className='flex w-full min-w-0 flex-col items-center gap-3 sm:gap-4'>
          <div className='flex flex-col gap-2.5 sm:gap-3'>
            <p className='text-fn2 font-mono text-[11px] tracking-[0.2em] uppercase sm:text-xs'>¿Tienes un proyecto en mente?</p>
            <Title>
              Hablemos y <span className='text-gradient'>Construyamos</span>
            </Title>
          </div>

          <p className='text-fn2 max-w-[500px] text-sm leading-relaxed text-pretty sm:text-base md:text-lg'>
            Estoy abierto a nuevas oportunidades, colaboraciones o simplemente a una charla sobre tecnología y diseño.
          </p>
        </header>

        <div className='flex w-full max-w-2xl min-w-0 flex-col items-center gap-8 sm:gap-10'>
          <Button
            href={SOCIAL.Gmail.url}
            target='_blank'
            rel='noopener noreferrer'
            variant='default'
            className='group h-11 w-full max-w-xs rounded-xl px-6 text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] sm:h-12 sm:w-auto sm:max-w-none sm:px-8 sm:text-base'
          >
            <MailIcon className='mr-2 size-4 shrink-0' />
            Enviar un correo
            <ArrowRightIcon className='ml-2 size-3.5 shrink-0 transition-transform group-hover:translate-x-1' />
          </Button>

          <div className='flex w-full min-w-0 flex-col gap-5 sm:gap-6'>
            <div className='flex items-center gap-3 sm:gap-4'>
              <div className='bg-bg3/40 h-px min-w-0 flex-1' />
              <span className='text-fn2 shrink-0 font-mono text-[10px] tracking-widest uppercase'>En mis redes</span>
              <div className='bg-bg3/40 h-px min-w-0 flex-1' />
            </div>

            <ul className='grid w-full grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3'>
              {socialList.map(([key, value], i) => (
                <li key={`${key}-contact`} className='min-w-0 list-none'>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                    className='h-full w-full min-w-0'
                  >
                    <Button
                      href={value.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      variant='outline'
                      className='bg-bg2/40 hover:border-fn2/30 hover:bg-bg2 flex h-full w-full min-w-0 flex-col items-center gap-1 rounded-xl px-2 py-3 whitespace-normal transition-all sm:gap-1.5 sm:py-3.5'
                    >
                      <span className='text-fn1 text-xs font-bold sm:text-sm'>{key}</span>
                      <span className='text-fn2/70 w-full truncate text-[10px] font-medium tracking-tight'>{value.display}</span>
                    </Button>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
