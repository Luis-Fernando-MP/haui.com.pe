import { cn } from '@common/core/cn'
import type { FC, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

/**
 * Campo de texto del design system haui.
 *
 * @param props.type - Tipo nativo del input
 * @param props.className - Clases adicionales
 * @example
 * ```tsx
 * <Input type="email" placeholder="hola@mail.com" />
 * ```
 */
const Input: FC<Props> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        'border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-lg border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none',
        className
      )}
      {...props}
    />
  )
}

export default Input
