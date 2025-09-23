import Title from '@/shared/ui/components/Title'
import type { FC } from 'react'

import CardProjects from './CardProjects'

const Projects: FC = () => {
  return (
    <article className='flex w-full justify-between px-20'>
      <section className='flex flex-col gap-10'>
        <h5 className='text-fn2 font-mono'>Son los pasos que dieron forma a mi camino</h5>
        <div className='flex flex-col gap-1'>
          <Title>
            🌱
            <br />
            Mis Proyectos
          </Title>
          <p className='text-fn2 max-w-[520px] font-mono'>
            En cada uno de estos proyectos he aplicado todo lo que he aprendido. En cada versién que he construido, he buscado
            siempre mejorar y refinar mi enfoque. Cada proyecto representa una parte de mi: un fragmento de mis saberes y una
            experiencia que comparto con quienes lo visitan.
          </p>
        </div>
        <div className='flex flex-col gap-2.5'>
          <h2 className='font-medium'>Enfocar:</h2>
        </div>
      </section>

      <CardProjects />
    </article>
  )
}

export default Projects
