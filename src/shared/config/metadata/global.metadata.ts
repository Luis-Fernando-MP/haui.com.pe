import type { Metadata } from 'next'

import { INFO } from '../constants'

export const globalMetadata: Metadata = {
  title: INFO.devName,
  description: `Hola soy ${INFO.name} pero dime ${INFO.devShortName}, soy un desarrollador de aplicaciones apasionado por crear soluciones innovadoras, estaré encantado de trabajar contigo`,
  keywords: `Portafolio, Desarrollador Web, Full Stack, ${INFO.fullName}, ${INFO.devName}, dev, programador, lima, Perú`,
  metadataBase: new URL('https://haui.vercel.app'),
  authors: [{ name: 'Luis Fernando Melgar Pizarro', url: 'https://haui.vercel.app' }],
  creator: 'Luis Fernando Melgar Pizarro',
  publisher: 'haui.dev',
  icons: {
    icon: '/logo-ico.webp'
  },
  openGraph: {
    title: 'haui:Porfolio',
    description:
      'Hola, soy Luis, pero dime haui, te invito a explorar mi porfolio y conocer más sobre mi, inténtalo y tomemos un cafe',
    url: 'https://haui.vercel.app',
    siteName: 'haui:Porfolio',
    images: [
      {
        url: '/opengraph.webp',
        alt: 'Logo de haui-dev',
        width: 1200,
        height: 630
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'haui:Porfolio',
    description:
      'Hola, soy Luis, pero dime haui, te invito a explorar mi porfolio y conocer más sobre mi, inténtalo y tomemos un cafe',
    images: [
      {
        url: '/opengraph.webp',
        alt: 'haui-dev'
      }
    ]
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1
}
