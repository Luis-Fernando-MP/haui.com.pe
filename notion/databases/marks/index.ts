import { env } from '@notion/lib/env'
import type { DomainConfig } from '@notion/lib/types'

import { markContent } from './content'
import type { MarksDB } from './type'

export const marks = {
  id: 'marks',
  label: 'Marks',
  option: 3,
  kind: 'basic',
  internalDB: null,
  query: {
    database_id: env.MARKS_ID,
    filter: {
      and: [
        { or: [{ property: 'Estado', status: { equals: 'Completado' } }] },
        { property: 'Visibilidad', status: { equals: 'Portafolio' } }
      ]
    }
  },
  content: markContent
} as const satisfies DomainConfig<MarksDB>
