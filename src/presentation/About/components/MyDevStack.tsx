import Title from '@common/components/title'
import { technologies } from '@common/core/constants/technologies'
import type { FC } from 'react'

import TechChip from './TechChip'

const MyDevStack: FC = () => {
  const favTechs = technologies.filter(tech => tech.favorite)

  return (
    <section className='region max-region:px-5 relative mx-auto flex w-full flex-col items-center gap-8 text-center'>
      <div className='flex flex-col items-center gap-3'>
        <Title>Mi Stack Favorito</Title>
        <p className='text-fn2 w-full max-w-[420px] font-mono'>
          Los uso en proyectos personales, prototipos rápidos y aprendizajes diarios.
        </p>
      </div>

      <div className='flex max-w-[650px] flex-wrap items-center justify-center gap-3'>
        {favTechs.map(tech => (
          <TechChip key={`${tech.name}-MyDevStack-${tech.icon}`} {...tech} />
        ))}
      </div>

      <div
        aria-hidden
        className='bg-fn2 pointer-events-none absolute top-0 left-1/2 -z-10 h-[220px] w-[220px] -translate-x-1/2 rounded-full opacity-40 blur-[120px] select-none'
      />
    </section>
  )
}

export default MyDevStack
