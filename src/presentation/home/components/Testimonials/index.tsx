'use client'

import Button from '@common/components/button'
import Title from '@common/components/title'
import { INFO } from '@common/core/constants'
import type { FC } from 'react'

import TestimoniesList from './TestimoniesList'

const Testimonials: FC = () => {
  return (
    <article className='region max-region:px-5 max-region:text-center mx-auto flex flex-col gap-8'>
      <Title>
        Algunas
        <br /> Bonitas Palabras
      </Title>

      <div className='max-region:flex-col max-region:items-center max-region:gap-10 relative flex justify-between gap-8'>
        <section className='max-region:items-center flex w-full max-w-[320px] flex-col gap-8'>
          <p className='text-fn2 font-mono'>
            Fragmentos de gratitud que valoro profundamente, de personas con quienes he construido algo juntos.
          </p>

          <div className='flex flex-col gap-2'>
            <h4 className='text-fn1 font-medium'>¿Quieres dejar tu huella?</h4>
            <p className='text-fn2 font-mono'>Cada palabrita suma a esta colección de recuerdos compartidos.</p>
          </div>

          <Button href={INFO.testimonios_discussions} target='_blank' rel='noopener noreferrer' variant='active'>
            Comparte una palabrita
          </Button>
        </section>
        <TestimoniesList />
      </div>
    </article>
  )
}

export default Testimonials
