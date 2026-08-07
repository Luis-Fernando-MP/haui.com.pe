import type { FC, SVGProps } from 'react'

/**
 * Marca de Figma (lucide no exporta iconos de marca).
 *
 * @param props - Props SVG estándar
 * @example
 * ```tsx
 * <FigmaIcon className="size-4" />
 * ```
 */
const FigmaIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg viewBox='0 0 24 24' fill='currentColor' className={className} aria-hidden {...props}>
    <path d='M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5Z' />
    <path d='M12 2h3.5A3.5 3.5 0 1 1 12 5.5V2Z' />
    <path d='M12 8.5h3.5a3.5 3.5 0 1 1 0 7H12v-7Z' />
    <path d='M5 12a3.5 3.5 0 0 1 3.5-3.5H12V15H8.5A3.5 3.5 0 0 1 5 12Z' />
    <path d='M5 18.5A3.5 3.5 0 0 1 8.5 15H12v3.5A3.5 3.5 0 1 1 5 18.5Z' />
  </svg>
)

export default FigmaIcon
