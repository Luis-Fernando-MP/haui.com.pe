import clog from '@notion/utils/cli/log'

const markerOpen = (name: string) => new RegExp(`<p[^>]*>\\s*(?:<span[^>]*>)?\\s*${name}\\s*(?:</span>)?\\s*</p>`, 'i')

const sectionBetween = (from: string, to: string) =>
  new RegExp(
    `<p[^>]*>\\s*(?:<span[^>]*>)?\\s*${from}\\s*(?:</span>)?\\s*</p>[\\s\\S]*?<p[^>]*>\\s*(?:<span[^>]*>)?\\s*${to}\\s*(?:</span>)?\\s*</p>`,
    'gi'
  )

/** Quita tramos `@delete-from` … `@delete-to` del HTML del body. */
export function applyDeleteDecorators(html: string) {
  const fromOk = markerOpen('@delete-from').test(html)
  const toOk = markerOpen('@delete-to').test(html)
  if (fromOk !== toOk) {
    clog.warn('decorator @delete: par incompleto')
    return html
  }
  return html.replace(sectionBetween('@delete-from', '@delete-to'), '')
}

export type InjectImage = {
  src: string
  caption?: string
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const imageMarkup = (asset: InjectImage) => {
  const caption = (asset.caption ?? '').trim()
  const alt = (caption || 'Imagen del proyecto').replace(/"/g, '&quot;')
  const image = `<Image layout="constrained" width={1500} height={1125} src="${asset.src}" alt="${alt}" />`
  if (caption.length === 0) return image

  const safeCaption = caption.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

  return `<figure>\n${image}\n<figcaption>${safeCaption}</figcaption>\n</figure>`
}

/**
 * Sustituye cada `(id)` por un `Image` unpic (solo ids presentes en `byId`).
 */
export function injectImagePlaceholders(html: string, byId: Record<string, InjectImage>) {
  const ids = Object.keys(byId)
  if (ids.length === 0) return html

  const pattern = ids.map(escapeRegExp).join('|')
  const markup = (_full: string, id: string) => {
    const asset = byId[id]
    if (!asset) return _full
    return imageMarkup(asset)
  }

  let out = html.replace(new RegExp(`<p[^>]*>\\s*\\(\\s*(${pattern})\\s*\\)\\s*</p>`, 'gi'), markup)
  out = out.replace(new RegExp(`\\(\\s*(${pattern})\\s*\\)`, 'g'), markup)
  return out
}
