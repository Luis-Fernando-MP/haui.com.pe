import type { MdxImageContentProps } from '@notion/utils/generateBlock'
import { SimpleAdditionalImages } from '@notion/utils/handleImageProcessing'
import { yamlQuote } from '@notion/utils/yamlQuote'

export const imageContentStr = (imageProps: MdxImageContentProps, folder: string, id?: string) => {
  const { aspectRatio, bannerHeight, bannerWidth, blurhash, placeholder, thumbHeight, thumbWidth } = imageProps
  const encode = (str: string) => Buffer.from(str).toString('base64')

  return `banner: ${id ? yamlQuote(`/content/${folder}/${id}/banner.webp`) : yamlQuote('/fallback.webp')}
banner_width: ${bannerWidth}
banner_height: ${bannerHeight}
aspectRatio: ${aspectRatio}
image_hash: ${yamlQuote(encode(blurhash))}
image_blur: ${yamlQuote(encode(placeholder))}
thumb: ${id ? yamlQuote(`/content/${folder}/${id}/thumb.webp`) : yamlQuote('/fallback.webp')}
thumb_width: ${thumbWidth}
thumb_height: ${thumbHeight}`
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
