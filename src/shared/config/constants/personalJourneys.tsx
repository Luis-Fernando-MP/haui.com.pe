import { InfinityIcon, BugIcon, PuzzleIcon } from 'lucide-react'
import { ReactNode } from 'react'

export type JourneysImage = {
  src: string
  actionText?: string
  action?: string
  caption?: string
}

export type Journey = {
  id: string
  title: string
  description: ReactNode
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  date: string
  images: JourneysImage[]
}

export const personalJourneys: Journey[] = [
  {
    id: 'jny-00001',
    title: 'Mis inicios',
    Icon: InfinityIcon,
    description: (
      <p>
        Mi camino comenzó en 2021, cuando obtuve el título de{' '}
        <strong>Técnico en Diseño y Programación de Aplicaciones Web</strong>. Desde entonces, he seguido formándome y actualmente
        curso el séptimo ciclo de la carrera de <strong>Ingeniería de Software</strong> en la Universidad Tecnológica del Perú.
      </p>
    ),
    date: '2025-01',
    images: [
      {
        src: '/assets/default_profile.webp',
        caption: 'Ilustración por defecto de un puerco'
      },
      {
        src: '/assets/default_profile.webp',
        action: '/about'
      }
    ]
  },
  {
    id: 'jny-00002',
    title: 'Mi desorden',
    Icon: PuzzleIcon,
    description: (
      <p>
        No sé lidiar ni con lo normal ni con lo perfecto. Solo soy, y cada proyecto que toco lo sabe. Si puedo mejorarlo,
        transformarlo o reinventarlo… lo haré. Para eso están mis manitas.
      </p>
    ),
    date: '2024-05',
    images: [
      {
        src: '/assets/default_profile.webp',
        caption: 'Así comenzó mi camino en el mundo del desarrollo web, lleno de curiosidad y sueños',
        action: '/about'
      }
    ]
  },
  {
    id: 'jny-00003',
    title: 'Mi forma de ser',
    Icon: BugIcon,
    description: (
      <div>
        <p>
          Me encantan las mascotas.{' '}
          <strong>
            A veces me paso el día admirando los grandes pelos de un gato o el inmenso corazón que puede llegar a tener un
            hámster.
          </strong>
        </p>
        <p>
          Me encuentro en sintonía con el mundo, porque este es mi encargo; es mi constante que permanecerá entre mis
          particularidades, un bug que no resolveré y un deploy que permanecerá perpetuo… aun si es viernes.
        </p>
        <p>
          Te voy a contar un secreto{' '}
          <strong>
            <em>
              <q>Para mi, programar es escribir una carta despedida.</q>
            </em>
          </strong>
        </p>
        <p>Si has llegado hasta aquí… algún día deberíamos tomarnos un café, Yo invito</p>
      </div>
    ),
    date: '2022-06-17',
    images: []
  }
] as const

export type PersonalJourney = (typeof personalJourneys)[number]
