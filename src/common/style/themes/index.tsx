'use client'

import { listThemes } from '@common/components/theme-changer/ThemeChanger'
import { ThemeProvider } from 'next-themes'
import type { FC, ReactNode } from 'react'

interface Props {
  children?: ReactNode | ReactNode[]
}

/**
 * Provider de temas haui (`next-themes`) con la lista del portafolio.
 *
 * @param props.children - Árbol de la app
 * @example
 * ```tsx
 * <Themes>{children}</Themes>
 * ```
 */
const Themes: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme='system' themes={[...listThemes]} enableSystem attribute='class' disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}

export default Themes
export { listThemes }
