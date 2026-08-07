import Image from '@common/components/image'
import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import type { ComponentProps } from 'react'

const MdxImage = (props: ComponentProps<typeof Image>) => (
  <Image width={1500} height={1125} layout='constrained' alt='' {...props} />
)

const MdxAnchor = ({ href, children, ...props }: ComponentProps<'a'>) => {
  if (!href) return <span {...props}>{children}</span>

  return (
    <Link href={href} {...props} target='_blank' rel='noopener noreferrer'>
      {children}
    </Link>
  )
}

export const mdxComponents: MDXComponents = {
  Image: MdxImage,
  MDXLink: MdxAnchor,
  a: MdxAnchor
}
