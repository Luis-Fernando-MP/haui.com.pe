import Title from '@common/components/title'
import type { FC } from 'react'

import AchievementsList from './AchievementsList'
import CategorySelector from './CategorySelector'
import SkillSelector from './SkillSelector'
import TechnologiesSelector from './TechnologiesSelector'

const Achievements: FC = () => {
  return (
    <article className='region max-region:px-5 no-scrollbar max-region:flex-col mx-auto flex min-h-screen w-full justify-between gap-10'>
      <div className='max-region:relative max-region:items-center max-region:top-0 max-region:mx-auto max-region:text-center sticky top-30 flex w-full max-w-[450px] flex-col gap-10 self-start'>
        <div className='flex flex-col gap-2.5'>
          <Title>
            📜
            <br />
            Certificados y <br />
            títulos
          </Title>
          <p className='text-fn2 w-full max-w-[400px] font-mono'>
            Cada día intento aprender algo nuevo. Estos son los certificados y títulos que he obtenido hasta ahora.. sé que no
            serán los últimos.
          </p>
        </div>

        <CategorySelector />
        <SkillSelector />
        <TechnologiesSelector />
      </div>

      <AchievementsList />
    </article>
  )
}

export default Achievements
