import { cn } from '@common/core/cn'
import type { FC, HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode | ReactNode[]
}

/**
 * Contenedor de contenido con borde del design system haui.
 *
 * @param props.className - Clases adicionales
 * @example
 * ```tsx
 * <Card className="p-5">contenido</Card>
 * ```
 */
const Card: FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={cn('border-bg3 rounded-xl border', className)} {...props}>
      {children}
    </div>
  )
}

export default Card
