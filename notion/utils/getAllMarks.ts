import notion from '@notion/api'
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

interface Props {
  quantity?: number
  query: Omit<QueryDatabaseParameters, 'start_cursor' | 'page_size'>
}

/**
 * Retrieves marks from the Notion database.
 * @param quantity - Number of items to fetch (optional), default -1 (all items).
 * @returns {Promise<T[]>} An array of results from Notion.
 */
export async function getAllMarksDB<T = any>({ quantity = -1, query }: Props): Promise<T[]> {
  let allResults: T[] = []
  let hasMore = true
  let startCursor: string | undefined = undefined

  const page_size = quantity === -1 ? 100 : Math.min(quantity, 100)

  while (hasMore) {
    try {
      const response = await notion.databases.query({
        ...query,
        start_cursor: startCursor,
        page_size
      })

      if (!response) throw new Error('Failed to retrieve marks')

      const { has_more, results, next_cursor } = response

      allResults.push(...(results as T[]))
      hasMore = has_more
      startCursor = next_cursor ?? undefined

      if (quantity !== -1 && allResults.length >= quantity) break
    } catch (error) {
      console.error('Error querying Notion:', error)
      throw new Error('Critical failure in retrieving marks.')
    }
  }

  return allResults
}
