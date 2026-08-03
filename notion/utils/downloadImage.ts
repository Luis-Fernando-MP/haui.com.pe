import axios from 'axios'
import fs from 'fs'
import sharp from 'sharp'

interface Props {
  url: string
  folderPath: string
  bannerImagePath: string
  thumbImagePath: string
  title: string
}

export default async function downloadImage({ folderPath, url, bannerImagePath, thumbImagePath }: Props) {
  const response = await axios.get<ArrayBuffer>(url, {
    responseType: 'arraybuffer',
    timeout: 60_000,
    maxRedirects: 5,
    validateStatus: status => status >= 200 && status < 300
  })

  const buffer = Buffer.from(response.data)
  await fs.promises.mkdir(folderPath, { recursive: true })

  const [bannerImage, thumbImage] = await Promise.all([
    sharp(buffer)
      .rotate()
      .resize({ width: 1500, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(bannerImagePath),
    sharp(buffer)
      .rotate()
      .resize({ width: 400, withoutEnlargement: true })
      .webp({ quality: 70 })
      .toFile(thumbImagePath)
  ])

  return { bannerImage, thumbImage }
}
