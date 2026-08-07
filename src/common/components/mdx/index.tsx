'use client'

import { cn } from '@common/core/cn'
import type { MDXComponents } from 'mdx/types'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import type { FC } from 'react'

import { mdxComponents } from './mdx-components'
import './mdx.css'

export { mdxComponents } from './mdx-components'

interface Props {
  code: string
  components?: MDXComponents
  className?: string
}

/**
 * Renderiza `body.code` de Contentlayer con tipografía/estilos haui y componentes React.
 * Pasa `components` para extender u overridear el mapa base.
 *
 * @param props.code - Código MDX compilado (`doc.body.code`)
 * @param props.components - Overrides / tags extra mergeados sobre `mdxComponents`
 * @param props.className - Clases extra del wrapper (la base `.mdx` ya va incluida)
 * @example
 * ```tsx
 * <Mdx code={doc.body.code} />
 * <Mdx code={doc.body.code} className="mx-auto max-w-2xl" />
 * <Mdx code={doc.body.code} components={{ a: props => <Link {...props} /> }} />
 * ```
 */
const Mdx: FC<Props> = ({ code, components, className }) => {
  const MDXContent = useMDXComponent(code)

  if (code.trim().length === 0) return null

  return (
    <article className={cn('mdx', className)}>
      <MDXContent components={{ ...mdxComponents, ...components }} />
    </article>
  )
}

export default Mdx
