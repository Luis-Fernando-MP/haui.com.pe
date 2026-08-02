import Button from '@common/components/button'
import { cn } from '@common/core/cn'
import type { FC, ReactNode } from 'react'

interface Props {
  children?: ReactNode | ReactNode[]
  className?: string
  active?: boolean
  onClick?: () => void
}

/**
 * Chip
 * descripcion: pill para tags/tecnologías
 * propiedades:
 * - active?: boolean — estilo activo — default false
 * - onClick?: () => void — si existe, es interactivo
 * ejemplos: <Chip active>React</Chip>
 */
const Chip: FC<Props> = ({ children, className, active = false, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant={active ? 'active' : 'border'}
      className={cn('rounded-full px-3 py-1.5 text-sm', className)}
    >
      {children}
    </Button>
  )
}

export default Chip
