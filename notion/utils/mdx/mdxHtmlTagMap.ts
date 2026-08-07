export const replaceHtmlTag = {
  a: 'MDXLink'
} as const

export const customTags = {
  Image: true
} as const

export function applyReplaceHtmlTag(html: string) {
  let out = html
  for (const [from, to] of Object.entries(replaceHtmlTag)) {
    out = out.replace(new RegExp(`</${from}>`, 'gi'), `</${to}>`).replace(new RegExp(`<${from}\\b`, 'gi'), `<${to}`)
  }
  return out
}

export function selfCloseCustomTags(html: string) {
  let out = html
  for (const tag of Object.keys(customTags)) {
    out = out.replace(new RegExp(`<${tag}\\b([^>]*?)\\s*(?:\\/>|>\\s*<\\/${tag}>)`, 'gi'), (_m, attrs: string) => {
      const a = attrs.replace(/\/\s*$/, '').trim()
      return a.length > 0 ? `<${tag} ${a} />` : `<${tag} />`
    })
  }
  return out
}
