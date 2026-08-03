import type { NotionDB, NotionMDVisibility, NotionRichText } from '@notion/types/notion.type'

export type NotionProjectStatus = 'Sin empezar' | 'Fase 1' | 'Fase 2' | 'Fase 3' | 'Completado'

interface Properties {
  Name: {
    type: 'title'
    title: NotionRichText[]
  }

  Github: { id: string; type: 'url'; url?: string } | null
  Website: { id: string; type: 'url'; url?: string } | null
  Figma: { id: string; type: 'url'; url?: string } | null
  Notion: { id: string; type: 'url'; url?: string } | null
  Logo: { id: string; type: 'url'; url?: string } | null

  Resumen?: {
    type: 'rich_text'
    rich_text: (NotionRichText | null)[]
  } | null

  Relevancia: {
    type: 'status'
    status: {
      name: NotionProjectStatus
      color: string
    } | null
  } | null

  Prioridad: {
    type: 'select'
    select: { name: string; color: string } | null
  } | null

  Equipo: {
    type: 'select'
    select: { name: string; color: string } | null
  } | null

  Progreso: {
    type: 'number'
    number: number | null
  } | null

  Estado: {
    type: 'status'
    status: {
      name: NotionProjectStatus
      color: string
    } | null
  } | null

  Tags: {
    type: 'multi_select'
    multi_select: { name: string; color: string }[]
  } | null

  'Fecha de creación': {
    type: 'created_time'
    created_time: string
  }

  'Última edición': {
    type: 'last_edited_time'
    last_edited_time: string
  }
}

export interface NotionProjectsDB extends NotionDB {
  properties: Properties & NotionMDVisibility
}
