'use client'

import Button from '@common/components/button'
import Title from '@common/components/title'
import { SOCIAL } from '@common/core/data/info'
import { ArrowRightIcon, MailIcon } from 'lucide-react'
import { motion } from 'motion/react'
import type { FC } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const Contact: FC = () => {
  const socialList = Object.entries(SOCIAL).slice(1) // GitHub, LinkedIn, Figma, WhatsApp

  return (
    <section id='contact' className='max-region:px-5 relative mx-auto w-full scroll-mt-28 py-16 md:py-24'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease }}
        className='region bg-bg1 border-bg3 relative mx-auto flex flex-col items-center gap-10 overflow-hidden rounded-2xl border px-6 py-12 text-center md:gap-12 md:px-10 md:py-16'
      >
        {/* Background Glow */}
        <div aria-hidden className='bg-gr-via absolute -top-32 -left-32 -z-10 h-64 w-64 rounded-full opacity-10 blur-[100px]' />
        <div
          aria-hidden
          className='bg-gr-to absolute -right-32 -bottom-32 -z-10 h-64 w-64 rounded-full opacity-10 blur-[100px]'
        />

        <header className='flex flex-col items-center gap-4'>
          <div className='flex flex-col gap-3'>
            <p className='text-fn2 font-mono text-xs tracking-[0.2em] uppercase'>¿Tienes un proyecto en mente?</p>
            <Title>
              Hablemos y <span className='text-gradient'>Construyamos</span>
            </Title>
          </div>

          <p className='text-fn2 max-w-[500px] text-base leading-relaxed text-pretty md:text-lg'>
            Estoy abierto a nuevas oportunidades, colaboraciones o simplemente a una charla sobre tecnología y diseño.
          </p>
        </header>

        <div className='flex w-full max-w-2xl flex-col items-center gap-10'>
          <Button
            href={SOCIAL.Gmail.url}
            target='_blank'
            rel='noopener noreferrer'
            variant='default'
            className='group h-12 rounded-xl px-8 text-base font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]'
          >
            <MailIcon className='mr-2 size-4' />
            Enviar un correo
            <ArrowRightIcon className='ml-2 size-3.5 transition-transform group-hover:translate-x-1' />
          </Button>

          <div className='flex w-full flex-col gap-6'>
            <div className='flex items-center gap-4'>
              <div className='bg-bg3/40 h-px flex-1' />
              <span className='text-fn2 font-mono text-[10px] tracking-widest uppercase'>En mis redes</span>
              <div className='bg-bg3/40 h-px flex-1' />
            </div>

            <ul className='grid w-full grid-cols-2 gap-3 sm:grid-cols-4'>
              {socialList.map(([key, value], i) => (
                <li key={`${key}-contact`}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                    className='h-full w-full'
                  >
                    <Button
                      href={value.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      variant='outline'
                      className='bg-bg2/40 hover:border-fn2/30 hover:bg-bg2 flex h-full w-full flex-col items-center gap-1.5 rounded-xl py-3.5 transition-all'
                    >
                      <span className='text-fn1 text-sm font-bold'>{key}</span>
                      <span className='text-fn2/70 truncate text-[10px] font-medium tracking-tight'>{value.display}</span>
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
