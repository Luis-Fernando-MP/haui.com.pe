import { cn } from '@common/core/cn'
import { Image as UnpicImage } from '@unpic/react/nextjs'
import type { ComponentProps, FC } from 'react'

interface Props extends ComponentProps<typeof UnpicImage> {
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
 * @param props.layout - Layout de unpic: `"constrained"` | `"fixed"` | `"fullWidth"`
 * @param props.unstyled - Si es `true`, no aplica estilos de layout de unpic (útil para cover en parent)
 * @example
 * ```tsx
 * <Image src="/logo.webp" alt="logo" width={45} height={45} />
 * <Image src="/banner.webp" width={1500} height={1125} unstyled className="absolute inset-0 size-full object-cover" />
 * ```
 */
const Image: FC<Props> = ({ className, alt = '', ...props }) => {
  return <UnpicImage alt={alt} className={cn(className)} {...props} />
}

export default Image
