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
 * @param props.active - Estado seleccionado / marcado
 * @param props.onClick - Si existe, el chip es interactivo (toggle)
 * @default props.active - `false`
 * @example
 * ```tsx
 * <Chip active>React</Chip>
 * <Chip onClick={toggle} active={on}>Vue</Chip>
 * ```
 */
const Chip: FC<Props> = ({ children, className, active = false, onClick }) => {
  const styles = cn(
    'inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium tracking-wide',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-200',
    active && 'border-fn1 bg-fn1 text-bg1 shadow-[0_1px_0_rgb(0_0_0_/_.06)]',
    !active && 'border-bg3/70 bg-bg1/60 text-fn2',
    onClick &&
      'cursor-pointer outline-none select-none focus-visible:ring-2 focus-visible:ring-fn2/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg1 active:scale-[0.97]',
    onClick && !active && 'hover:border-fn2/40 hover:bg-bg2 hover:text-fn1',
    onClick && active && 'hover:bg-fn1/90',
    className
  )

  if (!onClick) return <span className={styles}>{children}</span>

  return (
    <button type='button' aria-pressed={active} onClick={onClick} className={styles}>
      {children}
    </button>
  )
}

export default Chip
