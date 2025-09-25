import GradientSvg from '@/shared/ui/components/GradientSvg'
import type { FC } from 'react'

import HeroHeader from './components/HeroHeader'
import MyDevStack from './components/MyDevStack'
import Technologies from './components/Technologies'
import Workspace from './components/Workspace'

const About: FC = () => {
  return (
    <main className='flex min-h-screen w-full flex-col gap-[150px]'>
      <GradientSvg />
      <HeroHeader />
      <MyDevStack />
      <Technologies />
      <Workspace />
    </main>
  )
}

export default About
