import clog from '@notion/utils/log'
import { blurhashToCssGradientString } from '@unpic/placeholder'
import { encode } from 'blurhash'
import sharp from 'sharp'

/**
 * Genera blurhash + gradiente CSS a partir de una imagen local.
 * @param imagePath Ruta local de la imagen (idealmente el thumb).
 */
export default async function blurHashAndGradient(imagePath: string) {
  try {
    clog.info('Procesando blurhash', '')
    const start = performance.now()

    const { data, info } = await sharp(imagePath)
      .rotate()
      .resize(32, 32, { fit: 'inside' })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    const { width, height } = info
    const blurhash = encode(new Uint8ClampedArray(data), width, height, 4, 3)
    const placeholder = blurhashToCssGradientString(blurhash)

    clog.timer('Blurhash generado', Math.round(performance.now() - start))
    return { blurhash, placeholder, width, height }
  } catch (error) {
    clog.error(`Error blurhash: ${imagePath}`)
    throw error
  }
}
