'use client'

import dynamic from 'next/dynamic'
import type { FC } from 'react'

import Contact from './components/Contact'
import HeroHeader from './components/HeroHeader'
import Testimonials from './components/Testimonials'
import WorkExperience from './components/WorkExperience'

const HeroGrainGradient = dynamic(() => import('./components/HeroGrainGradient'), {
  ssr: false
})

const Home: FC = () => {
  return (
    <main className='relative flex w-full flex-col gap-24 pb-24 md:gap-32 md:pb-32'>
      <HeroGrainGradient />
      <HeroHeader />
      <WorkExperience />
      <Contact />
      <Testimonials />
    </main>
  )
}

export default Home
