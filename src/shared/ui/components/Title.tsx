import { cn } from '@/lib/utils'
import type { FC, HtmlHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends HtmlHTMLAttributes<HTMLElement> {
  children?: ReactNode | ReactNode[]
}

const Title: FC<Props> = ({ className, children, ...props }) => {
  return (
    <h2 className={twMerge(cn('text-6xl leading-normal font-bold max-sm:text-4xl', className))} {...props}>
      {children}
    </h2>
  )
}

export default Title
