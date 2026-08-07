import type { FC, SVGProps } from 'react'

/**
 * Marca de Notion (lucide no exporta iconos de marca).
 *
 * @param props - Props SVG estándar
 * @example
 * ```tsx
 * <NotionIcon className="size-4" />
 * ```
 */
const NotionIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <svg viewBox='0 0 24 24' fill='currentColor' className={className} aria-hidden {...props}>
    <path d='M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.387 2.57c-.42-.326-.981-.7-2.055-.607L3.01 3.04c-.56.046-.746.28-.887.607l-.42 1.326c-.047.233.14.326.42.28l.0-.047Zm1.074 2.147v13.822c0 .747.373 1.027 1.214.98l14.196-.84c.84-.046.98-.56.98-1.167V5.889c0-.606-.233-.886-.747-.84l-14.897.887c-.56.046-.746.326-.746.84Zm13.029 1.027c.093.42 0 .84-.42.886l-.7.14v10.174c-.607.326-1.167.514-1.634.514-.747 0-.933-.233-1.494-.933l-4.576-7.19v6.953l1.447.326s0 .84-1.167.84l-3.22.187c-.093-.187 0-.653.327-.746l.84-.233V9.662l-1.167-.093c-.093-.42.28-1.027.98-1.074l3.406-.233 4.69 7.19v-6.36l-1.214-.14c-.093-.514.28-.886.747-.933l3.243-.186Z' />
  </svg>
)

export default NotionIcon
