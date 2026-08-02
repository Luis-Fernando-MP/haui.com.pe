import Title from '@common/components/title'
import type { FC } from 'react'

import BackgroundWorkspace from './BackgroundWorkspace'

const Workspace: FC = () => {
  return (
    <article className='region max-region:px-5 pointer-events-none relative mx-auto flex h-fit w-full flex-col items-center gap-10 select-none'>
      <div className='flex flex-col items-center gap-3 text-center'>
        <Title>Mi Workspace</Title>
        <p className='text-fn2 w-full max-w-[560px] font-mono'>
          Un espacio pensado para concentración y eficiencia, con las herramientas del día a día en el desarrollo de software.
        </p>
      </div>

      <BackgroundWorkspace />
    </article>
  )
}

export default Workspace
