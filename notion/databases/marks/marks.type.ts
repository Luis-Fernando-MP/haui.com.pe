import type { NotionDB, NotionMDVisibility, NotionRichText } from '@notion/types/notion.type'

export type NotionMarkStatus = 'Sin empezar' | 'Editando' | 'Completado'

interface Properties {
  Folder: {
    type: 'select'
    select: { name: string; color: string } | null
  } | null

  Tags: {
    type: 'multi_select'
    multi_select: { name: string; color: string }[]
  } | null

  Estado: {
    type: 'status'
    status: {
      name: NotionMarkStatus
      color: string
    } | null
  } | null

  Nivel: {
    type: 'select'
    select: { name: string; color: string } | null
  } | null

  Sesión: {
    type: 'multi_select'
    multi_select: { name: string; color: string }[]
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

export interface NotionMarksDB extends NotionDB {
  properties: Properties & NotionMDVisibility
}
