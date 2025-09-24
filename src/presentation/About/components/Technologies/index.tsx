import type { FC } from 'react'

import CategorySelector from './CategorySelector'
import StackSelector from './StackSelector'
import TechnologiesList from './TechnologiesList'

const Technologies: FC = () => {
  return (
    <article className='region max-region:px-5 max-region:flex-col max-region:items-center max-region:gap-10 relative mx-auto flex min-h-screen w-full justify-between'>
      <section className='max-region:max-w-full max-region:w-full max-region:items-center max-region:text-center max-region:justify-center flex max-w-[450px] flex-col gap-15'>
        <div className='flex flex-col gap-5'>
          <h2 className='font-flowers text-h1'>Tecnologías de desarrollo</h2>
          <div className='text-fn2 max-region:max-w-[600px] w-full max-w-[400px] font-mono'>
            <p>Estas son otras herramientas que me permiten adaptarme a distintos proyectos y contextos.</p>
            <p>
              Al mismo tiempo, hay varias que aun no domino del todo, pero cada vez que me acerco a ellas descubro nuevas formas
              de crecer.
            </p>
            <p>
              Como desarrollador, siempre busco ampliar mi caja de herramientas para estar mejor preparado frente a los retos que
              vienen.
            </p>
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
