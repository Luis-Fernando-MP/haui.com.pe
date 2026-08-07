import type { MdxImageContentProps } from '@notion/utils/generateBlock'
import { DUAL_IMAGE_VARIANTS } from '@notion/utils/downloadImage'
import { yamlQuote } from '@notion/utils/yamlQuote'
import { blurhashToDataUri } from '@unpic/placeholder'

export const imageContentStr = (imageProps: MdxImageContentProps, folder: string, id?: string) => {
  const { aspectRatio, bannerHeight, bannerWidth, blurhash, placeholder, thumbHeight, thumbWidth } = imageProps

  const base = id ? `/content/${folder}/${id}` : undefined
  const bannerPath = base ? `${base}/banner.webp` : '/fallback.webp'
  const thumbPath = base ? (DUAL_IMAGE_VARIANTS ? `${base}/thumb.webp` : bannerPath) : '/fallback.webp'
  const imageHash = blurhash.length > 0 ? blurhashToDataUri(blurhash) : ''

  return `banner: ${yamlQuote(bannerPath)}
banner_width: ${bannerWidth}
banner_height: ${bannerHeight}
aspectRatio: ${aspectRatio}
image_hash: ${yamlQuote(imageHash)}
image_blur: ${yamlQuote(placeholder)}
thumb: ${yamlQuote(thumbPath)}
thumb_width: ${DUAL_IMAGE_VARIANTS ? thumbWidth : bannerWidth}
thumb_height: ${DUAL_IMAGE_VARIANTS ? thumbHeight : bannerHeight}`
}
