import clog from '@notion/utils/cli/log'
import { readTrace, tracePath, writeTrace } from '@notion/utils/local/traceYaml'
import fs from 'fs'
import path from 'path'

type LocalPage = { id: string; title: string; path: string }

export async function listTracedPages(domain: string): Promise<LocalPage[]> {
  const { pages } = await readTrace(tracePath(domain))
  const dir = path.join(process.cwd(), 'content', domain)

  let files: string[] = []
  try {
    files = (await fs.promises.readdir(dir)).filter(f => f.endsWith('.mdx'))
  } catch {
    files = []
  }

  if (files.length > 0) {
    return files.map(file => {
      const id = file.slice(0, -4)
      return {
        id,
        title: pages[id]?.title ?? id,
        path: pages[id]?.path ?? `content/${domain}/${file}`
      }
    })
  }

  return Object.entries(pages).map(([id, entry]) => ({
    id,
    title: entry.title ?? id,
    path: entry.path ?? `content/${domain}/${id}.mdx`
  }))
}

export async function purgeLocal(domain: string, ids: string[]) {
  if (ids.length === 0) return 0

  const cwd = process.cwd()
  const mdxDir = path.join(cwd, 'content', domain)
  const imgDir = path.join(cwd, 'public', 'content', domain)
  const file = tracePath(domain)
  const trace = await readTrace(file)

  await Promise.all(
    ids.map(async id => {
      delete trace.pages[id]
      await Promise.all([
        fs.promises.unlink(path.join(mdxDir, `${id}.mdx`)).catch(() => {}),
        fs.promises.rm(path.join(imgDir, id), { recursive: true, force: true }).catch(() => {})
      ])
    })
  )

  const pages: Record<string, { title: string; last_downloaded: string; last_edited_notion: string; path: string }> = {}

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

  if (Object.keys(pages).length === 0) await fs.promises.unlink(file).catch(() => {})
  else await writeTrace(file, { updated_at: new Date().toISOString(), pages })

  clog.success(`Eliminados ${ids.length}`)
  return ids.length
}
