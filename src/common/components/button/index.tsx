import { cn } from '@common/core/cn'
import Link from 'next/link'
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

const variants = {
  normal: 'bg-bg2 text-fn1',
  border: 'border-bg3 border-[1.5px]',
  active: 'bg-fn1 text-bg1',
  gradient: 'gradient text-bg1',
  transparent: ''
} as const

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode | ReactNode[]
  href?: string
  target?: string
  rel?: string
  variant?: keyof typeof variants
  noHover?: boolean
  className?: string
}

/**
 * Button
 * descripcion: botón de UI; si recibe href renderiza Link de Next.js con el mismo estilo
 * propiedades:
 * - href?: string — si existe, el nodo es un Link
 * - target?: string — target del Link (ej. _blank)
 * - rel?: string — rel del Link
 * - variant?: "normal" | "border" | "active" | "gradient" | "transparent" — default "transparent"
 * - noHover?: boolean — default false
 * ejemplos: <Button variant="border">Ok</Button> / <Button href="/about">About</Button>
 */
const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { children, className = '', href, target, rel, variant = 'transparent', noHover = false, type = 'button', ...props },
  ref
) {
  const merged = cn(
    'w-fit outline-none focus-visible:ring-2 focus-visible:ring-fn2/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg1 flex items-center gap-2 rounded-full px-4 py-2 h-fit transition-opacity duration-200',
    variants[variant],
    !noHover && 'hover:opacity-90',
    className
  )

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={merged}>
        {children}
      </Link>
    )
  }

  return (
    <button ref={ref} type={type} className={merged} {...props}>
      {children}
    </button>
  )
})

export default Button
