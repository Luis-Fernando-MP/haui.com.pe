import path from 'path'

import blurHashAndGradient from '../utils/blurHashAndGradient'
import downloadImage, { DUAL_IMAGE_VARIANTS } from '../utils/downloadImage'
import { deleteFileIfExists } from '../utils/fs'
import clog from '../utils/log'
import { MdxImageContentProps } from './generateBlock'

const PRIMARY_NAME = 'banner.webp'
const THUMB_NAME = 'thumb.webp'

interface ProcessingImgProps {
  blockId: string
  mdxImagesPath: string
  imageUrl: string
  lastEditedTimeMs: number
  cutTitle: string
}

/** Paths públicos. Con DUAL=false, thumb === banner (misma imagen / unpic). */
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
  const bannerFull = path.join(folder, PRIMARY_NAME)
  const thumbFull = path.join(folder, THUMB_NAME)

  await deleteFileIfExists(bannerFull)
  await deleteFileIfExists(thumbFull)

  try {
    const { image, thumbImage } = await downloadImage({
      folderPath: folder,
      imagePath: bannerFull,
      thumbImagePath: DUAL_IMAGE_VARIANTS ? thumbFull : undefined,
      url: imageUrl,
      title: cutTitle
    })

    const hashSource = DUAL_IMAGE_VARIANTS ? thumbFull : bannerFull
    const { blurhash, placeholder } = await blurHashAndGradient(hashSource)

    return {
      blurhash,
      placeholder,
      bannerWidth: image.width,
      bannerHeight: image.height,
      thumbWidth: thumbImage.width,
      thumbHeight: thumbImage.height,
      aspectRatio: Number((image.width / image.height).toFixed(6))
    }
  } catch (err) {
    clog.error(`cover ${cutTitle}`)
    throw new Error(`Image download failed: ${err}`)
  }
}

async function processSingleGalleryImage(
  props: ProcessingImgProps & { imageKey: string }
): Promise<SimpleAdditionalImages | null> {
  const { blockId, mdxImagesPath, imageUrl, cutTitle, imageKey } = props
  const folder = path.join(mdxImagesPath, blockId)
  const bannerFull = path.join(folder, DUAL_IMAGE_VARIANTS ? `${imageKey}-banner.webp` : `${imageKey}.webp`)
  const thumbFull = path.join(folder, `${imageKey}-thumb.webp`)

  await deleteFileIfExists(bannerFull)
  await deleteFileIfExists(thumbFull)
  if (!DUAL_IMAGE_VARIANTS) {
    await deleteFileIfExists(path.join(folder, `${imageKey}-banner.webp`))
  }

  try {
    await downloadImage({
      folderPath: folder,
      imagePath: bannerFull,
      thumbImagePath: DUAL_IMAGE_VARIANTS ? thumbFull : undefined,
      url: imageUrl,
      title: cutTitle
    })

    const publicPrimary = toPublicRelativePath(bannerFull)
    return {
      bannerImagePath: publicPrimary,
      thumbImagePath: DUAL_IMAGE_VARIANTS ? toPublicRelativePath(thumbFull) : publicPrimary
    }
  } catch {
    clog.error(`img ${imageKey} ${cutTitle}`)
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
