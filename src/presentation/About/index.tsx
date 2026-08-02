import GradientSvg from '@common/components/gradient-svg'
import type { FC } from 'react'

import Achievements from './components/Achievements'
import HeroHeader from './components/HeroHeader'
import MyDevStack from './components/MyDevStack'
import Technologies from './components/Technologies'
import Workspace from './components/workspace'

const About: FC = () => {
  return (
    <main className='relative flex w-full flex-col gap-20 pb-20 md:gap-28 md:pb-28'>
      <GradientSvg />
      <HeroHeader />
      <MyDevStack />
      <Technologies />
      <Workspace />
      <Achievements />
    </main>
  )
}

export default About
