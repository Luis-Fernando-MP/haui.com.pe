import { env } from '@notion/lib/env'
import type { DomainConfig } from '@notion/lib/types'

import { projectContent } from './content'
import type { ProjectsDB } from './type'

export const projects = {
  id: 'projects',
  label: 'Proyectos',
  option: 1,
  default: true,
  kind: 'smart',
  internalDB: {
    name: 'metadata',
    fields: { tipo: 'Tipo', id: 'ID', leyenda: 'Leyenda' }
  },
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
} as const satisfies DomainConfig<ProjectsDB>
