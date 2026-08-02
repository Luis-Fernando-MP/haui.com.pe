'use client'

import Button from '@common/components/button'
import Title from '@common/components/title'
import { INFO } from '@common/core/constants'
import type { FC } from 'react'

import TestimoniesList from './TestimoniesList'

const Testimonials: FC = () => {
  return (
    <section className='region max-region:px-5 max-region:text-center mx-auto flex flex-col gap-10'>
      <header className='max-region:items-center flex flex-col gap-4'>
        <p className='text-fn2 font-mono text-xs tracking-[0.18em] uppercase'>Testimonios</p>
        <Title>
          Algunas
          <br />
          Bonitas Palabras
        </Title>
      </header>

      <div className='max-region:flex-col max-region:items-center max-region:gap-12 relative flex items-start justify-between gap-12'>
        <aside className='max-region:items-center flex w-full max-w-[300px] flex-col gap-8'>
          <p className='text-fn2 text-pretty font-mono text-base leading-relaxed'>
            Fragmentos de gratitud de personas con quienes he construido productos y equipos.
          </p>

          <div className='flex flex-col gap-2'>
            <h3 className='text-fn1 text-base font-semibold'>¿Quieres dejar tu huella?</h3>
            <p className='text-fn2 font-mono text-sm leading-relaxed'>
              Cada palabrita suma a esta colección de recuerdos compartidos.
            </p>
          </div>

          <Button href={INFO.testimonios_discussions} target='_blank' rel='noopener noreferrer' variant='default' className='px-5'>
            Comparte una palabrita
          </Button>
        </aside>

        <TestimoniesList />
      </div>
    </section>
  )
}

export default Testimonials
