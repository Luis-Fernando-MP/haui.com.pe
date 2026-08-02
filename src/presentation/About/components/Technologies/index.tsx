import type { FC } from 'react'

import CategorySelector from './CategorySelector'
import StackSelector from './StackSelector'
import TechnologiesList from './TechnologiesList'

const Technologies: FC = () => {
  return (
    <article className='region max-region:px-5 max-region:flex-col max-region:items-center max-region:gap-10 relative mx-auto flex w-full items-start justify-between gap-12'>
      <section className='max-region:max-w-full max-region:w-full max-region:items-center max-region:text-center flex w-full max-w-[450px] flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          <h2 className='font-flowers text-h1'>Tecnologías de desarrollo</h2>
          <div className='text-fn2 max-region:max-w-[600px] flex w-full max-w-[400px] flex-col gap-3 font-mono'>
            <p>Otras herramientas que me permiten adaptarme a distintos proyectos y contextos.</p>
            <p>Hay varias que aún no domino del todo, pero cada acercamiento abre nuevas formas de crecer.</p>
            <p>Sigo ampliando mi caja de herramientas para los retos que vienen.</p>
          </div>
        </div>
        <StackSelector />
        <CategorySelector />
      </section>

      <TechnologiesList />
    </article>
  )
}

export default Technologies
