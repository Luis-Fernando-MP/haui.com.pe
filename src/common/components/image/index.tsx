import { cn } from '@common/core/cn'
import { Image as UnpicImage } from '@unpic/react/nextjs'
import type { ComponentProps, FC } from 'react'

interface Props extends Omit<ComponentProps<typeof UnpicImage>, 'layout'> {
  className?: string
}

/**
 * Image
 * descripcion: wrapper de @unpic/react para assets estables del portafolio con buena cache
 * propiedades: mismas de Unpic Image (src, alt, width, height, priority, ...)
 * ejemplos: <Image src="/logo.webp" alt="logo" width={45} height={45} />
 */
const Image: FC<Props> = ({ className, alt = '', ...props }) => {
  return <UnpicImage alt={alt} className={cn(className)} {...props} />
}

export default Image
