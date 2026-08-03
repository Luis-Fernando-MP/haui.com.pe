import { marksPage } from './databases/marks'
import { projectsPage } from './databases/projects'
import { seriesPage } from './databases/series'
import type { DomainConfig } from './utils/generateDomain'

export const NOTION_PAGES = {
  projects: projectsPage,
  series: seriesPage,
  marks: marksPage
} as const satisfies Record<string, DomainConfig<any>>
