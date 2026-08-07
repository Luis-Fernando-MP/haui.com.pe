import { imageContentStr, yamlQuote } from '@notion/lib/frontmatter'
import type { MdxContentProps } from '@notion/lib/types'

import type { SeriesDB } from './type'

export const serieContent = (book: SeriesDB, coverUrl: string | undefined, contentProps: MdxContentProps) => {
  const { id, properties, created_time } = book
  const title = properties.Name.title[0].plain_text
  const lastEditedTime = properties['Última edición'].last_edited_time
  const teacher = properties['Profesor(es)']?.rich_text[0]?.text.content ?? ''
  const { imageProps, readingTime, words } = contentProps
  const imagePropsStr = imageContentStr(imageProps, 'series', coverUrl ? id : undefined)

  return `---
id: ${yamlQuote(id)}
title: ${yamlQuote(title)}
reading_time: ${readingTime ?? 1}
words: ${words ?? 0}
folder: ${yamlQuote(properties.Folder?.select?.name)}
folder_color: ${yamlQuote(properties.Folder?.select?.color)}
profesor: ${yamlQuote(teacher)}
${imagePropsStr}
created_time: ${yamlQuote(created_time)}
last_edited_time: ${yamlQuote(lastEditedTime)}
tags: [${properties.Tags?.multi_select.map(item => yamlQuote(item.name)).join(', ')}]
---`
}
