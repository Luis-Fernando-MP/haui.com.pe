import { blurhashToCssGradientString } from '@unpic/placeholder'
import { encode } from 'blurhash'
import sharp from 'sharp'

import clog from '@notion/utils/cli/log'

export default async function blurHashAndGradient(imagePath: string) {
  try {
    const { data, info } = await sharp(imagePath)
      .rotate()
      .resize(32, 32, { fit: 'inside' })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    const { width, height } = info
    const blurhash = encode(new Uint8ClampedArray(data), width, height, 4, 3)
    return { blurhash, placeholder: blurhashToCssGradientString(blurhash), width, height }
  } catch (error) {
    clog.error(`blurhash ${pathBase(imagePath)}`)
    throw error
  }
}

function pathBase(p: string) {
  return p.split(/[\\/]/).pop() ?? p
}
