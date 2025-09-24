import type { FC } from 'react'

import HeroHeader from './components/HeroHeader'
import MyDevStack from './components/MyDevStack'

const About: FC = () => {
  return (
    <main className='flex min-h-screen w-full flex-col gap-[100px]'>
      <HeroHeader />
      <MyDevStack />
    </main>
  )
}

export default About
