import { env } from '@notion/constants'
import type { NotionGroupVisibility } from '@notion/types/notion.type'
import type { DomainConfig } from '@notion/utils/generateDomain'

import { NotionSeriesDB } from './series.type'
import { serieContent } from './str.content'

export const seriesPage = {
  id: 'series',
  label: 'Series',
  option: 2,
  kind: 'basic',
  generateContent: false,
  query: {
    database_id: env.SERIES_ID,
    filter: {
      property: 'Visibilidad',
      status: { equals: 'Portafolio' as NotionGroupVisibility }
    }
  },
  content: serieContent
} as const satisfies DomainConfig<NotionSeriesDB>
