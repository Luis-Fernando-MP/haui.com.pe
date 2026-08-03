import { NotionRenderer, createBlockRenderer } from '@notion-render/client'
import path from 'path'
import readingTime from 'reading-time'
import { stripHtml } from 'string-strip-html'

import notion from '../api'
import { escapeHTML } from './escapeHTML'
import { writeFile } from './fs'
import { getAllBlocks } from './getAllBlocks'
import { SimpleAdditionalImages, handleImageProcessing, processMultipleImages } from './handleImageProcessing'
import clog from './log'

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

const emptyRenderer = (type: string) =>
  createBlockRenderer(type as any, async () => {
    return ''
  })

const renderer = new NotionRenderer({
  client: notion,
  renderers: [...SKIP_BLOCK_TYPES].map(emptyRenderer)
})

export interface MdxImageContentProps {
  blurhash: string
  placeholder: string
  bannerWidth: number
  bannerHeight: number
  thumbWidth: number
  thumbHeight: number
  aspectRatio: number
}

export interface MdxContentProps {
  words?: number
  readingTime?: number
  imageProps: MdxImageContentProps
  additionalImages?: SimpleAdditionalImages[]
}

interface Props {
  blockId: string
  mdxFolderPath: string
  mdxImagesPath: string
  lastEditedTime: string
  coverImage: string | undefined
  title: string
  mdxContent: (_: MdxContentProps) => string
  generateContent?: boolean
}

const EMPTY_IMAGE_PROPS: MdxImageContentProps = {
  blurhash: '',
  placeholder: '',
  bannerWidth: 0,
  bannerHeight: 0,
  thumbWidth: 0,
  thumbHeight: 0,
  aspectRatio: 0
}

export async function generateBlock(props: Props) {
  const {
    mdxContent,
    mdxFolderPath,
    mdxImagesPath,
    blockId,
    lastEditedTime,
    title,
    coverImage,
    generateContent = true
  } = props

  const mdxFilePath = path.join(mdxFolderPath, `${blockId}.mdx`)
  const lastEditedTimeMs = new Date(lastEditedTime).getTime()
  const cutTitle = title.slice(0, 40)

  try {
    clog.info(cutTitle)

    let imageProps = EMPTY_IMAGE_PROPS
    let additionalImages: SimpleAdditionalImages[] = []
    let body = ''
    let words = 0
    let minutes = 0

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
      const blocks = (await getAllBlocks({ blockID: blockId })).filter(
        (block: { type?: string }) => block.type && !SKIP_BLOCK_TYPES.has(block.type)
      )

      const html = await renderer.render(...blocks)
      const { result, allImages } = escapeHTML(html)
      body = result

      const plainText = stripHtml(html).result
      const stats = readingTime(plainText)
      words = stats.words
      minutes = Math.max(1, Math.ceil(stats.minutes))

      if (allImages.length > 0) {
        additionalImages = await processMultipleImages({
          blockId,
          mdxImagesPath,
          lastEditedTimeMs,
          cutTitle,
          imageUrls: allImages
        })
      }
    }

    const frontmatter = mdxContent({
      readingTime: minutes || undefined,
      words: words || undefined,
      imageProps,
      additionalImages
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
