import type { MdxImageContentProps } from '@notion/utils/generateBlock'
import { DUAL_IMAGE_VARIANTS } from '@notion/utils/downloadImage'
import { SimpleAdditionalImages } from '@notion/utils/handleImageProcessing'
import { yamlQuote } from '@notion/utils/yamlQuote'

export const imageContentStr = (imageProps: MdxImageContentProps, folder: string, id?: string) => {
  const { aspectRatio, bannerHeight, bannerWidth, blurhash, placeholder, thumbHeight, thumbWidth } = imageProps
  const encode = (str: string) => Buffer.from(str).toString('base64')

  const base = id ? `/content/${folder}/${id}` : undefined
  // Unpic: una sola asset; thumb/banner apuntan al mismo path si DUAL=false
  const bannerPath = base ? `${base}/banner.webp` : '/fallback.webp'
  const thumbPath = base ? (DUAL_IMAGE_VARIANTS ? `${base}/thumb.webp` : bannerPath) : '/fallback.webp'

  return `banner: ${yamlQuote(bannerPath)}
banner_width: ${bannerWidth}
banner_height: ${bannerHeight}
aspectRatio: ${aspectRatio}
image_hash: ${yamlQuote(encode(blurhash))}
image_blur: ${yamlQuote(encode(placeholder))}
thumb: ${yamlQuote(thumbPath)}
thumb_width: ${DUAL_IMAGE_VARIANTS ? thumbWidth : bannerWidth}
thumb_height: ${DUAL_IMAGE_VARIANTS ? thumbHeight : bannerHeight}`
}

export const additionalImagesStr = (images: SimpleAdditionalImages[]) => {
  if (images.length === 0) return 'allImagesBySections: []'

  return `allImagesBySections:
${images
  .map(
    ({ bannerImagePath, thumbImagePath }) =>
      `  - banner: ${yamlQuote(bannerImagePath)}\n    thumb: ${yamlQuote(thumbImagePath)}`
  )
  .join('\n')}`
}
