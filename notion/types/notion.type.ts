export type NotionGroupVisibility = 'Portafolio' | 'Privado'

interface ExternalURL {
  url: string
}

interface Cover {
  type: 'external'
  external: ExternalURL
}

interface Icon {
  type: 'external'
  external: ExternalURL
}

export interface NotionMDVisibility {
  Visibilidad: {
    type: 'status'
    status: { name: NotionGroupVisibility; color: string } | null
  }
}

export interface NotionRichText {
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

type NotionObject = 'page' | 'database'

export interface NotionDB {
  object: NotionObject
  id: string
  created_time: string
  last_edited_time: string

  cover?: Cover
  icon: Icon
  archived: boolean
  in_trash: boolean
  url: string
  public_url: string | null
}
