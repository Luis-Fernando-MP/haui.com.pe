'use client'

import { listThemes } from '@common/components/theme-changer/ThemeChanger'
import { ThemeProvider } from 'next-themes'
import type { FC, ReactNode } from 'react'

interface Props {
  children?: ReactNode | ReactNode[]
}

/**
 * Themes
 * descripcion: provider de temas haui (next-themes) con la lista de temas del portafolio
 * propiedades:
 * - children?: ReactNode — árbol de la app
 * ejemplos: <Themes>{children}</Themes>
 */
const Themes: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme='system' themes={listThemes} enableSystem attribute='class' disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}

export default Themes
export { listThemes }
