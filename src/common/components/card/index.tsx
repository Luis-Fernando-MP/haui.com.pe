import { cn } from '@common/core/cn'
import type { FC, HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode | ReactNode[]
}

/**
 * Card
 * descripcion: contenedor de contenido con borde del design system haui
 * propiedades: className y atributos HTML de div
 * ejemplos: <Card className="p-5">contenido</Card>
 */
const Card: FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={cn('border-bg3 rounded-xl border', className)} {...props}>
      {children}
    </div>
  )
}

export default Card
