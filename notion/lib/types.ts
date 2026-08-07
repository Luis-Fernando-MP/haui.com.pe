import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

export type NotionRichText = {
  type: string
  text: { content: string; link: string | null }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href: string | null
}

export type NotionDB = {
  object: 'page' | 'database'
  id: string
  created_time: string
  last_edited_time: string
  cover?: { type: 'external'; external: { url: string } }
  icon: { type: 'external'; external: { url: string } }
  archived: boolean
  in_trash: boolean
  url: string
  public_url: string | null
}

export type InternalDbConfig = {
  name: string
  fields?: {
    tipo?: string
    id?: string
    leyenda?: string
  }
}

export type MdxImageContentProps = {
  blurhash: string
  placeholder: string
  bannerWidth: number
  bannerHeight: number
  thumbWidth: number
  thumbHeight: number
  aspectRatio: number
}

export type MdxContentProps = {
  words?: number
  readingTime?: number
  imageProps: MdxImageContentProps
  logoPath?: string
  authors?: { name: string; social: string; role: string }[]
  images?: { id: string; banner: string; thumb: string; caption: string }[]
}

export type NotionRowLike = {
  id: string
  cover?: { external: { url: string } }
  properties: {
    Name: { title: { plain_text: string }[] }
    'Última edición': { last_edited_time: string }
  }
}

export type DomainConfig<T extends NotionRowLike = NotionRowLike> = {
  id: string
  label: string
  option: number
  default?: boolean
  kind: 'smart' | 'basic'
  generateContent?: boolean
  query: Omit<QueryDatabaseParameters, 'start_cursor' | 'page_size'>
  content: (row: T, coverUrl: string | undefined, props: MdxContentProps) => string
  internalDB?: InternalDbConfig | null
}

export type GenerateOpts = {
  mode?: 'smart' | 'all' | 'selected'
  picks?: string
  skipConfirm?: boolean
  confirm?: () => Promise<boolean>
  requestPicks?: () => Promise<string>
}
