import type { FC } from 'react'

import Contact from './components/Contact'
import HeroGrainGradient from './components/HeroGrainGradient'
import HeroHeader from './components/HeroHeader'
import Testimonials from './components/Testimonials'
import WorkExperience from './components/WorkExperience'

const Home: FC = () => {
  return (
    <main className='relative flex w-full flex-col gap-20 pb-20 md:gap-28 md:pb-28'>
      <HeroGrainGradient />
      <HeroHeader />
      <WorkExperience />
      <Contact />
      <Testimonials />
    </main>
  )
}

export default Home
