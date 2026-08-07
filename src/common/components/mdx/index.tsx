'use client'

import Image from '@common/components/image'
import type { MDXComponents } from 'mdx/types'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import type { ComponentProps, FC } from 'react'

const MdxImage = (props: ComponentProps<typeof Image>) => (
  <Image width={1500} height={1125} layout='constrained' alt='' {...props} />
)

export const mdxComponents: MDXComponents = {
  Image: MdxImage
}

interface Props {
  code: string
  components?: MDXComponents
  className?: string
}

/**
 * Renderiza `body.code` de Contentlayer con el mapa base de componentes React.
 * Pasa `components` para extender u overridear el estándar.
 *
 * @param props.code - Código MDX compilado (`post.body.code`)
 * @param props.components - Overrides / tags extra mergeados sobre `mdxComponents`
 * @param props.className - Clase del wrapper
 * @example
 * ```tsx
 * <Mdx code={doc.body.code} />
 * <Mdx code={doc.body.code} components={{ a: props => <Link {...props} /> }} />
 * ```
 */
const Mdx: FC<Props> = ({ code, components, className }) => {
  const MDXContent = useMDXComponent(code)

  if (code.trim().length === 0) return null

  const content = <MDXContent components={{ ...mdxComponents, ...components }} />
  if (!className) return content

  return <div className={className}>{content}</div>
}

export default Mdx
