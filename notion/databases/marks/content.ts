import { imageContentStr, yamlQuote } from '@notion/lib/frontmatter'
import type { MdxContentProps } from '@notion/lib/types'

import type { MarksDB } from './type'

export const markContent = (mark: MarksDB, coverUrl: string | undefined, contentProps: MdxContentProps) => {
  const { id, properties, created_time } = mark
  const title = properties.Name.title[0].plain_text
  const lastEditedTime = properties['Última edición'].last_edited_time
  const { imageProps, readingTime, words } = contentProps
  const imagePropsStr = imageContentStr(imageProps, 'marks', coverUrl ? id : undefined)

  return `---
id: ${yamlQuote(id)}
title: ${yamlQuote(title)}
reading_time: ${readingTime ?? 1}
words: ${words ?? 0}
folder: ${yamlQuote(properties.Folder?.select?.name)}
folder_color: ${yamlQuote(properties.Folder?.select?.color)}
status: ${yamlQuote(properties.Estado?.status?.name)}
level: ${yamlQuote(properties.Nivel?.select?.name)}
sessions: [${properties['Sesión']?.multi_select.map(item => yamlQuote(item.name)).join(', ')}]
${imagePropsStr}
created_time: ${yamlQuote(created_time)}
last_edited_time: ${yamlQuote(lastEditedTime)}
tags: [${properties.Tags?.multi_select.map(item => yamlQuote(item.name)).join(', ')}]
---`
}
