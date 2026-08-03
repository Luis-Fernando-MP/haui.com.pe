import { env } from '@notion/constants'
import cleanObsoleteFiles from '@notion/utils/cleanObsoleteFiles'
import { createDirectories } from '@notion/utils/fs'
import { generateBlock } from '@notion/utils/generateBlock'
import { getAllMarksDB } from '@notion/utils/getAllMarks'
import clog from '@notion/utils/log'
import { mapPool } from '@notion/utils/mapPool'
import { pagesToSync, readTrace, resolvePicks, tracePath, writeTrace } from '@notion/utils/traceYaml'

import { NotionProjectsDB } from './projects.type'
import { projectContent } from './str.content'

const CONCURRENCY = 3
const DOMAIN = 'projects'
const CONTENT_REL = (id: string) => `content/${DOMAIN}/${id}.mdx`

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
    clog.block('Proyectos')
    const started = Date.now()

    clog.info('Notion…')
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

    clog.success(`${projects.length} remotos`)

    const remote = projects.map(project => ({
      id: project.id,
      title: project.properties.Name.title[0].plain_text,
      last_edited: project.properties['Última edición'].last_edited_time,
      project
    }))

    const file = tracePath(DOMAIN)
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

    const [mdxFolderPath, mdxImagesPath] = await createDirectories(
      `content/${DOMAIN}`,
      `public/content/${DOMAIN}`
    )

    const pages = Object.fromEntries(
      Object.entries(trace.pages).flatMap(([id, entry]) => {
        if (!entry?.title || !entry.last_downloaded || !entry.last_edited_notion || !entry.path) return []
        return [
          [
            id,
            {
              title: entry.title,
              last_downloaded: entry.last_downloaded,
              last_edited_notion: entry.last_edited_notion,
              path: entry.path
            }
          ] as const
        ]
      })
    )

    await mapPool(delta, CONCURRENCY, async item => {
      const coverUrl = item.project.cover?.external.url
      const ok = await generateBlock({
        blockId: item.id,
        coverImage: coverUrl,
        lastEditedTime: item.last_edited,
        mdxFolderPath,
        mdxImagesPath,
        title: item.title,
        mdxContent: imageProps => projectContent(item.project, coverUrl, imageProps)
      })

      if (!ok) return

      pages[item.id] = {
        title: item.title,
        last_downloaded: new Date().toISOString(),
        last_edited_notion: item.last_edited,
        path: CONTENT_REL(item.id)
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
    clog.error('proyectos')
    console.log(e?.message ?? e)
  }
}
