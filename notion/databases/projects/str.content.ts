import type { MdxContentProps } from '@notion/utils/generateBlock'
import { yamlQuote } from '@notion/utils/yamlQuote'

import { additionalImagesStr, imageContentStr } from '../imageContentStr'
import { NotionProjectsDB } from './projects.type'

export const projectContent = (project: NotionProjectsDB, coverUrl: string | undefined, contentProps: MdxContentProps) => {
  const { id, properties, created_time } = project
  const title = properties.Name.title[0].plain_text

  const { Prioridad, Equipo, Progreso, Tags, Logo, Estado, Github, Notion, Website, Figma, Relevancia, Resumen } =
    properties
  const lastEditedTime = properties['Última edición'].last_edited_time

  const { imageProps, readingTime, words, additionalImages = [] } = contentProps
  const imagePropsStr = imageContentStr(imageProps, 'projects', coverUrl ? id : undefined)
  const additionalImgsStr = additionalImagesStr(additionalImages)
  const summary =
    Resumen?.rich_text
      ?.map(rt => rt?.plain_text)
      .join('')
      .replace(/[\n\r]+/g, ' ')
      .trim() ?? ''

  return `---
id: ${yamlQuote(id)}
title: ${yamlQuote(title)}
reading_time: ${readingTime ?? 1}
words: ${words ?? 0}
relevance: ${Math.max(1, (Relevancia?.status?.name?.length ?? 1) / 2)}
priority: ${yamlQuote(Prioridad?.select?.name ?? '')}
team: ${yamlQuote(Equipo?.select?.name ?? '')}
progress: ${Progreso?.number ?? 0}
status: ${yamlQuote(Estado?.status?.name)}
github: ${yamlQuote(Github?.url ?? '')}
website: ${yamlQuote(Website?.url ?? '')}
figma: ${yamlQuote(Figma?.url ?? '')}
notion: ${yamlQuote(Notion?.url ?? '')}
logo: ${yamlQuote(Logo?.url ?? '')}
summary: ${yamlQuote(summary)}
created_time: ${yamlQuote(created_time)}
last_edited_time: ${yamlQuote(lastEditedTime)}
${imagePropsStr}
tags: [${Tags?.multi_select.map(item => yamlQuote(item.name)).join(', ')}]
${additionalImgsStr}
---`
}
