import fs from 'fs'
import path from 'path'
import { parse, stringify } from 'yaml'

export const tracePath = (domain: string) => path.join(process.cwd(), 'content', domain, 'trace.yaml')

export async function readTrace(filePath: string) {
  try {
    const raw = await fs.promises.readFile(filePath, 'utf8')
    const data = parse(raw) as {
      updated_at?: string
      pages?: Record<string, { title?: string; last_downloaded?: string; last_edited_notion?: string; path?: string }>
    }
    return { updated_at: data?.updated_at ?? '', pages: data?.pages ?? {} }
  } catch {
    return {
      updated_at: '',
      pages: {} as Record<string, { title?: string; last_downloaded?: string; last_edited_notion?: string; path?: string }>
    }
  }
}

export async function writeTrace(
  filePath: string,
  data: {
    updated_at: string
    pages: Record<string, { title: string; last_downloaded: string; last_edited_notion: string; path: string }>
  }
) {
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
  await fs.promises.writeFile(filePath, stringify(data, { lineWidth: 0 }), 'utf8')
}

export async function pagesToSync(
  remote: { id: string; title: string; last_edited: string }[],
  stored: Record<string, { title?: string; last_downloaded?: string; last_edited_notion?: string; path?: string }>
) {
  const checks = await Promise.all(
    remote.map(async page => {
      const entry = stored[page.id]
      if (!entry?.path) return { page, kind: 'new' as const }

      try {
        await fs.promises.access(path.resolve(process.cwd(), entry.path))
      } catch {
        return { page, kind: 'new' as const }
      }

      const remoteEdit = new Date(page.last_edited).getTime()
      const downloaded = entry.last_downloaded ? new Date(entry.last_downloaded).getTime() : 0
      if (remoteEdit > downloaded || page.last_edited !== entry.last_edited_notion) {
        return { page, kind: 'modified' as const }
      }

      return { page, kind: 'unchanged' as const }
    })
  )

  return {
    new: checks.filter(c => c.kind === 'new').map(c => c.page),
    modified: checks.filter(c => c.kind === 'modified').map(c => c.page),
    unchanged: checks.filter(c => c.kind === 'unchanged').map(c => c.page)
  }
}

export function resolvePicks<T extends { id: string; title: string }>(items: T[], picks: string) {
  if (!picks.trim()) return [] as T[]

  const selected = new Set<T>()
  for (const token of picks.split(/[,\s]+/).filter(Boolean)) {
    const asIndex = Number(token)
    if (Number.isInteger(asIndex) && asIndex >= 1 && asIndex <= items.length) {
      selected.add(items[asIndex - 1])
      continue
    }

    const match = items.find(p => p.id === token || p.id.startsWith(token) || p.title.toLowerCase().includes(token.toLowerCase()))
    if (match) selected.add(match)
  }

  return [...selected]
}
