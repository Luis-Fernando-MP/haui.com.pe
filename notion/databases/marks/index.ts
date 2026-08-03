import { env } from '@notion/constants'
import type { NotionGroupVisibility } from '@notion/types/notion.type'
import type { DomainConfig } from '@notion/utils/generateDomain'

import { NotionMarkStatus, NotionMarksDB } from './marks.type'
import { markContent } from './str.content'

export const marksPage = {
  id: 'marks',
  label: 'Marks',
  option: 3,
  kind: 'basic',
  query: {
    database_id: env.MARKS_ID,
    filter: {
      and: [
        {
          or: [{ property: 'Estado', status: { equals: 'Completado' as NotionMarkStatus } }]
        },
        { property: 'Visibilidad', status: { equals: 'Portafolio' as NotionGroupVisibility } }
      ]
    }
  },
  content: markContent
} as const satisfies DomainConfig<NotionMarksDB>
