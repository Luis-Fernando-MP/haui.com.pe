import type { FC } from 'react'

import Contact from './components/Contact'
import HeroGrainGradient from './components/HeroGrainGradient'
import HeroHeader from './components/HeroHeader'
import Testimonials from './components/Testimonials'
import WorkExperience from './components/WorkExperience'

const Home: FC = () => {
  return (
    <main className='relative flex min-h-screen w-full flex-col gap-[200px]'>
      <HeroGrainGradient />
      <HeroHeader />
      <WorkExperience />
      <Contact />
      <Testimonials />
    </main>
  )
}

export default Home
