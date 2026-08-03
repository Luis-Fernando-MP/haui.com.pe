import { NOTION_PAGES } from './pages'
import { generateDomain, type DomainConfig, type GenerateOpts } from './utils/generateDomain'

export type NotionPage = DomainConfig<any>
export type PageId = keyof typeof NOTION_PAGES
export type { GenerateOpts }

export const listPages = (): NotionPage[] =>
  [...(Object.values(NOTION_PAGES) as NotionPage[])].sort((a, b) => a.option - b.option)

export const defaultPage = (): NotionPage => listPages().find(p => p.default) ?? listPages()[0]

export const pageByOption = (option: string) => listPages().find(p => String(p.option) === option)

export const generate = (page: NotionPage, opts?: GenerateOpts) => generateDomain(page, opts)
