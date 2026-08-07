import { NotionRenderer, createBlockRenderer } from '@notion-render/client'
import path from 'path'
import readingTime from 'reading-time'
import { stripHtml } from 'string-strip-html'

import notion from '@notion/lib/api'
import type { InternalDbConfig, MdxContentProps, MdxImageContentProps } from '@notion/lib/types'
import { loadInternalAssets } from '@notion/utils/assets/loadInternalAssets'
import {
  handleImageProcessing,
  processKeyedImages,
  processLogoImage
} from '@notion/utils/image/handleImageProcessing'
import { writeFile } from '@notion/utils/local/fs'
import clog from '@notion/utils/cli/log'
import { applyDeleteDecorators, injectImagePlaceholders } from '@notion/utils/mdx/decorators'
import { escapeHTML } from '@notion/utils/mdx/escapeHTML'
import { listExtensions } from '@notion/utils/mdx/listExtensions'
import { selfCloseCustomTags } from '@notion/utils/mdx/mdxHtmlTagMap'
import { getAllBlocks } from '@notion/utils/query/fetch'

export type { MdxContentProps, MdxImageContentProps }

interface Props {
  blockId: string
  mdxFolderPath: string
  mdxImagesPath: string
  lastEditedTime: string
  coverImage: string | undefined
  title: string
  mdxContent: (_: MdxContentProps) => string
  generateContent?: boolean
  internalDB?: InternalDbConfig | null
}

const SKIP_BLOCK_TYPES = new Set([
  'child_database',
  'child_page',
  'link_preview',
  'embed',
  'bookmark',
  'unsupported',
  'synced_block',
  'template',
  'breadcrumb',
  'table_of_contents'
])

const EMPTY_IMAGE_PROPS: MdxImageContentProps = {
  blurhash: '',
  placeholder: '',
  bannerWidth: 0,
  bannerHeight: 0,
  thumbWidth: 0,
  thumbHeight: 0,
  aspectRatio: 0
}

const emptyRenderer = (type: string) =>
  createBlockRenderer(type as any, async () => {
    return ''
  })

const renderer = new NotionRenderer({
  client: notion,
  renderers: [...SKIP_BLOCK_TYPES].map(emptyRenderer)
})
;(renderer as unknown as { extensions: typeof listExtensions }).extensions = listExtensions

export async function generateBlock(props: Props) {
  const {
    mdxContent,
    mdxFolderPath,
    mdxImagesPath,
    blockId,
    lastEditedTime,
    title,
    coverImage,
    generateContent = true,
    internalDB = null
  } = props

  const mdxFilePath = path.join(mdxFolderPath, `${blockId}.mdx`)
  const lastEditedTimeMs = new Date(lastEditedTime).getTime()
  const cutTitle = title.slice(0, 40)

  try {
    clog.info(cutTitle)

    let imageProps = EMPTY_IMAGE_PROPS
    let body = ''
    let words = 0
    let minutes = 0
    let logoPath = ''
    let authors: NonNullable<MdxContentProps['authors']> = []
    let images: NonNullable<MdxContentProps['images']> = []

    if (coverImage) {
      const processed = await handleImageProcessing({
        blockId,
        mdxImagesPath,
        imageUrl: coverImage,
        lastEditedTimeMs,
        cutTitle
      })
      if (processed) imageProps = processed
    }

    if (generateContent) {
      const rawBlocks = await getAllBlocks({ blockID: blockId })

      if (internalDB) {
        const assets = await loadInternalAssets(rawBlocks, internalDB)

        if (assets.logoUrl) {
          const localLogo = await processLogoImage({
            blockId,
            mdxImagesPath,
            imageUrl: assets.logoUrl,
            lastEditedTimeMs,
            cutTitle
          })
          if (localLogo) logoPath = localLogo
        }

        if (assets.images.length > 0) {
          const keyed = await processKeyedImages({
            blockId,
            mdxImagesPath,
            lastEditedTimeMs,
            cutTitle,
            images: assets.images
          })
          images = keyed.map(img => ({
            id: img.id,
            banner: img.bannerImagePath,
            thumb: img.thumbImagePath,
            caption: img.caption
          }))
        }

        authors = assets.authors
      }

      const blocks = rawBlocks.filter(
        (block: { type?: string }) => block.type && !SKIP_BLOCK_TYPES.has(block.type)
      )

      const html = await renderer.render(...blocks)
      let { result } = escapeHTML(html)

      result = applyDeleteDecorators(result)

      const byId = Object.fromEntries(
        images.map(img => [img.id, { src: img.banner, caption: img.caption }])
      )
      body = selfCloseCustomTags(injectImagePlaceholders(result, byId))

      const plainText = stripHtml(html).result
      const stats = readingTime(plainText)
      words = stats.words
      minutes = Math.max(1, Math.ceil(stats.minutes))
    }

    const frontmatter = mdxContent({
      readingTime: minutes || undefined,
      words: words || undefined,
      imageProps,
      logoPath,
      authors,
      images
    }).trimEnd()

    await writeFile(mdxFilePath, body ? `${frontmatter}\n\n${body}\n` : `${frontmatter}\n`)
    clog.success(cutTitle)
    return true
  } catch (error) {
    clog.error(cutTitle)
    console.log(error)
    return false
  }
}
