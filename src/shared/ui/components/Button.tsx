import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'
import { twMerge } from 'tailwind-merge'

const variants = {
  normal: 'bg-bg2 text-fn1',
  border: 'border-bg3 border-[1.5px]',
  active: 'bg-fn1 text-bg1',
  gradient: 'gradient text-bg1',
  transparent: ''
} as const

type CommonProps = {
  children?: ReactNode | ReactNode[]
  variant?: keyof typeof variants
  noHover?: boolean
  className?: string
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asClass?: false
    ref?: Ref<HTMLButtonElement>
  }

type ButtonAsDiv = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    asClass: true
    ref?: Ref<HTMLDivElement>
  }

type ButtonProps = ButtonAsButton | ButtonAsDiv

const Button = ({
  children,
  className = '',
  asClass = false,
  variant = 'transparent',
  noHover = false,
  ref,
  ...props
}: ButtonProps) => {
  const hoverClass = noHover ? '' : 'hover:opacity-90'
  const baseClasses = cn(
    'w-fit focus:outline-none flex items-center gap-2 rounded-full px-4 py-2 h-fit',
    variants[variant],
    hoverClass,
    className
  )

  const merged = twMerge(baseClasses)

  if (asClass) {
    return (
      <div ref={ref as Ref<HTMLDivElement>} className={merged} {...(props as HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    )
  }

  return (
    <button ref={ref as Ref<HTMLButtonElement>} className={merged} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}

export default Button
