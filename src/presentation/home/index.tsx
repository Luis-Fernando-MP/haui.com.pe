import type { FC } from 'react'

import HeroHeader from './components/HeroHeader'
import WorkExperience from './components/WorkExperience'

const Home: FC = () => {
  return (
    <main className='min-h-screen w-full'>
      <HeroHeader />
      <WorkExperience />
    </main>
  )
}

export default Home
