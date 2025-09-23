import type { FC } from 'react'

import HeroHeader from './components/HeroHeader'

const Home: FC = () => {
  return (
    <main className='min-h-screen w-full'>
      <HeroHeader />
    </main>
  )
}

export default Home
