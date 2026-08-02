import About from '@presentation/about'
import type { Metadata } from 'next'
import type { FC } from 'react'

export const metadata: Metadata = {
  title: 'Sobre mí | haui',
  description: 'Conoce mi stack, logros, journey y forma de trabajar.'
}

const AboutPage: FC = () => {
  return <About />
}

export default AboutPage
