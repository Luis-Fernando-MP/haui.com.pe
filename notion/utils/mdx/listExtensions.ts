type NotionBlock = {
  type?: string
  processed?: boolean
  [key: string]: unknown
}

type ListExtension = (blocks: NotionBlock[]) => Promise<NotionBlock[]>

const groupListItems = (itemType: string, listType: string): ListExtension => async blocks => {
  const next: NotionBlock[] = []
  let items: NotionBlock[] = []

  const flush = () => {
    if (items.length === 0) return
    next.push({ type: listType, [listType]: items })
    items = []
  }

  for (const block of blocks) {
    if (block.processed) {
      flush()
      next.push(block)
      continue
    }

    if (block.type === itemType) {
      items.push({ ...block, processed: true })
      continue
    }

    flush()
    next.push(block)
  }

  flush()
  return next
}

export const listExtensions: ListExtension[] = [
  groupListItems('numbered_list_item', 'numbered_list'),
  groupListItems('bulleted_list_item', 'bulleted_list'),
  groupListItems('to_do', 'to_do_list')
]
