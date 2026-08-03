import type { NotionDB, NotionMDVisibility, NotionRichText } from '@notion/types/notion.type'

export type NotionGroup = 'Apuntes' | 'Series' | 'Libros'

interface Properties {
  Grupo: {
    type: 'status'
    status: {
      id: 'dc76b782-b92e-4dfb-9692-5b6ca3af74fd'
      name: NotionGroup
      color: string
    }
  } | null

  Tags: {
    type: 'multi_select'
    multi_select: { name: string; color: string }[]
  } | null

  Folder: {
    type: 'select'
    select: { name: string; color: string } | null
  } | null

  'Profesor(es)': {
    type: 'rich_text'
    rich_text: (NotionRichText | null)[]
  } | null

  Name: {
    type: 'title'
    title: NotionRichText[]
  }

  'Fecha de creación': {
    type: 'created_time'
    created_time: string
  }

  'Última edición': {
    type: 'last_edited_time'
    last_edited_time: string
  }
}

export interface NotionSeriesDB extends NotionDB {
  folder?: string
  content?: string
  properties: Properties & NotionMDVisibility
}
