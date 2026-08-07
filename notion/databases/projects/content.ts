import { imageContentStr, yamlQuote } from '@notion/lib/frontmatter'
import type { MdxContentProps } from '@notion/lib/types'

import type { ProjectsDB } from './type'

const imagesStr = (images: NonNullable<MdxContentProps['images']>) => {
  if (images.length === 0) return 'images: []'
  return `images:
${images
  .map(
    ({ id, banner, thumb, caption }) =>
      `  - id: ${yamlQuote(id)}\n    banner: ${yamlQuote(banner)}\n    thumb: ${yamlQuote(thumb)}\n    caption: ${yamlQuote(caption)}`
  )
  .join('\n')}`
}

const authorsStr = (authors: NonNullable<MdxContentProps['authors']>) => {
  if (authors.length === 0) return 'authors: []'
  return `authors:
${authors
  .map(({ name, social, role }) => `  - name: ${yamlQuote(name)}\n    social: ${yamlQuote(social)}\n    role: ${yamlQuote(role)}`)
  .join('\n')}`
}

export const projectContent = (project: ProjectsDB, coverUrl: string | undefined, contentProps: MdxContentProps) => {
  const { id, properties, created_time } = project
  const title = properties.Name?.title?.[0]?.plain_text ?? ''
  const { Prioridad, Equipo, Progreso, Tags, Estado, Github, Notion, Website, Figma, Relevancia, Resumen } = properties
  const lastEditedTime = properties['Última edición']?.last_edited_time ?? created_time
  const { imageProps, readingTime, words, logoPath = '', authors = [], images = [] } = contentProps
  const imagePropsStr = imageContentStr(imageProps, 'projects', coverUrl ? id : undefined)
  const tags = Tags?.multi_select ?? []
  const summary =
    Resumen?.rich_text
      ?.map(rt => rt?.plain_text ?? '')
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
status: ${yamlQuote(Estado?.status?.name ?? '')}
github: ${yamlQuote(Github?.url ?? '')}
website: ${yamlQuote(Website?.url ?? '')}
figma: ${yamlQuote(Figma?.url ?? '')}
notion: ${yamlQuote(Notion?.url ?? '')}
logo: ${yamlQuote(logoPath)}
summary: ${yamlQuote(summary)}
created_time: ${yamlQuote(created_time)}
last_edited_time: ${yamlQuote(lastEditedTime)}
${imagePropsStr}
tags: [${tags.map(item => yamlQuote(item.name)).join(', ')}]
${imagesStr(images)}
${authorsStr(authors)}
---`
}
