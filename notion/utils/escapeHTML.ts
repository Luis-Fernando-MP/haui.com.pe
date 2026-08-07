import { HTMLElement, TextNode, parse } from 'node-html-parser'

const codePhTag = (i: number) => `<haui-code data-i="${i}"></haui-code>`
const codePhRe = /<haui-code data-i="(\d+)"[^>]*(?:\/>|><\/haui-code>)/g
const imagePhTag = (i: number) => `<haui-image data-i="${i}"></haui-image>`
const imagePhRe = /<haui-image data-i="(\d+)"[^>]*(?:\/>|><\/haui-image>)/g

/**
 * Limpia el HTML de Notion y lo deja listo para MDX (JSX + HTML).
 */
export function escapeHTML(html: string) {
  html = stripNoise(html)

  const root = parse(html, {
    blockTextElements: {
      script: true,
      noscript: true,
      style: true
    },
    voidTag: {
      tags: ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'],
      closingSlash: true
    }
  })

  const codeBlocks: string[] = []
  const imageBlocks: string[] = []
  extractCodeBlocks(root, codeBlocks)
  transformImages(root, imageBlocks)
  cleanCallouts(root)
  stripEmptyNodes(root)
  normalizeTextNodes(root)
  escapeTextForMdx(root)

  let result = root
    .toString()
    .replace(/\bclass=/g, 'className=')
    .replace(/\breadonly(?:=["']?["']?)?/gi, 'readOnly')
    .replace(/<\/ol>\s*<ol[^>]*>/gi, '')
    .replace(/<\/ul>\s*<ul[^>]*>/gi, '')
    .replace(/<div className="notion-code">\s*<\/div>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  result = result.replace(codePhRe, (_, i) => `\n\n${codeBlocks[Number(i)] ?? ''}\n\n`)
  result = result.replace(imagePhRe, (_, i) => imageBlocks[Number(i)] ?? '')
  result = selfCloseImageTags(result)
  result = formatMdxBody(result)
  return { result }
}

export function selfCloseImageTags(html: string) {
  return html.replace(/<Image\b([^>]*?)\s*(?:\/>|>\s*<\/Image>)/gi, (_m, attrs: string) => {
    const a = attrs.replace(/\/\s*$/, '').trim()
    return a.length > 0 ? `<Image ${a} />` : '<Image />'
  })
}

function stripNoise(html: string) {
  return html
    .replace(/There is no renderer for block [a-z_]+/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function toFence(language: string, raw: string) {
  const body = raw.replace(/\r\n/g, '\n').replace(/^\n+|\n+$/g, '')
  return `\`\`\`${language}\n${body}\n\`\`\``
}

function extractCodeBlocks(root: HTMLElement, codeBlocks: string[]) {
  const pushFence = (language: string, raw: string, el: HTMLElement) => {
    const index = codeBlocks.length
    codeBlocks.push(toFence(language, raw))
    el.replaceWith(parse(codePhTag(index)))
  }

  for (const pre of [...root.querySelectorAll('pre')]) {
    const code = pre.querySelector('code')
    const lang =
      code?.getAttribute('class')?.match(/language-([\w+-]+)/)?.[1] ??
      pre.getAttribute('class')?.match(/language-([\w+-]+)/)?.[1] ??
      ''
    const raw = (code?.text ?? pre.text).trim()
    if (!raw) {
      pre.remove()
      continue
    }
    pushFence(lang, raw, pre)
  }

  for (const div of [...root.querySelectorAll('.notion-code, [class*="notion-code"]')]) {
    if (div.querySelector('haui-code')) {
      const ph = div.querySelector('haui-code')
      if (ph) div.replaceWith(ph)
      continue
    }

    const code = div.querySelector('code')
    if (!code) continue
    const lang = code.getAttribute('class')?.match(/language-([\w+-]+)/)?.[1] ?? ''
    const raw = code.text.trim()
    if (!raw) {
      div.remove()
      continue
    }
    pushFence(lang, raw, div)
  }

  for (const code of [...root.querySelectorAll('code[class*="language-"]')]) {
    if (code.closest('pre') || code.closest('haui-code')) continue
    const lang = code.getAttribute('class')?.match(/language-([\w+-]+)/)?.[1] ?? ''
    const raw = code.text.trim()
    if (!raw) continue
    if (!raw.includes('\n') && raw.length < 80) continue
    pushFence(lang, raw, code)
  }
}

function transformImages(root: HTMLElement, imageBlocks: string[]) {
  for (const img of root.querySelectorAll('img')) {
    const src = img.getAttribute('src') ?? '/fallback.webp'
    const alt = (img.getAttribute('alt') ?? 'Imagen del proyecto').replace(/"/g, '&quot;')
    const width = img.getAttribute('width')
    const height = img.getAttribute('height')
    const className = (img.getAttribute('class') ?? '').replace(/"/g, '&quot;')
    const sizeAttrs = [width ? `width="${width}"` : '', height ? `height="${height}"` : ''].filter(Boolean).join(' ')
    const classAttr = className.length > 0 ? ` className="${className}"` : ''

    const index = imageBlocks.length
    imageBlocks.push(
      `<img src="${src}" alt="${alt}"${sizeAttrs ? ` ${sizeAttrs}` : ''}${classAttr} loading="lazy" />`
    )
    img.replaceWith(parse(imagePhTag(index)))
  }
}

function cleanCallouts(root: HTMLElement) {
  for (const icon of root.querySelectorAll('.icon')) {
    const text = icon.text.trim()
    if (!text || text === 'null' || text === 'undefined') icon.remove()
  }
}

function stripEmptyNodes(root: HTMLElement) {
  for (const el of root.querySelectorAll('p, span, div')) {
    if (el.querySelector('haui-code') || el.querySelector('haui-image')) continue
    const hasMedia = el.querySelectorAll('img, image, br, a, code, b, strong, i, em, haui-image').length > 0
    const text = el.text.trim()
    if (!text && !hasMedia) el.remove()
  }
}

function normalizeTextNodes(node: HTMLElement) {
  for (const child of node.childNodes) {
    if (child instanceof HTMLElement) {
      normalizeTextNodes(child)
      continue
    }
    if (!(child instanceof TextNode)) continue
    child.rawText = child.rawText.replace(/[ \t]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n')
  }
}

function escapeTextForMdx(node: HTMLElement) {
  for (const child of node.childNodes) {
    if (child instanceof HTMLElement) {
      if (child.tagName === 'CODE' || child.tagName === 'PRE') continue
      escapeTextForMdx(child)
      continue
    }

    if (!(child instanceof TextNode)) continue
    if (child.rawText.includes('haui-code')) continue

    child.rawText = child.rawText.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
}

function formatMdxBody(html: string) {
  return html
    .replace(/[ \t]+$/gm, '')
    .replace(/<\/p>\s*<p/g, '</p>\n\n<p')
    .replace(/<\/h([1-6])>\s*</g, '</h$1>\n\n<')
    .replace(/<\/(ul|ol)>\s*</g, '</$1>\n\n<')
    .replace(/<\/li>\s*<li/g, '</li>\n<li')
    .replace(/<li([^>]*)>([\s\S]*?)<\/li>/gi, (_m, attrs, inner) => {
      const compact = String(inner)
        .replace(/\s*\n\s*/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim()
      return `<li${attrs}>${compact}</li>`
    })
    .replace(/<li([^>]*)>\s+/g, '<li$1>')
    .replace(/\s+<\/li>/g, '</li>')
    .replace(/<(h[1-6]|p|blockquote)([^>]*)>\s+/g, '<$1$2>')
    .replace(/\s+<\/(h[1-6]|p|blockquote)>/g, '</$1>')
    .replace(/\n[ \t]+\n/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
