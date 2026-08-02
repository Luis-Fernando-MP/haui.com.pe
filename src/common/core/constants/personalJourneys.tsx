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
    title: 'Mi desorden',
    Icon: PuzzleIcon,
    description: (
      <div>
        <p>
          No sé lidiar ni con lo normal ni con lo perfecto. Solo soy, y cada proyecto que toco lo sabe. Si puedo mejorarlo,
          transformarlo o reinventarlo… lo haré. Para eso están mis manitas.
        </p>
        <p>
          Mi código a veces parece un cuarto sin barrer: caótico, lleno de esquinas olvidadas, pero con un encanto secreto que
          solo aparece cuando enciendes la luz.
        </p>
        <p>El conocimiento, como las espinas, duele al principio; pero un día entiendes que era la única forma de protegerte.</p>
      </div>
    ),
    date: '2024-05',
    images: [
      {
        src: '/assets/testimonies/default_profile.webp',
        caption: 'Un puerco que me recuerda que todos empezamos con lo simple'
      }
    ]
  },
  {
    id: 'jny-00002',
    title: 'Mis inicios',
    Icon: InfinityIcon,
    description: (
      <div>
        <p>
          Mi camino comenzó en 2021, cuando obtuve el título de{' '}
          <strong>Técnico en Diseño y Programación de Aplicaciones Web</strong>.
        </p>
        <p>
          Desde entonces, he seguido formándome y actualmente curso el octavo ciclo de la carrera de{' '}
          <strong>Ingeniería de Software</strong> en la Universidad Tecnológica del Perú.
        </p>
      </div>
    ),
    date: '2025-01',
    images: [
      {
        src: '/assets/achievements/tecnico-en-diseño-y-programacion-de-aplicaciones-web.webp',
        caption: 'Técnico en Diseño y Programación de Aplicaciones Web',
        action: 'https://titulosinstitutos.minedu.gob.pe',
        actionText: 'Consultar information'
      },
      {
        src: '/assets/achievements/tecnico-en-diseño-y-programacion-de-aplicaciones-web-2.webp'
      },
      { src: '/assets/achievements/tecnico-en-diseño-y-programacion-de-aplicaciones-web-3.webp' }
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
          Una de mis particularidades es esa forma de ver el mundo desde adentro. No hablaré mucho, pero dentro ya habré vivido
          una historia completa. Encuentro paz mientras abrazo mis propios colores, aunque a veces duelan.
        </p>
        <p>
          Te voy a contar un secreto:{' '}
          <strong>
            <em>
              <q>Para mí, programar es como escribir una carta de despedida: un acto íntimo, bello y un poco trágico.</q>
            </em>
          </strong>
        </p>
        <p>Si has llegado hasta aquí… algún día deberíamos tomarnos un café. Yo invito.</p>
        <p>
          Soy un cactus: callado, separado, paciente, a veces pinchudo, pero en silencio, dare las rosas mas hermosas del mundo.
        </p>
      </div>
    ),
    date: '2022-06-17',
    images: []
  }
] as const

export type PersonalJourney = (typeof personalJourneys)[number]
