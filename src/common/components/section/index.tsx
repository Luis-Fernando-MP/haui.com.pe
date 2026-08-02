import { cn } from '@common/core/cn'
import type { FC, HTMLAttributes, ReactNode } from 'react'

interface Props extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  children?: ReactNode | ReactNode[]
  title?: ReactNode
  subtitle?: ReactNode
  as?: 'section' | 'article'
}

/**
 * Section
 * descripcion: contenedor de sección con título/subtítulo opcionales
 * propiedades:
 * - title?: ReactNode — título principal
 * - subtitle?: ReactNode — texto de apoyo
 * - as?: "section" | "article" — default "section"
 * ejemplos: <Section title="Trabajo">...</Section>
 */
const Section: FC<Props> = ({ children, title, subtitle, as = 'section', className, ...props }) => {
  const Tag = as

  return (
    <Tag className={cn('region max-region:px-5 mx-auto flex flex-col gap-10', className)} {...props}>
      {(title || subtitle) && (
        <header className='flex flex-col gap-2.5'>
          {title && <div>{title}</div>}
          {subtitle && <p className='text-fn2 font-mono'>{subtitle}</p>}
        </header>
      )}
      {children}
    </Tag>
  )
}

export default Section
