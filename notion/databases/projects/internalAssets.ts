import { getAllBlocks } from '@notion/utils/getAllBlocks'
import { getAllMarksDB } from '@notion/utils/getAllMarks'
import clog from '@notion/utils/log'
import type { NotionRichText } from '@notion/types/notion.type'

export type InternalAssetTipo = 'Autores' | 'Imagen' | 'Logo'

export type InternalAuthor = {
  name: string
  social: string
  role: string
}

export type InternalImageRef = {
  id: string
  url: string
  caption: string
}

export type InternalAssets = {
  logoUrl: string | undefined
  images: InternalImageRef[]
  authors: InternalAuthor[]
}

const EMPTY: InternalAssets = { logoUrl: undefined, images: [], authors: [] }

/** Título fijo de la child_database de assets en cada proyecto. */
const METADATA_DB_TITLE = 'metadata'

type ChildDatabaseBlock = {
  type?: string
  id?: string
  child_database?: { title?: string | null } | null
}

type NotionProp = Record<string, unknown> | null | undefined

const richTextPlain = (prop: NotionProp) => {
  if (!prop || typeof prop !== 'object') return ''
  const rich = (prop as { rich_text?: (NotionRichText | null)[] }).rich_text
  if (!Array.isArray(rich)) return ''
  return rich
    .map(rt => rt?.plain_text ?? '')
    .join('')
    .trim()
}

const titlePlain = (prop: NotionProp) => {
  if (!prop || typeof prop !== 'object') return ''
  const title = (prop as { title?: NotionRichText[] }).title
  if (!Array.isArray(title)) return ''
  return title
    .map(rt => rt?.plain_text ?? '')
    .join('')
    .trim()
}

const selectName = (prop: NotionProp) => {
  if (!prop || typeof prop !== 'object') return ''
  const select = (prop as { select?: { name?: string } | null }).select
  const status = (prop as { status?: { name?: string } | null }).status
  return (select?.name ?? status?.name ?? '').trim()
}

const propPlain = (props: Record<string, NotionProp>, key: string) => {
  const prop = props[key]
  if (!prop || typeof prop !== 'object') return ''
  const type = (prop as { type?: string }).type
  if (type === 'title') return titlePlain(prop)
  if (type === 'select' || type === 'status') return selectName(prop)
  return richTextPlain(prop)
}

const imageUrlFromBlock = (block: {
  type?: string
  image?: { type?: string; file?: { url?: string }; external?: { url?: string } }
}) => {
  if (block.type !== 'image' || !block.image) return undefined
  if (block.image.type === 'external') return block.image.external?.url
  return block.image.file?.url
}

async function firstImageUrl(pageId: string) {
  const blocks = await getAllBlocks({ blockID: pageId })
  for (const block of blocks) {
    const url = imageUrlFromBlock(block)
    if (url) return url
  }
  return undefined
}

const cellPlain = (cell: NotionRichText[] | undefined) =>
  (cell ?? [])
    .map(rt => rt?.plain_text ?? '')
    .join('')
    .trim()

const cellHref = (cell: NotionRichText[] | undefined) => {
  for (const rt of cell ?? []) {
    if (rt?.href) return rt.href
    if (rt?.text?.link) return rt.text.link
  }
  return ''
}

async function parseAuthorsTable(pageId: string): Promise<InternalAuthor[]> {
  const blocks = await getAllBlocks({ blockID: pageId })
  const table = blocks.find((b: { type?: string }) => b.type === 'table')
  if (!table?.id) return []

  const rows = await getAllBlocks({ blockID: table.id })
  const cellsList = rows
    .filter((r: { type?: string }) => r.type === 'table_row')
    .map((r: { table_row?: { cells?: NotionRichText[][] } }) => r.table_row?.cells ?? [])

  if (cellsList.length < 2) return []

  const header = cellsList[0].map(cell => cellPlain(cell).toLowerCase())
  const nameIdx = header.findIndex(h => h.includes('nombre'))
  const socialIdx = header.findIndex(h => h.includes('social'))
  const roleIdx = header.findIndex(h => h.includes('rol') || h.includes('cargo'))

  if (nameIdx < 0) {
    clog.warn('autores: sin columna Nombre')
    return []
  }

  const authors: InternalAuthor[] = []
  for (const cells of cellsList.slice(1)) {
    const name = cellPlain(cells[nameIdx])
    if (!name) continue
    authors.push({
      name,
      social: socialIdx >= 0 ? cellHref(cells[socialIdx]) || cellPlain(cells[socialIdx]) : '',
      role: roleIdx >= 0 ? cellPlain(cells[roleIdx]) : ''
    })
  }
  return authors
}

/**
 * Lee la child_database opcional `metadata` del proyecto (Tipo / ID / Leyenda).
 * Si no existe o falla, devuelve assets vacíos sin tumbar el sync.
 */
export async function loadInternalAssets(pageBlocks: ChildDatabaseBlock[]): Promise<InternalAssets> {
  const childDbs = pageBlocks.filter(b => {
    if (b.type !== 'child_database' || !b.id) return false
    const title = (b.child_database?.title ?? '').trim().toLowerCase()
    return title === METADATA_DB_TITLE
  })

  if (childDbs.length === 0) return EMPTY

  for (const db of childDbs) {
    try {
      const rows = await getAllMarksDB<Record<string, any>>({
        query: { database_id: db.id! }
      })

      if (rows.length === 0) return EMPTY

      const sampleProps = rows[0]?.properties as Record<string, NotionProp> | undefined
      if (!sampleProps || !('Tipo' in sampleProps)) {
        clog.warn('metadata: sin property Tipo')
        return EMPTY
      }

      let logoUrl: string | undefined
      const images: InternalImageRef[] = []
      const authors: InternalAuthor[] = []

      for (const row of rows) {
        try {
          const props = (row.properties ?? {}) as Record<string, NotionProp>
          const tipo = propPlain(props, 'Tipo') as InternalAssetTipo | string
          const assetId = propPlain(props, 'ID')
          const caption = propPlain(props, 'Leyenda')

          if (tipo === 'Logo') {
            if (logoUrl) continue
            const url = await firstImageUrl(row.id)
            if (url) logoUrl = url
            else clog.warn(`logo sin imagen (${row.id.slice(0, 8)})`)
            continue
          }

          if (tipo === 'Imagen') {
            if (!assetId) {
              clog.warn(`imagen sin ID (${row.id.slice(0, 8)})`)
              continue
            }
            const url = await firstImageUrl(row.id)
            if (!url) {
              clog.warn(`imagen ${assetId} sin archivo`)
              continue
            }
            images.push({ id: assetId, url, caption })
            continue
          }

          if (tipo === 'Autores') {
            const parsed = await parseAuthorsTable(row.id)
            authors.push(...parsed)
            continue
          }

          if (tipo) clog.warn(`tipo desconocido: ${tipo}`)
        } catch (err) {
          clog.warn(`fila assets: ${err instanceof Error ? err.message : 'error'}`)
        }
      }

      return { logoUrl, images, authors }
    } catch (err) {
      clog.warn(`metadata db: ${err instanceof Error ? err.message : 'error'}`)
    }
  }

  return EMPTY
}
