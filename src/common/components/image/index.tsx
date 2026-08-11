import { cn } from '@common/core/cn'
import { Image as UnpicImage } from '@unpic/react/nextjs'
import type { ComponentProps, CSSProperties, FC, Ref } from 'react'

type UnpicProps = ComponentProps<typeof UnpicImage>

interface Props extends UnpicProps {
  className?: string
  style?: CSSProperties
  ref?: Ref<HTMLImageElement>
}

/**
 * Wrapper de `@unpic/react/nextjs`: `<img>` responsive con srcset/sizes.
 * Local (`/…`) y paths sin CDN pasan por el Image Optimizer de Next (`/_next/image` + sharp).
 *
 * @param props.src - Ruta o URL de la imagen
 * @param props.alt - Texto alternativo
 * @param props.width - Ancho intrínseco / tope del layout
 * @param props.height - Alto intrínseco
 * @param props.layout - `"constrained"` | `"fixed"` | `"fullWidth"`
 * @param props.unstyled - Sin estilos de layout de unpic
 * @example
 * ```tsx
 * <Image src="/logo.webp" alt="logo" width={45} height={45} />
 * <Image src="/banner.webp" width={1500} height={1125} layout="fullWidth" unstyled className="absolute inset-0 size-full object-cover" />
 * ```
 */
const Image: FC<Props> = ({ className, alt = '', ref, ...props }) => {
  return <UnpicImage alt={alt} className={cn(className)} {...props} ref={ref} />
}

export default Image
