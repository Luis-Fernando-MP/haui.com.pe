import type { FC } from 'react'

import HeroHeader from './components/HeroHeader'

const About: FC = () => {
  return (
    <main className='flex min-h-screen w-full flex-col gap-[200px]'>
      <HeroHeader />
    </main>
  )
}

export default About
