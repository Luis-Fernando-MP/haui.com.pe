import path from 'path'

import type { MdxImageContentProps } from '@notion/lib/types'
import clog from '@notion/utils/cli/log'
import { deleteFileIfExists } from '@notion/utils/local/fs'
import blurHashAndGradient from '@notion/utils/image/blurHashAndGradient'
import downloadImage, { DUAL_IMAGE_VARIANTS } from '@notion/utils/image/downloadImage'

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
  const safeKey = imageKey.replace(/[^a-zA-Z0-9_-]/g, '_')
  const folder = path.join(mdxImagesPath, blockId)
  const bannerFull = path.join(folder, `${safeKey}.webp`)
  const thumbFull = path.join(folder, `${safeKey}-thumb.webp`)

  await deleteFileIfExists(bannerFull)
  await deleteFileIfExists(thumbFull)
  await deleteFileIfExists(path.join(folder, `${safeKey}-banner.webp`))

  try {
    await downloadImage({
      folderPath: folder,
      imagePath: bannerFull,
      thumbImagePath: thumbFull,
      url: imageUrl,
      title: cutTitle
    })

    return {
      bannerImagePath: toPublicRelativePath(bannerFull),
      thumbImagePath: toPublicRelativePath(thumbFull)
    }
  } catch {
    clog.error(`img ${safeKey} ${cutTitle}`)
    return null
  }
}

export async function processKeyedImages({
  blockId,
  mdxImagesPath,
  lastEditedTimeMs,
  cutTitle,
  images
}: {
  blockId: string
  mdxImagesPath: string
  lastEditedTimeMs: number
  cutTitle: string
  images: { id: string; url: string; caption: string }[]
}) {
  const results: (SimpleAdditionalImages & { id: string; caption: string })[] = []

  for (const img of images) {
    const single = await processSingleGalleryImage({
      blockId,
      mdxImagesPath,
      imageUrl: img.url,
      lastEditedTimeMs,
      cutTitle,
      imageKey: img.id
    })
    if (single) results.push({ ...single, id: img.id, caption: img.caption })
  }

  return results
}

export async function processLogoImage({
  blockId,
  mdxImagesPath,
  cutTitle,
  imageUrl
}: ProcessingImgProps): Promise<string | undefined> {
  const folder = path.join(mdxImagesPath, blockId)
  const logoFull = path.join(folder, 'logo.webp')
  await deleteFileIfExists(logoFull)

  try {
    await downloadImage({
      folderPath: folder,
      imagePath: logoFull,
      url: imageUrl,
      title: cutTitle
    })
    return toPublicRelativePath(logoFull)
  } catch {
    clog.error(`logo ${cutTitle}`)
    return undefined
  }
}
