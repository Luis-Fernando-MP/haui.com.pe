'use client'

import Button from '@/shared/ui/components/Button'
import Title from '@/shared/ui/components/Title'
import { FC } from 'react'

import TestimoniesList from './TestimoniesList'

const Testimonials: FC = () => {
  return (
    <article className='region max-region:px-5 max-region:text-center mx-auto flex flex-col gap-10'>
      <Title>
        🌱 Algunas
        <br /> Bonitas Palabras
      </Title>

      <div className='max-region:flex-col max-region:justify-center max-region:items-center max-region:gap-15 relative flex justify-between'>
        <section className='max-region:items-center max-region:gap-10 flex w-full flex-col gap-15'>
          <p className='text-fn2 max-region:max-w-[500px] w-full max-w-[300px] font-mono'>
            Algunos fragmentos de gratitud que valoro profundamente, fruto de la confianza de personas con quienes he tenido el
            honor de construir algo juntos.
          </p>

          <div className='flex flex-col gap-2.5'>
            <h4 className='text-fn2 font-medium'>✨ Quieres dejar tu huella?</h4>

            <p className='text-fn2 max-region:max-w-[500px] w-full max-w-[300px] font-mono'>
              Cada palabrita es una huellita en esta colección de recuerdos compartidos.
            </p>
          </div>

          <Button variant='active'>
            <h4 className='font-medium'>Comparte una palabrita</h4>
          </Button>
        </section>
        <TestimoniesList />
      </div>
    </article>
  )
}

export default Testimonials
