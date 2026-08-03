import path from 'path'

import blurHashAndGradient from '../utils/blurHashAndGradient'
import downloadImage from '../utils/downloadImage'
import { deleteFileIfExists } from '../utils/fs'
import clog from '../utils/log'
import { MdxImageContentProps } from './generateBlock'

interface ProcessingImgProps {
  blockId: string
  mdxImagesPath: string
  imageUrl: string
  lastEditedTimeMs: number
  cutTitle: string
}

export type SimpleAdditionalImages = {
  bannerImagePath: string
  thumbImagePath: string
}

function toPublicRelativePath(fullPath: string) {
  const publicDir = path.join(process.cwd(), 'public')
  return '/' + path.relative(publicDir, fullPath).replace(/\\/g, '/')
}

export async function handleImageProcessing(props: ProcessingImgProps): Promise<MdxImageContentProps | undefined> {
  const { blockId, mdxImagesPath, imageUrl, cutTitle } = props
  const folder = path.join(mdxImagesPath, blockId)
  const bannerFull = path.join(folder, 'banner.webp')
  const thumbFull = path.join(folder, 'thumb.webp')

  await deleteFileIfExists(bannerFull)
  await deleteFileIfExists(thumbFull)

  try {
    const { bannerImage, thumbImage } = await downloadImage({
      folderPath: folder,
      bannerImagePath: bannerFull,
      thumbImagePath: thumbFull,
      url: imageUrl,
      title: cutTitle
    })

    const { blurhash, placeholder } = await blurHashAndGradient(thumbFull)
    clog.info(`Cover de ${cutTitle} descargado`, '')

    return {
      blurhash,
      placeholder,
      bannerWidth: bannerImage.width,
      bannerHeight: bannerImage.height,
      thumbWidth: thumbImage.width,
      thumbHeight: thumbImage.height,
      aspectRatio: Number((thumbImage.width / thumbImage.height).toFixed(6))
    }
  } catch (err) {
    clog.error(`Descarga fallida: ${cutTitle}`)
    throw new Error(`Image download failed: ${err}`)
  }
}

async function processSingleGalleryImage(
  props: ProcessingImgProps & { imageKey: string }
): Promise<SimpleAdditionalImages | null> {
  const { blockId, mdxImagesPath, imageUrl, cutTitle, imageKey } = props
  const folder = path.join(mdxImagesPath, blockId)
  const bannerFull = path.join(folder, `${imageKey}-banner.webp`)
  const thumbFull = path.join(folder, `${imageKey}-thumb.webp`)

  await deleteFileIfExists(bannerFull)
  await deleteFileIfExists(thumbFull)

  try {
    await downloadImage({
      folderPath: folder,
      bannerImagePath: bannerFull,
      thumbImagePath: thumbFull,
      url: imageUrl,
      title: cutTitle
    })
    clog.info(`Imagen ${imageKey} de ${cutTitle} descargado`, '')

    return {
      bannerImagePath: toPublicRelativePath(bannerFull),
      thumbImagePath: toPublicRelativePath(thumbFull)
    }
  } catch {
    clog.error(`no se descargó ${cutTitle} (${imageKey})`)
    return null
  }
}

export async function processMultipleImages({
  blockId,
  mdxImagesPath,
  lastEditedTimeMs,
  cutTitle,
  imageUrls
}: {
  blockId: string
  mdxImagesPath: string
  lastEditedTimeMs: number
  cutTitle: string
  imageUrls: string[]
}) {
  const results: SimpleAdditionalImages[] = []

  for (let i = 0; i < imageUrls.length; i++) {
    const single = await processSingleGalleryImage({
      blockId,
      mdxImagesPath,
      imageUrl: imageUrls[i],
      lastEditedTimeMs,
      cutTitle,
      imageKey: `img${i + 1}`
    })
    if (single) results.push(single)
  }

  return results
}
