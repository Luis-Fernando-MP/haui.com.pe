import type { NotionDB, NotionRichText } from '@notion/lib/types'

export type MarksDB = NotionDB & {
  properties: {
    Folder: { type: 'select'; select: { name: string; color: string } | null } | null
    Tags: { type: 'multi_select'; multi_select: { name: string; color: string }[] } | null
    Estado: {
      type: 'status'
      status: { name: string; color: string } | null
    } | null
    Nivel: { type: 'select'; select: { name: string; color: string } | null } | null
    Sesión: { type: 'multi_select'; multi_select: { name: string; color: string }[] } | null
    Name: { type: 'title'; title: NotionRichText[] }
    'Fecha de creación': { type: 'created_time'; created_time: string }
    'Última edición': { type: 'last_edited_time'; last_edited_time: string }
    Visibilidad: {
      type: 'status'
      status: { name: 'Portafolio' | 'Privado'; color: string } | null
    }
  }
}
