import { env } from '@notion/lib/env'
import type { DomainConfig } from '@notion/lib/types'

import { serieContent } from './content'
import type { SeriesDB } from './type'

export const series = {
  id: 'series',
  label: 'Series',
  option: 2,
  kind: 'basic',
  generateContent: false,
  internalDB: null,
  query: {
    database_id: env.SERIES_ID,
    filter: {
      property: 'Visibilidad',
      status: { equals: 'Portafolio' }
    }
  },
  content: serieContent
} as const satisfies DomainConfig<SeriesDB>
