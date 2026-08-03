import { env } from '@notion/constants'
import type { NotionGroupVisibility } from '@notion/types/notion.type'
import cleanObsoleteFiles from '@notion/utils/cleanObsoleteFiles'
import { createDirectories } from '@notion/utils/fs'
import { generateBlock } from '@notion/utils/generateBlock'
import { getAllMarksDB } from '@notion/utils/getAllMarks'
import clog from '@notion/utils/log'
import { mapPool } from '@notion/utils/mapPool'

import { NotionSeriesDB } from './series.type'
import { serieContent } from './str.content'

const SERIES_CONCURRENCY = 3

export const generateSeries = async () => {
  try {
    clog.block('Series')
    const startAll = Date.now()

    clog.info('Notion…')
    const series = await getAllMarksDB<NotionSeriesDB>({
      query: {
        database_id: env.SERIES_ID,
        filter: {
          property: 'Visibilidad',
          status: { equals: 'Portafolio' as NotionGroupVisibility }
        }
      }
    })

    clog.success(`${series.length} remotos`)

    const [mdxFolderPath, mdxImagesPath] = await createDirectories('content/series', 'public/content/series')

    const generatedIds = await mapPool(series, SERIES_CONCURRENCY, async serie => {
      const { id, cover } = serie
      const coverUrl = cover?.external.url

      await generateBlock({
        blockId: id,
        coverImage: coverUrl,
        lastEditedTime: serie.properties['Última edición'].last_edited_time,
        mdxFolderPath,
        mdxImagesPath,
        title: serie.properties.Name.title[0].plain_text,
        generateContent: false,
        mdxContent: imageProps => serieContent(serie, coverUrl, imageProps)
      })

      return id
    })

    await Promise.all([
      cleanObsoleteFiles(generatedIds, mdxFolderPath, '.mdx'),
      cleanObsoleteFiles(generatedIds, mdxImagesPath)
    ])
    clog.timer('total', Date.now() - startAll)
  } catch (e: any) {
    clog.error('series')
    console.log(e?.message ?? e)
  }
}
