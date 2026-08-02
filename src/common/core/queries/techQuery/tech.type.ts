import { GitBranchIcon, PackageIcon, PaintbrushIcon, ServerIcon } from 'lucide-react'

export const technologyCategories = {
  framework: 10,
  language: 9,
  runtime: 9,
  database: 9,
  nosql: 9,
  sql: 9,
  cloud: 9,
  devops: 9,
  library: 8,
  style: 8,
  design: 8,
  superset: 8,
  hosting: 8,
  scripting: 8,
  IDE: 8,
  ORM: 7,
  container: 7,
  preprocessor: 7,
  'build-tool': 6,
  'query-language': 7,
  'utility-first': 7,
  'web-standard': 7,
  api: 6,
  browser: 6,
  testing: 6,
  VCS: 6,
  markup: 5,
  editor: 3,
  OS: 3,
  methodology: 2,
  presentation: 4,
  spreadsheet: 4,
  CMS: 7
} as const

export type TechnologyCategory = keyof typeof technologyCategories

export const technologyStack = {
  frontend: PaintbrushIcon,
  backend: ServerIcon,
  devops: GitBranchIcon,
  Kit: PackageIcon
} as const

export const TechnologyLevel = { Incursionando: 1, Aprendiendo: 2 }

export type TechnologyStack = keyof typeof technologyStack

export type Technology = {
  name: string
  icon: string
  level: keyof typeof TechnologyLevel
  color: string
  categories: TechnologyCategory[]
  stack: TechnologyStack[]
  favorite?: boolean
  notionPage?: string
}

export const listOfOrders = ['Categoría', 'Experiencia', 'Nombre'] as const

export type OrderDirection = 'asc' | 'desc'

export type OrderBy = (typeof listOfOrders)[number]

export type FiltersTechnologies = {
  level?: Technology['level']
  categories?: TechnologyCategory[]
  stack?: TechnologyStack
  hasNotionPage?: boolean
  orderBy?: OrderBy[]
  orderDirection?: OrderDirection
}

export const stackAliases: Record<TechnologyStack, TechnologyStack[]> = {
  backend: ['backend'],
  frontend: ['frontend'],
  Kit: ['Kit'],
  devops: ['devops']
}
