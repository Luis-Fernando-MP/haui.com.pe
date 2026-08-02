// Compatibility re-export for case-insensitive environments (Windows) so imports
// using `@presentation/about` resolve on case-sensitive systems (Linux/Vercel).
export { default } from '../About'

'use client'

import dynamic from 'next/dynamic'
import type { FC } from 'react'

import Achievements from './components/Achievements'
import HeroHeader from './components/HeroHeader'
import MyDevStack from './components/MyDevStack'
import Technologies from './components/Technologies'
import Workspace from './components/workspace'

const HeroGrainGradient = dynamic(() => import('@presentation/home/components/HeroGrainGradient'), {
  ssr: false
})

const About: FC = () => {
  return (
    <main className='relative flex w-full flex-col gap-24 pb-24 md:gap-32 md:pb-32'>
      <HeroGrainGradient />
      <HeroHeader />
      <MyDevStack />
      <Technologies />
      <Workspace />
      <Achievements />
    </main>
  )
}

export default About
