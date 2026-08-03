import { env } from '@notion/constants'
import { NotionGroupVisibility } from '@notion/types/notion.type'
import cleanObsoleteFiles from '@notion/utils/cleanObsoleteFiles'
import { createDirectories } from '@notion/utils/fs'
import { generateBlock } from '@notion/utils/generateBlock'
import { getAllMarksDB } from '@notion/utils/getAllMarks'
import clog from '@notion/utils/log'
import { mapPool } from '@notion/utils/mapPool'

import { NotionMarkStatus, NotionMarksDB } from './marks.type'
import { markContent } from './str.content'

const MARKS_CONCURRENCY = 3

export const generateMarks = async () => {
  try {
    clog.block('GENERANDO MARKS')
    const startAll = Date.now()

    clog.info('Cargando marks desde Notion...')
    const marks = await getAllMarksDB<NotionMarksDB>({
      query: {
        database_id: env.MARKS_ID,
        filter: {
          and: [
            {
              or: [{ property: 'Estado', status: { equals: 'Completado' as NotionMarkStatus } }]
            },
            { property: 'Visibilidad', status: { equals: 'Portafolio' as NotionGroupVisibility } }
          ]
        }
      }
    })

    clog.success(`${marks.length} marks cargadas\n`)

    const [mdxFolderPath, mdxImagesPath] = await createDirectories('content/marks', 'public/content/marks')

    const generatedIds = await mapPool(marks, MARKS_CONCURRENCY, async mark => {
      const { id, cover } = mark
      const coverUrl = cover?.external.url

      await generateBlock({
        blockId: id,
        coverImage: coverUrl,
        lastEditedTime: mark.properties['Última edición'].last_edited_time,
        mdxFolderPath,
        mdxImagesPath,
        title: mark.properties.Name.title[0].plain_text,
        mdxContent: contentProps => markContent(mark, coverUrl, contentProps)
      })

      return id
    })

    clog.block('LIMPIEZA DE ARCHIVOS OBSOLETOS')
    await Promise.all([
      cleanObsoleteFiles(generatedIds, mdxFolderPath, '.mdx'),
      cleanObsoleteFiles(generatedIds, mdxImagesPath)
    ])
    clog.timer('Tiempo total', Date.now() - startAll)
  } catch (e: any) {
    clog.error('Error generando marks:')
    console.log(e?.message ?? e)
  }
}
