import { technologies } from '@/shared/config/constants/technologies'
import Title from '@/shared/ui/components/Title'
import type { FC } from 'react'

import TechChip from './TechChip'

const MyDevStack: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const favTechs = technologies.filter((tech: any) => tech?.favorite)

  return (
    <section className='region max-region:px-5 relative mx-auto flex min-h-[50vh] w-full flex-col items-center justify-center gap-10 text-center'>
      <Title>Mi Stack Favorito 🌱</Title>
      <p className='w-full max-w-[400px] text-center font-mono'>
        Los uso en proyectos personales, prototipos rápidos y aprendizajes diarios
      </p>
      <div className='flex max-w-[650px] flex-wrap items-center justify-center gap-3.5'>
        {favTechs.map(tech => (
          <TechChip key={`${tech.name}-MyDevStack-${tech.icon}`} {...tech} />
        ))}
      </div>

      <div className='bg-fn2 pointer-events-none absolute top-0 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 rounded-full opacity-50 blur-[150px] select-none'></div>
    </section>
  )
}

export default MyDevStack
