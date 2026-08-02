import { cn } from '@common/core/cn'
import type { FC, HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode | ReactNode[]
  as?: 'h1' | 'h2' | 'h3'
}

/**
 * Title
 * descripcion: título de sección del portafolio con tipografía display equilibrada
 * propiedades:
 * - as?: "h1" | "h2" | "h3" — nivel semántico — default "h2"
 * ejemplos: <Title>Hablemos</Title> / <Title as="h1">…</Title>
 */
const Title: FC<Props> = ({ className, children, as = 'h2', ...props }) => {
  const Tag = as

  return (
    <Tag className={cn('text-pretty text-5xl leading-[1.1] font-bold tracking-tight max-sm:text-4xl md:text-6xl', className)} {...props}>
      {children}
    </Tag>
  )
}

export default Title
