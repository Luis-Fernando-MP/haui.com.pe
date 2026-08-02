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
 * Pill para tags o tecnologías. Sin `onClick` es solo visual (`span`).
 *
 * @param props.active - Aplica el estilo activo
 * @param props.onClick - Si existe, el chip es interactivo (botón)
 * @default props.active - `false`
 * @example
 * ```tsx
 * <Chip active>React</Chip>
 * <Chip onClick={toggle}>Vue</Chip>
 * ```
 */
const Chip: FC<Props> = ({ children, className, active = false, onClick }) => {
  const styles = cn(
    'inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-sm',
    active ? 'border-transparent bg-fn1 text-bg1' : 'border-bg3 text-fn2',
    className
  )

  if (!onClick) return <span className={styles}>{children}</span>

  return (
    <Button onClick={onClick} variant={active ? 'active' : 'border'} className={cn('rounded-full px-3 py-1.5 text-sm', className)}>
      {children}
    </Button>
  )
}

export default Chip
