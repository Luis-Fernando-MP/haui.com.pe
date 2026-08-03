import axios from 'axios'
import fs from 'fs'
import sharp from 'sharp'

/**
 * PX: `true` → banner.webp (1500) + thumb.webp (400).
 * Por defecto `false`: una sola imagen (Unpic redimensiona en cliente).
 */
export const DUAL_IMAGE_VARIANTS = false

const BANNER_WIDTH = 1500
const THUMB_WIDTH = 400
const BANNER_QUALITY = 80
const THUMB_QUALITY = 70
const REQUEST_TIMEOUT_MS = 60_000

interface Props {
  url: string
  folderPath: string
  imagePath: string
  thumbImagePath?: string
  title: string
}

export default async function downloadImage({ folderPath, url, imagePath, thumbImagePath }: Props) {
  const response = await axios.get<ArrayBuffer>(url, {
    responseType: 'arraybuffer',
    timeout: REQUEST_TIMEOUT_MS,
    maxRedirects: 5,
    validateStatus: status => status >= 200 && status < 300
  })

  const buffer = Buffer.from(response.data)
  await fs.promises.mkdir(folderPath, { recursive: true })

  if (!DUAL_IMAGE_VARIANTS) {
    const image = await sharp(buffer)
      .rotate()
      .resize({ width: BANNER_WIDTH, withoutEnlargement: true })
      .webp({ quality: BANNER_QUALITY })
      .toFile(imagePath)

    return { image, thumbImage: image }
  }

  if (!thumbImagePath) throw new Error('thumbImagePath required when DUAL_IMAGE_VARIANTS=true')

  const [image, thumbImage] = await Promise.all([
    sharp(buffer)
      .rotate()
      .resize({ width: BANNER_WIDTH, withoutEnlargement: true })
      .webp({ quality: BANNER_QUALITY })
      .toFile(imagePath),
    sharp(buffer)
      .rotate()
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: THUMB_QUALITY })
      .toFile(thumbImagePath)
  ])

  return { image, thumbImage }
}
