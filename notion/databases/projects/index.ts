import path from 'path'

import { env } from '@notion/constants'
import cleanObsoleteFiles from '@notion/utils/cleanObsoleteFiles'
import { createDirectories } from '@notion/utils/fs'
import { generateBlock } from '@notion/utils/generateBlock'
import { getAllMarksDB } from '@notion/utils/getAllMarks'
import clog from '@notion/utils/log'
import { mapPool } from '@notion/utils/mapPool'
import { pagesToSync, readTrace, writeTrace } from '@notion/utils/traceYaml'

import { NotionProjectsDB } from './projects.type'
import { projectContent } from './str.content'

const PROJECT_CONCURRENCY = 3
const TRACE_PATH = path.join(process.cwd(), 'notion/databases/projects/trace.yaml')
const CONTENT_REL = (id: string) => `content/projects/${id}.mdx`

export const generateProjects = async ({
  mode = 'smart',
  picks = '',
  skipConfirm = false,
  confirm,
  requestPicks
}: {
  mode?: 'smart' | 'all' | 'selected'
  picks?: string
  skipConfirm?: boolean
  confirm?: () => Promise<boolean>
  requestPicks?: () => Promise<string>
} = {}) => {
  try {
    clog.block('GENERANDO PROYECTOS')
    const startAll = Date.now()

    clog.info('Cargando proyectos desde Notion...')
    const projects = await getAllMarksDB<NotionProjectsDB>({
      query: {
        database_id: env.PROJECTS_ID,
        filter: {
          and: [
            { property: 'Estado', status: { equals: 'Completado' } },
            { property: 'Progreso', number: { greater_than_or_equal_to: 0.8 } },
            { property: 'Visibilidad', status: { equals: 'Portafolio' } }
          ]
        }
      }
    })

    clog.success(`${projects.length} proyectos cargados\n`)

    const remote = projects.map(project => ({
      id: project.id,
      title: project.properties.Name.title[0].plain_text,
      last_edited: project.properties['Última edición'].last_edited_time,
      project
    }))

    const trace = await readTrace(TRACE_PATH)
    const diff = await pagesToSync(
      remote.map(({ id, title, last_edited }) => ({ id, title, last_edited })),
      trace.pages
    )

    clog.info(
      `Sync · ${diff.new.length} nuevos · ${diff.modified.length} modificados · ${diff.unchanged.length} al día`
    )

    let delta = remote
    if (mode === 'smart') {
      delta = remote.filter(p => [...diff.new, ...diff.modified].some(d => d.id === p.id))
    }

    if (mode === 'selected') {
      for (const [i, page] of remote.entries()) {
        console.log(`  ${i + 1}. ${page.title}  (${page.id.slice(0, 8)}…)`)
      }
      console.log('')
      const chosen = picks.trim() || (requestPicks ? await requestPicks() : '')
      delta = resolvePicks(remote, chosen)
    }

    if (delta.length === 0) {
      clog.success('Nada que sincronizar')
      return
    }

    if (mode !== 'selected') {
      for (const [i, page] of delta.entries()) {
        const tag = diff.new.some(d => d.id === page.id)
          ? 'new'
          : diff.modified.some(d => d.id === page.id)
            ? 'mod'
            : 'all'
        console.log(`  ${i + 1}. [${tag}] ${page.title}  (${page.id.slice(0, 8)}…)`)
      }
      console.log('')
    }

    if (mode === 'smart' && !skipConfirm && confirm) {
      const ok = await confirm()
      if (!ok) {
        clog.warn('Sync cancelado')
        return
      }
    }

    const [mdxFolderPath, mdxImagesPath] = await createDirectories(
      'content/projects',
      'public/content/projects'
    )

    const pages: Record<
      string,
      { title: string; last_downloaded: string; last_edited_notion: string; path: string }
    > = {}

    for (const [id, entry] of Object.entries(trace.pages)) {
      if (entry?.title && entry.last_downloaded && entry.last_edited_notion && entry.path) {
        pages[id] = {
          title: entry.title,
          last_downloaded: entry.last_downloaded,
          last_edited_notion: entry.last_edited_notion,
          path: entry.path
        }
      }
    }

    await mapPool(delta, PROJECT_CONCURRENCY, async item => {
      const { id, cover } = item.project
      const coverUrl = cover?.external.url
      const ok = await generateBlock({
        generateContent: true,
        blockId: id,
        coverImage: coverUrl,
        lastEditedTime: item.last_edited,
        mdxFolderPath,
        mdxImagesPath,
        title: item.title,
        mdxContent: imageProps => projectContent(item.project, coverUrl, imageProps)
      })

      if (!ok) return id

      pages[id] = {
        title: item.title,
        last_downloaded: new Date().toISOString(),
        last_edited_notion: item.last_edited,
        path: CONTENT_REL(id)
      }
      return id
    })

    const remoteIds = remote.map(p => p.id)
    const pruned: typeof pages = {}
    for (const id of remoteIds) {
      if (pages[id]) pruned[id] = pages[id]
    }

    await writeTrace(TRACE_PATH, {
      updated_at: new Date().toISOString(),
      pages: pruned
    })

    clog.block('LIMPIEZA DE ARCHIVOS OBSOLETOS')
    await Promise.all([
      cleanObsoleteFiles(remoteIds, mdxFolderPath, '.mdx'),
      cleanObsoleteFiles(remoteIds, mdxImagesPath)
    ])
    clog.timer('Tiempo total', Date.now() - startAll)
  } catch (e: any) {
    clog.error('Error generando los proyectos:')
    console.log(e?.message ?? e)
  }
}

function resolvePicks<T extends { id: string; title: string }>(remote: T[], picks: string) {
  if (!picks.trim()) return [] as T[]

  const tokens = picks
    .split(/[,\s]+/)
    .map(t => t.trim())
    .filter(Boolean)

  const selected = new Set<T>()
  for (const token of tokens) {
    const asIndex = Number(token)
    if (Number.isInteger(asIndex) && asIndex >= 1 && asIndex <= remote.length) {
      selected.add(remote[asIndex - 1])
      continue
    }

    const match = remote.find(
      p => p.id === token || p.id.startsWith(token) || p.title.toLowerCase().includes(token.toLowerCase())
    )
    if (match) selected.add(match)
  }

  return [...selected]
}
