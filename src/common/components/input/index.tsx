import { cn } from '@common/core/cn'
import type { FC, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

/**
 * Input
 * descripcion: campo de texto del design system haui
 * propiedades: atributos nativos de input + className
 * ejemplos: <Input type="email" placeholder="hola@mail.com" />
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
