'use client'

import { Image, type ImageProps } from '@unpic/react/nextjs'
import { type FC, Ref, useId } from 'react'

interface GalleryImageData {
  groupId?: string
  noUniqueGroup?: boolean
  caption?: string
  action?: string
  actionText?: string
  index?: number
}

interface Props extends ImageProps, GalleryImageData {
  ref?: Ref<HTMLImageElement>
}

/**
 * Renders an image configured for use in a focusable gallery system.
 * Automatically assigns dataset attributes for gallery grouping, caption, action, and index.
 * Plays a sound on click using a shared sound hook.
 *
 * @param {string} [caption] - Text description shown as the image caption in the gallery viewer.
 * @param {string} [action] - Optional action URL.
 * @param {string} [actionText] - Text label describing the action. Defaults to "Ver más".
 * @param {number} [index] - Position of the image within the gallery group for sorting purposes.
 * @param {string} [groupId] - Manually set group identifier to group this image with others.
 * @param {boolean} [noUniqueGroup=false] - If true, uses a shared group ID "haui" instead of a unique one.
 *
 * @returns {JSX.Element} The image element with gallery-aware attributes and behavior.
 *
 * @example
 * <ImageGallery
 *   src="/images/photo.jpg"
 *   alt="Sunset view"
 *   caption="A beautiful sunset"
 *   action="/post/123"
 *   actionText="See more"
 *   index={2}
 *   noUniqueGroup
 * />
 */
const ImageGallery: FC<Props> = ({
  src,
  caption,
  action,
  actionText,
  index,
  groupId,
  noUniqueGroup = false,
  ref,
  alt,
  ...imgProps
}) => {
  const fallbackGroupId = useId()
  const finalGroupId = noUniqueGroup ? 'haui' : (groupId ?? fallbackGroupId)

  return (
    <Image
      ref={ref}
      src={src}
      alt={alt ?? 'gallery image'}
      data-gallery-src={src}
      data-gallery-index={index}
      data-gallery-group={finalGroupId}
      data-gallery-caption={caption}
      data-gallery-action={action}
      data-gallery-action-text={actionText}
      itemProp='image'
      background='/fallback.webp'
      {...imgProps}
    />
  )
}

export default ImageGallery
