import { NotionRenderer, createBlockRenderer } from '@notion-render/client'
import path from 'path'
import readingTime from 'reading-time'
import { stripHtml } from 'string-strip-html'

import { loadInternalAssets } from '../databases/projects/internalAssets'
import notion from '../api'
import { escapeHTML } from './escapeHTML'
import { writeFile } from './fs'
import { getAllBlocks } from './getAllBlocks'
import {
  handleImageProcessing,
  processKeyedImages,
  processLogoImage
} from './handleImageProcessing'
import clog from './log'
import { listExtensions } from './listExtensions'
import {
  applyDeleteDecorators,
  injectImagePlaceholders
} from './notionBuilderDecorators'
import { selfCloseCustomTags } from './mdxHtmlTagMap'

export interface MdxImageContentProps {
  blurhash: string
  placeholder: string
  bannerWidth: number
  bannerHeight: number
  thumbWidth: number
  thumbHeight: number
  aspectRatio: number
}

export type ProjectBodyImage = {
  id: string
  banner: string
  thumb: string
  caption: string
}

export type ProjectAuthor = {
  name: string
  social: string
  role: string
}

export interface MdxContentProps {
  words?: number
  readingTime?: number
  imageProps: MdxImageContentProps
  logoPath?: string
  authors?: ProjectAuthor[]
  images?: ProjectBodyImage[]
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
  loadProjectAssets?: boolean
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
    loadProjectAssets = false
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
    let authors: ProjectAuthor[] = []
    let images: ProjectBodyImage[] = []

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

      if (loadProjectAssets) {
        const assets = await loadInternalAssets(rawBlocks)

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
