import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

import cleanObsoleteFiles from '@notion/utils/cleanObsoleteFiles'
import { createDirectories } from '@notion/utils/fs'
import { generateBlock, type MdxContentProps } from '@notion/utils/generateBlock'
import { getAllMarksDB } from '@notion/utils/getAllMarks'
import clog from '@notion/utils/log'
import { mapPool } from '@notion/utils/mapPool'
import { pagesToSync, readTrace, resolvePicks, tracePath, writeTrace } from '@notion/utils/traceYaml'

const CONCURRENCY = 3

type NotionRowLike = {
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
  query: Omit<QueryDatabaseParameters, 'start_cursor' | 'page_size'>
  generateContent?: boolean
  content: (row: T, coverUrl: string | undefined, props: MdxContentProps) => string
}

export type GenerateOpts = {
  mode?: 'smart' | 'all' | 'selected'
  picks?: string
  skipConfirm?: boolean
  confirm?: () => Promise<boolean>
  requestPicks?: () => Promise<string>
}

type RemoteItem<T> = {
  id: string
  title: string
  last_edited: string
  coverUrl: string | undefined
  row: T
}

type TracePage = {
  title: string
  last_downloaded: string
  last_edited_notion: string
  path: string
}

const contentRel = (domain: string, id: string) => `content/${domain}/${id}.mdx`

const toRemote = <T extends NotionRowLike>(row: T): RemoteItem<T> => ({
  id: row.id,
  title: row.properties.Name.title[0].plain_text,
  last_edited: row.properties['Última edición'].last_edited_time,
  coverUrl: row.cover?.external.url,
  row
})

const cloneTracePages = (stored: Awaited<ReturnType<typeof readTrace>>['pages']) =>
  Object.fromEntries(
    Object.entries(stored).flatMap(([id, entry]) => {
      if (!entry?.title || !entry.last_downloaded || !entry.last_edited_notion || !entry.path) return []
      return [
        [
          id,
          {
            title: entry.title,
            last_downloaded: entry.last_downloaded,
            last_edited_notion: entry.last_edited_notion,
            path: entry.path
          } satisfies TracePage
        ] as const
      ]
    })
  ) as Record<string, TracePage>

async function writeBlocks<T extends NotionRowLike>(
  config: DomainConfig<T>,
  items: RemoteItem<T>[],
  mdxFolderPath: string,
  mdxImagesPath: string,
  onOk?: (item: RemoteItem<T>) => void
) {
  await mapPool(items, CONCURRENCY, async item => {
    const ok = await generateBlock({
      blockId: item.id,
      coverImage: item.coverUrl,
      lastEditedTime: item.last_edited,
      mdxFolderPath,
      mdxImagesPath,
      title: item.title,
      generateContent: config.generateContent,
      loadProjectAssets: config.id === 'projects',
      mdxContent: props => config.content(item.row, item.coverUrl, props)
    })
    if (ok) onOk?.(item)
  })
}

export async function generateDomain<T extends NotionRowLike>(
  config: DomainConfig<T>,
  opts: GenerateOpts = {}
) {
  const { mode = 'smart', picks = '', skipConfirm = false, confirm, requestPicks } = opts

  try {
    clog.block(config.label)
    const started = Date.now()

    clog.info('Notion…')
    const rows = await getAllMarksDB<T>({ query: config.query })
    clog.success(`${rows.length} remotos`)

    const remote = rows.map(toRemote)
    const [mdxFolderPath, mdxImagesPath] = await createDirectories(
      `content/${config.id}`,
      `public/content/${config.id}`
    )

    if (config.kind === 'basic') {
      await writeBlocks(config, remote, mdxFolderPath, mdxImagesPath)
      const remoteIds = remote.map(p => p.id)
      await Promise.all([
        cleanObsoleteFiles(remoteIds, mdxFolderPath, '.mdx'),
        cleanObsoleteFiles(remoteIds, mdxImagesPath)
      ])
      clog.timer('total', Date.now() - started)
      return
    }

    const file = tracePath(config.id)
    const trace = await readTrace(file)
    const diff = await pagesToSync(
      remote.map(({ id, title, last_edited }) => ({ id, title, last_edited })),
      trace.pages
    )

    const newIds = new Set(diff.new.map(p => p.id))
    const modIds = new Set(diff.modified.map(p => p.id))
    clog.info(`+${diff.new.length}  ~${diff.modified.length}  =${diff.unchanged.length}`)

    let delta = remote
    if (mode === 'smart') delta = remote.filter(p => newIds.has(p.id) || modIds.has(p.id))

    if (mode === 'selected') {
      for (const [i, page] of remote.entries()) clog.item(i + 1, page.title, page.id.slice(0, 8))
      const chosen = picks.trim() || (requestPicks ? await requestPicks() : '')
      delta = resolvePicks(remote, chosen)
    }

    if (delta.length === 0) {
      clog.success('Sin cambios')
      return
    }

    if (mode !== 'selected') {
      for (const [i, page] of delta.entries()) {
        const tag = newIds.has(page.id) ? '+' : modIds.has(page.id) ? '~' : '*'
        clog.item(i + 1, `${tag} ${page.title}`)
      }
    }

    if (mode === 'smart' && !skipConfirm && confirm && !(await confirm())) {
      clog.warn('Cancelado')
      return
    }

    const pages = cloneTracePages(trace.pages)

    await writeBlocks(config, delta, mdxFolderPath, mdxImagesPath, item => {
      pages[item.id] = {
        title: item.title,
        last_downloaded: new Date().toISOString(),
        last_edited_notion: item.last_edited,
        path: contentRel(config.id, item.id)
      }
    })

    const remoteIds = remote.map(p => p.id)
    const keep = new Set(remoteIds)
    const pruned = Object.fromEntries(Object.entries(pages).filter(([id]) => keep.has(id)))

    await writeTrace(file, { updated_at: new Date().toISOString(), pages: pruned })
    await Promise.all([
      cleanObsoleteFiles(remoteIds, mdxFolderPath, '.mdx'),
      cleanObsoleteFiles(remoteIds, mdxImagesPath)
    ])
    clog.timer('total', Date.now() - started)
  } catch (e: any) {
    clog.error(config.id)
    console.log(e?.message ?? e)
  }
}
