import { env } from '@notion/constants'
import type { DomainConfig } from '@notion/utils/generateDomain'

import { NotionProjectsDB } from './projects.type'
import { projectContent } from './str.content'

export const projectsPage = {
  id: 'projects',
  label: 'Proyectos',
  option: 1,
  default: true,
  kind: 'smart',
  query: {
    database_id: env.PROJECTS_ID,
    filter: {
      and: [
        { property: 'Estado', status: { equals: 'Completado' } },
        { property: 'Progreso', number: { greater_than_or_equal_to: 0.8 } },
        { property: 'Visibilidad', status: { equals: 'Portafolio' } }
      ]
    }
  },
  content: projectContent
} as const satisfies DomainConfig<NotionProjectsDB>
