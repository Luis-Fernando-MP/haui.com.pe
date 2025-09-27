import { createTestimonyMailto } from '@/lib/mailto'

export type Testimony = {
  id: string
  autor: string
  photo: string
  role: string
  webPage?: string
  githubPage?: string
  linkedIn?: string
  mailTo?: string
  degree: string
  testimonial: string
}

export const testimonies: Testimony[] = [
  {
    id: 'testimony-1',
    autor: 'Gonzalez Chaca Angel Jefferson',
    photo: '/assets/testimonies/gonzalez-chaca-angel-jefferson.webp',
    role: 'Desarrollador Backend Odoo',
    linkedIn: 'https://www.linkedin.com/in/jgonzalezchaca/',
    githubPage: 'https://github.com/angelgonzdev',
    mailTo: createTestimonyMailto('jgonzalezhcaca@gmail.com'),
    degree: 'Ingeniero de Software',
    testimonial:
      'Trabajar con Luis en los proyectos de la universidad ha sido muy grandioso, gracias a su excelente forma de trabajar como desarrollador y de gestionar los proyectos para alcanzar las metas deseadas. Sus habilidades que destaco incluyen su gran pasión por la tecnología y su entusiasmo por aprender continuamente.'
  },
  {
    id: 'testimony-2',
    autor: 'Cataño Perez Wiener',
    photo: '/assets/testimonies/cataño-perez-wiener.webp',
    role: 'Desarrollador Backend Junior',
    mailTo: createTestimonyMailto('Winercr12383@gmail.com'),
    degree: 'Ingeniero de Sistemas',
    testimonial:
      'Trabajar con Luis ha sido una experiencia muy agradable. Su dedicación, habilidades técnicas y capacidad para resolver problemas complejos han contribuido de manera decisiva al éxito de nuestros proyectos. Es una persona que destaca por su disposición para colaborar, aprender y compartir conocimientos. Es un futuro ingeniero que promete grandes logros en el mundo del software'
  },
  {
    id: 'testimony-3',
    autor: 'Méndez Pariona Carlos',
    photo: '/assets/testimonies/default_profile.webp',
    role: 'Líder de Producto en Devdatep',
    degree: 'Ingeniero de Sistemas',
    testimonial:
      'Luis Fernando aporta no solo habilidades técnicas, sino una sensibilidad especial para entender las necesidades del usuario. Sus contribuciones han elevado la calidad y usabilidad de nuestros productos. Tiene una mente creativa y resolutiva'
  }
]
