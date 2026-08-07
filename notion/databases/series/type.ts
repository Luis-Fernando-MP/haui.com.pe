import type { NotionDB, NotionRichText } from '@notion/lib/types'

export type SeriesDB = NotionDB & {
  properties: {
    Grupo: {
      type: 'status'
      status: { id: string; name: string; color: string }
    } | null
    Tags: { type: 'multi_select'; multi_select: { name: string; color: string }[] } | null
    Folder: { type: 'select'; select: { name: string; color: string } | null } | null
    'Profesor(es)': { type: 'rich_text'; rich_text: (NotionRichText | null)[] } | null
    Name: { type: 'title'; title: NotionRichText[] }
    'Fecha de creación': { type: 'created_time'; created_time: string }
    'Última edición': { type: 'last_edited_time'; last_edited_time: string }
    Visibilidad: {
      type: 'status'
      status: { name: 'Portafolio' | 'Privado'; color: string } | null
    }
  }
}
