import { cn } from '@common/core/cn'
import { type VariantProps, cva } from 'class-variance-authority'
import { ArrowUpRightIcon } from 'lucide-react'
import Link from 'next/link'
import { type ButtonHTMLAttributes, type MouseEventHandler, type ReactNode, forwardRef } from 'react'

const buttonVariants = cva(
  'rounded-full text-sm font-medium whitespace-nowrap outline-none transition-[background-color,border-color,opacity,color,text-decoration-color] duration-200 focus-visible:ring-2 focus-visible:ring-fn2/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg1 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-fn1 text-bg1 hover:bg-fn1/90',
        secondary: 'bg-bg2 text-fn1 hover:bg-bg3',
        destructive: 'bg-semantic-danger text-bg1 hover:bg-semantic-danger/90',
        outline: 'border-bg3 bg-bg1 text-fn1 border-[1.5px] hover:border-fn2/40 hover:bg-bg2',
        ghost: 'text-fn1 hover:bg-bg2',
        link: 'text-fn1 min-h-0 h-auto w-fit rounded-none px-0 underline-offset-4 hover:underline'
      },
      size: {
        default: 'min-h-9 h-9 w-fit px-4 py-2',
        sm: 'min-h-9 h-9 w-fit px-3 text-xs',
        lg: 'min-h-9 h-9 w-fit px-6 text-base',
        icon: 'size-9 shrink-0 p-0'
      },
      styles: {
        default: '',
        gradient: 'gradient border-transparent text-bg1 hover:bg-transparent hover:opacity-90',
        transparent: 'border-transparent bg-transparent shadow-none hover:bg-bg2/70',
        soft: 'border-transparent bg-bg2/50 text-fn1 hover:bg-bg2'
      },
      status: {
        default: '',
        danger:
          'border border-semantic-danger/35 bg-semantic-danger/12 text-semantic-text-danger hover:border-semantic-danger/50 hover:bg-semantic-danger/20',
        warning:
          'border border-semantic-warning/35 bg-semantic-warning/12 text-semantic-text-warning hover:border-semantic-warning/50 hover:bg-semantic-warning/20',
        info: 'border border-semantic-info/35 bg-semantic-info/12 text-semantic-text-info hover:border-semantic-info/50 hover:bg-semantic-info/20',
        success:
          'border border-semantic-success/35 bg-semantic-success/12 text-semantic-text-success hover:border-semantic-success/50 hover:bg-semantic-success/20'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      styles: 'default',
      status: 'default'
    }
  }
)

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children?: ReactNode | ReactNode[]
  href?: string
  target?: string
  rel?: string
  noHover?: boolean
  showIconLink?: boolean
  center?: boolean
  className?: string
}

/**
 * Botón de UI (API shadcn: `variant` + `size` + `styles` + `status`); con `href` renderiza un `Link`.
 *
 * @param props.href - Si existe, el nodo es un Link
 * @param props.target - Target del Link (ej. `_blank`)
 * @param props.rel - Rel del Link
 * @param props.variant - `"default"` | `"secondary"` | `"destructive"` | `"outline"` | `"ghost"` | `"link"`
 * @param props.size - `"default"` | `"sm"` | `"lg"` | `"icon"`
 * @param props.styles - Acabado visual: `"default"` | `"gradient"` | `"transparent"` | `"soft"`
 * @param props.status - Tinte semántico: `"danger"` | `"warning"` | `"info"` | `"success"`
 * @param props.center - Aplica `flex items-center justify-center gap-1.5`
 * @param props.noHover - Quita los estilos hover de la variante
 * @param props.showIconLink - En links, muestra `ArrowUpRight` con hover
 * @default props.variant - `"default"`
 * @default props.size - `"default"`
 * @default props.styles - `"default"`
 * @default props.status - `"default"`
 * @default props.center - `true`
 * @default props.noHover - `false`
 * @default props.showIconLink - `false`
 * @example
 * ```tsx
 * <Button variant="outline" size="sm">Ok</Button>
 * <Button styles="gradient">CTA</Button>
 * <Button status="success">Disponible</Button>
 * <Button href="/about" showIconLink>About</Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    children,
    className,
    href,
    target,
    rel,
    variant,
    size,
    styles,
    status,
    center = true,
    noHover = false,
    showIconLink = false,
    type = 'button',
    onClick,
    ...props
  },
  ref
) {
  const hasStatus = Boolean(status) && status !== 'default'
  const resolvedVariant = hasStatus && (variant == null || variant === 'default') ? 'ghost' : variant

  const merged = cn(
    buttonVariants({ variant: resolvedVariant, size, styles, status }),
    center && 'flex items-center justify-center gap-1.5',
    noHover && 'hover:bg-transparent hover:border-bg3 hover:opacity-100 hover:no-underline',
    Boolean(href) && showIconLink && 'group',
    className
  )

  const content = (
    <>
      {typeof children === 'string' ? <p>{children}</p> : children}
      {Boolean(href) && showIconLink && (
        <ArrowUpRightIcon
          className='size-4 shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:opacity-100 motion-reduce:transition-none'
          aria-hidden
        />
      )}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={merged}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {content}
      </Link>
    )
  }

  return (
    <button ref={ref} type={type} className={merged} onClick={onClick} {...props}>
      {content}
    </button>
  )
})

export default Button
export { buttonVariants }
