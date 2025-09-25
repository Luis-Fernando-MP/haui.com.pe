import Title from '@/shared/ui/components/Title'
import type { FC } from 'react'

import BackgroundWorkspace from './BackgroundWorkspace'

const Workspace: FC = () => {
  return (
    <article className='region max-region:px-5 relative mx-auto flex min-h-screen w-full flex-col items-center gap-20'>
      <div className='flex flex-col items-center gap-5 text-center'>
        <Title className=''>Mi Workspace 🏆</Title>
        <p className='text-fn2 w-full max-w-[600px] font-mono'>
          “Mi espacio de trabajo esta diseñado para fomentar la concentración y la eficiencia, integrando las herramientas que
          utilizo en el dia a dia del desarrollo de software.”
        </p>
      </div>

      <BackgroundWorkspace />
    </article>
  )
}

export default Workspace
