import { cn } from '@common/core/cn'
import type { FC, SelectHTMLAttributes } from 'react'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string
  options: {
    value: string
    label: string
  }[]
}

/**
 * Select
 * descripcion: selector nativo estilizado con tokens haui
 * propiedades:
 * - options: { value, label }[] — opciones del select
 * ejemplos: <Select options={[{ value: "a", label: "A" }]} />
 */
const Select: FC<Props> = ({ className, options, ...props }) => {
  return (
    <select
      className={cn(
        'border-border bg-background text-foreground focus-visible:ring-ring flex h-10 w-full rounded-lg border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none',
        className
      )}
      {...props}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
