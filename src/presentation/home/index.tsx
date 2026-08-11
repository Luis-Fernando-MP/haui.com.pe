'use client'
import dynamic from 'next/dynamic'
import type { FC } from 'react'

import Contact from './components/Contact'
import HeroHeader from './components/HeroHeader'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import WorkExperience from './components/WorkExperience'

const HeroGrainGradient = dynamic(() => import('./components/HeroGrainGradient'), {
  ssr: false
})

const Home: FC = () => {
  return (
    <main className='relative flex w-full min-w-0 flex-col gap-16 overflow-x-hidden pb-16 sm:gap-20 sm:pb-20 md:gap-32 md:pb-32'>
      <HeroGrainGradient />
      <HeroHeader />
      <WorkExperience />
      <Projects />
      <Contact />
      <Testimonials />
    </main>
  )
}

export default Home
