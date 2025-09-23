import { HISTORY_JOBS } from '@/shared/config/constants/historyJobs'
import Title from '@/shared/ui/components/Title'
import type { FC } from 'react'

import JobExperience from './JobExperience'

const WorkExperience: FC = () => {
  return (
    <article className='max-region:px-5 flex min-h-screen w-full cursor-pointer flex-col items-center gap-20'>
      <header className='region max-region:text-center max-region:items-center flex flex-col gap-3.5'>
        <h3 className='text-fn2 font-mono'>2019 ― 2025</h3>
        <Title>
          Mi Experiencia
          <br /> Laboral
        </Title>
        <p className='text-fn2 max-w-[650px] font-mono'>
          <strong>He participado en el desarrollo de software para diversas empresas</strong>, colaborando tanto en equipos
          reducidos como en grupos de gran escala. Durante este proceso, he diseñado y mantenido sistemas robustos y seguros,
          priorizando siempre la eficiencia y la confiabilidad.
        </p>
      </header>

      <ul className='flex w-full flex-col gap-0'>
        {HISTORY_JOBS.map(job => {
          return <JobExperience job={job} key={job.name} />
        })}
      </ul>
    </article>
  )
}

export default WorkExperience
