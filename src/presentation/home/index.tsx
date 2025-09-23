import type { FC } from 'react'

import Contact from './components/Contact'
import HeroHeader from './components/HeroHeader'
import WorkExperience from './components/WorkExperience'

const Home: FC = () => {
  return (
    <main className='flex min-h-screen w-full flex-col gap-[200px]'>
      <HeroHeader />
      <WorkExperience />
      {/* <Projects /> */}
      <Contact />
    </main>
  )
}

export default Home
