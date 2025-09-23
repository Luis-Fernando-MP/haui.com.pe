import type { FC } from 'react'

import HeroHeader from './components/HeroHeader'
import Projects from './components/Projects'
import WorkExperience from './components/WorkExperience'

const Home: FC = () => {
  return (
    <main className='flex min-h-screen w-full flex-col gap-[200px]'>
      <HeroHeader />
      <WorkExperience />
      {/* <Projects /> */}
    </main>
  )
}

export default Home
