import clog from '@notion/utils/cli/log'
import { getAllBlocks, getAllMarksDB } from '@notion/utils/query/fetch'
import type { InternalDbConfig, NotionRichText } from '@notion/lib/types'

type ChildDatabaseBlock = {
  type?: string
  id?: string
  child_database?: { title?: string | null } | null
}

type NotionProp = Record<string, unknown> | null | undefined

const propPlain = (props: Record<string, NotionProp>, key: string) => {
  const prop = props[key]
  if (!prop || typeof prop !== 'object') return ''
  const type = (prop as { type?: string }).type
  if (type === 'title') {
    const title = (prop as { title?: NotionRichText[] }).title
    if (!Array.isArray(title)) return ''
    return title
      .map(rt => rt?.plain_text ?? '')
      .join('')
      .trim()
  }
  if (type === 'select' || type === 'status') {
    const select = (prop as { select?: { name?: string } | null }).select
    const status = (prop as { status?: { name?: string } | null }).status
    return (select?.name ?? status?.name ?? '').trim()
  }
  const rich = (prop as { rich_text?: (NotionRichText | null)[] }).rich_text
  if (!Array.isArray(rich)) return ''
  return rich
    .map(rt => rt?.plain_text ?? '')
    .join('')
    .trim()
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

async function parseAuthorsTable(pageId: string) {
  const blocks = await getAllBlocks({ blockID: pageId })
  const table = blocks.find((b: { type?: string }) => b.type === 'table') as { id?: string } | undefined
  if (!table?.id) return [] as { name: string; social: string; role: string }[]

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

  const authors: { name: string; social: string; role: string }[] = []
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

export async function loadInternalAssets(
  pageBlocks: ChildDatabaseBlock[],
  config: InternalDbConfig
): Promise<{
  logoUrl: string | undefined
  images: { id: string; url: string; caption: string }[]
  authors: { name: string; social: string; role: string }[]
}> {
  const empty = {
    logoUrl: undefined as string | undefined,
    images: [] as { id: string; url: string; caption: string }[],
    authors: [] as { name: string; social: string; role: string }[]
  }

  const name = config.name.trim().toLowerCase()
  const tipoKey = config.fields?.tipo ?? 'Tipo'
  const idKey = config.fields?.id ?? 'ID'
  const leyendaKey = config.fields?.leyenda ?? 'Leyenda'

  const childDbs = pageBlocks.filter(b => {
    if (b.type !== 'child_database' || !b.id) return false
    return (b.child_database?.title ?? '').trim().toLowerCase() === name
  })

  if (childDbs.length === 0) return empty

  for (const db of childDbs) {
    try {
      const rows = await getAllMarksDB<Record<string, any>>({
        query: { database_id: db.id! }
      })

      if (rows.length === 0) return empty

      const sampleProps = rows[0]?.properties as Record<string, NotionProp> | undefined
      if (!sampleProps || !(tipoKey in sampleProps)) {
        clog.warn(`${config.name}: sin property ${tipoKey}`)
        return empty
      }

      let logoUrl: string | undefined
      const images: { id: string; url: string; caption: string }[] = []
      const authors: { name: string; social: string; role: string }[] = []

      for (const row of rows) {
        try {
          const props = (row.properties ?? {}) as Record<string, NotionProp>
          const tipo = propPlain(props, tipoKey)
          const assetId = propPlain(props, idKey)
          const caption = propPlain(props, leyendaKey)

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
            authors.push(...(await parseAuthorsTable(row.id)))
            continue
          }

          if (tipo) clog.warn(`tipo desconocido: ${tipo}`)
        } catch (err) {
          clog.warn(`fila assets: ${err instanceof Error ? err.message : 'error'}`)
        }
      }

      return { logoUrl, images, authors }
    } catch (err) {
      clog.warn(`${config.name} db: ${err instanceof Error ? err.message : 'error'}`)
    }
  }

  return empty
}
