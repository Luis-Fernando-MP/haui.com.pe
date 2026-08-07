import notion from '@notion/lib/api'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

async function paginate<T>(
  quantity: number,
  fetchPage: (pageSize: number, startCursor?: string) => Promise<{
    results: T[]
    has_more: boolean
    next_cursor: string | null
  }>
) {
  const all: T[] = []
  let hasMore = true
  let startCursor: string | undefined
  const pageSize = quantity === -1 ? 100 : Math.min(quantity, 100)

  while (hasMore) {
    const { results, has_more, next_cursor } = await fetchPage(pageSize, startCursor)
    all.push(...results)
    hasMore = has_more
    startCursor = next_cursor ?? undefined
    if (quantity !== -1 && all.length >= quantity) break
  }

  return all
}

/** Bloques hijos de una página/block. */
export async function getAllBlocks<T = any>({
  quantity = -1,
  blockID
}: {
  blockID: string
  quantity?: number
}): Promise<T[]> {
  return paginate<T>(quantity, async (page_size, start_cursor) => {
    const response = await notion.blocks.children.list({
      block_id: blockID,
      start_cursor,
      page_size
    })
    if (!response) throw new Error('Failed to retrieve blocks')
    return {
      results: response.results as T[],
      has_more: response.has_more,
      next_cursor: response.next_cursor
    }
  })
}

/** Filas de un database (marks/projects/series). */
export async function getAllMarksDB<T = any>({
  quantity = -1,
  query
}: {
  quantity?: number
  query: Omit<QueryDatabaseParameters, 'start_cursor' | 'page_size'>
}): Promise<T[]> {
  return paginate<T>(quantity, async (page_size, start_cursor) => {
    const response = await notion.databases.query({
      ...query,
      start_cursor,
      page_size
    })
    if (!response) throw new Error('Failed to retrieve database rows')
    return {
      results: response.results as T[],
      has_more: response.has_more,
      next_cursor: response.next_cursor
    }
  })
}
