import fs from 'fs'
import path from 'path'
import { parse, stringify } from 'yaml'

export async function readTrace(filePath: string) {
  try {
    const raw = await fs.promises.readFile(filePath, 'utf8')
    const data = parse(raw) as {
      updated_at?: string
      pages?: Record<
        string,
        { title?: string; last_downloaded?: string; last_edited_notion?: string; path?: string }
      >
    }
    return { updated_at: data?.updated_at ?? '', pages: data?.pages ?? {} }
  } catch {
    return {
      updated_at: '',
      pages: {} as Record<
        string,
        { title?: string; last_downloaded?: string; last_edited_notion?: string; path?: string }
      >
    }
  }
}

export async function writeTrace(
  filePath: string,
  data: {
    updated_at: string
    pages: Record<
      string,
      { title: string; last_downloaded: string; last_edited_notion: string; path: string }
    >
  }
) {
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
  await fs.promises.writeFile(
    filePath,
    stringify(data, { lineWidth: 0 }),
    'utf8'
  )
}

export async function pagesToSync(
  remote: { id: string; title: string; last_edited: string }[],
  stored: Record<
    string,
    { title?: string; last_downloaded?: string; last_edited_notion?: string; path?: string }
  >
) {
  const newer: typeof remote = []
  const modified: typeof remote = []
  const unchanged: typeof remote = []

  for (const page of remote) {
    const entry = stored[page.id]
    if (!entry?.path) {
      newer.push(page)
      continue
    }

    try {
      await fs.promises.access(path.resolve(process.cwd(), entry.path))
    } catch {
      newer.push(page)
      continue
    }

    const remoteEdit = new Date(page.last_edited).getTime()
    const downloaded = entry.last_downloaded ? new Date(entry.last_downloaded).getTime() : 0
    if (remoteEdit > downloaded || page.last_edited !== entry.last_edited_notion) {
      modified.push(page)
      continue
    }

    unchanged.push(page)
  }

  return { new: newer, modified, unchanged }
}
