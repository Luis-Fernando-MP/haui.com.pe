import { cn } from '@common/core/cn'
import { Image as UnpicImage } from '@unpic/react/nextjs'
import type { ComponentProps, FC } from 'react'

interface Props extends Omit<ComponentProps<typeof UnpicImage>, 'layout'> {
  className?: string
}

/**
 * Wrapper de `@unpic/react` para assets estables del portafolio.
 *
 * @param props.src - Ruta o URL de la imagen
 * @param props.alt - Texto alternativo
 * @param props.width - Ancho intrínseco
 * @param props.height - Alto intrínseco
 * @param props.priority - Prioridad de carga (LCP)
 * @example
 * ```tsx
 * <Image src="/logo.webp" alt="logo" width={45} height={45} />
 * ```
 */
const Image: FC<Props> = ({ className, alt = '', ...props }) => {
  return <UnpicImage alt={alt} className={cn(className)} {...props} />
}

export default Image
