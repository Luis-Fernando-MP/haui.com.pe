import Title from '@/shared/ui/components/Title'
import { Image } from '@unpic/react/nextjs'
import type { FC } from 'react'

const Workspace: FC = () => {
  return (
    <article className='region relative mx-auto flex min-h-screen w-full flex-col items-center gap-20'>
      <div className='flex flex-col items-center gap-5 text-center'>
        <Title className=''>Mi Workspace 🏆</Title>
        <p className='text-fn2 w-full max-w-[600px] font-mono'>
          “Mi espacio de trabajo esta diseñado para fomentar la concentración y la eficiencia, integrando las herramientas que
          utilizo en el dia a dia del desarrollo de software.”
        </p>
      </div>
      <Image
        src='/assets/workspace.webp'
        alt='workspace'
        fetchPriority='high'
        layout='fullWidth'
        className='region border-bg3 rounded-[20px] border-2'
      />
    </article>
  )
}

export default Workspace
