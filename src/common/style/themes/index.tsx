'use client'

import { listThemes } from '@common/components/theme-changer/ThemeChanger'
import ThemeTransition, { type ThemeTransitionType } from '@common/components/theme-transition'
import { ThemeProvider } from 'next-themes'
import { type FC, type ReactNode, useMemo } from 'react'

interface Props {
  children?: ReactNode | ReactNode[]
  transition?: ThemeTransitionType
}

/**
 * Provider de temas haui (`next-themes`) + caja negra `ThemeTransition`.
 *
 * @param props.children - Árbol de la app
 * @param props.transition - Estilo de revelado al cambiar tema
 * @default props.transition - `"circle"`
 * @example
 * ```tsx
 * <Themes transition="png">{children}</Themes>
 * ```
 */
const Themes: FC<Props> = ({ children, transition = 'circle' }) => {
  const themeClasses = useMemo(() => listThemes.filter(id => id !== 'system') as string[], [])

  return (
    <ThemeProvider defaultTheme='system' themes={[...listThemes]} enableSystem attribute='class' disableTransitionOnChange>
      <ThemeTransition type={transition} themes={themeClasses}>
        {children}
      </ThemeTransition>
    </ThemeProvider>
  )
}

export default Themes
export { listThemes }
