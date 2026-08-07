import { cn } from '@common/core/cn'
import { Image as UnpicImage } from '@unpic/react/base'
import type { ComponentProps, FC } from 'react'

/** Assets del portafolio ya están en public/; no pasamos por `/_next/image`. */
const passthrough = (src: string | URL) => src.toString()

type UnpicProps = ComponentProps<typeof UnpicImage>

interface Props extends Omit<UnpicProps, 'transformer'> {
  className?: string
  ref?: React.Ref<HTMLImageElement>
}

/**
 * Wrapper de `@unpic/react` (base): `<img>` responsive, sin Image ni `/_next/image` de Next.
 *
 * @param props.src - Ruta o URL de la imagen
 * @param props.alt - Texto alternativo
 * @param props.width - Ancho intrínseco
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
  return <UnpicImage transformer={passthrough} alt={alt} className={cn(className)} {...(props as any)} ref={ref} />
}

export default Image
