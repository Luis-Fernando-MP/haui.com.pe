import { cn } from '@common/core/cn'
import type { FC, HTMLAttributes, ReactNode } from 'react'

interface Props extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  children?: ReactNode | ReactNode[]
  title?: ReactNode
  subtitle?: ReactNode
  as?: 'section' | 'article'
}

/**
 * Contenedor de sección con título y subtítulo opcionales.
 *
 * @param props.title - Título principal
 * @param props.subtitle - Texto de apoyo
 * @param props.as - Elemento semántico: `"section"` | `"article"`
 * @default props.as - `"section"`
 * @example
 * ```tsx
 * <Section title="Trabajo">contenido</Section>
 * ```
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
