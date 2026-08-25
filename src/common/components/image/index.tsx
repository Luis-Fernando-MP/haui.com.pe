import { cn } from '@common/core/cn'
import { Image as UnpicImage } from '@unpic/react/nextjs'
import type { ComponentProps, CSSProperties, FC, Ref } from 'react'

type UnpicProps = ComponentProps<typeof UnpicImage>

interface Props extends UnpicProps {
  className?: string
  ref?: Ref<HTMLImageElement>
  /**
   * Sirve el asset tal cual (sin `/_next/image` + sharp).
   * Usar en logos / LCP donde la recompresión borra nitidez.
   * @default false
   */
  unoptimized?: boolean
}

/**
 * Wrapper de `@unpic/react/nextjs`: `<img>` responsive con srcset/sizes.
 * Local (`/…`) pasa por el Image Optimizer de Next salvo `unoptimized`.
 *
 * @param props.src - Ruta o URL de la imagen
 * @param props.alt - Texto alternativo
 * @param props.width - Ancho intrínseco / tope del layout
 * @param props.height - Alto intrínseco
 * @param props.layout - `"constrained"` | `"fixed"` | `"fullWidth"`
 * @param props.quality - Calidad del optimizador Next (1–100), ignorado si `unoptimized`
 * @param props.unoptimized - Sirve el archivo original sin re-encode
 * @param props.unstyled - Sin estilos de layout de unpic
 * @example
 * ```tsx
 * <Image src="/logo.webp" alt="logo" width={45} height={45} />
 * <Image src="/logo-big.webp" width={985} height={1000} unoptimized priority className="w-[360px]" />
 * <Image src="/banner.webp" width={1500} height={1125} layout="fullWidth" unstyled className="absolute inset-0 size-full object-cover" />
 * ```
 */
const Image: FC<Props> = ({ className, alt = '', ref, unoptimized = false, src, width, height, priority, objectFit, ...props }) => {
  if (unoptimized && typeof src === 'string') {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={typeof width === 'number' ? width : undefined}
        height={typeof height === 'number' ? height : undefined}
        className={cn(className)}
        style={objectFit ? ({ objectFit } as CSSProperties) : undefined}
        decoding='async'
        fetchPriority={priority ? 'high' : 'auto'}
        loading={priority ? 'eager' : 'lazy'}
      />
    )
  }

  return <UnpicImage alt={alt} className={cn(className)} src={src} width={width} height={height} priority={priority} objectFit={objectFit} ref={ref} {...props} />
}

export default Image
