'use client'

import { useEffect, type FC, type ReactNode } from 'react'
import { flushSync } from 'react-dom'

import './theme-transition.css'

export const themeTransitionTypes = [
  'circle',
  'circle-with-blur',
  'circle-blur-top-left',
  'polygon',
  'polygon-gradient',
  'png'
] as const

type ThemeTransitionType = (typeof themeTransitionTypes)[number]

interface Props {
  children?: ReactNode | ReactNode[]
  type?: ThemeTransitionType
  themes: string[]
}

const ThemeTransitionEngine: FC<{ type: ThemeTransitionType; themes: string[] }> = ({ type, themes }) => {
  useEffect(() => {
    const root = document.documentElement
    const list = root.classList
    const themeSet = new Set(themes)

    const originalAdd = list.add.bind(list)
    const originalRemove = list.remove.bind(list)
    const originalToggle = list.toggle.bind(list)
    const originalReplace = list.replace.bind(list)

    let queue: Array<() => void> = []
    let flushScheduled = false
    let active = false

    const canTransition = () =>
      typeof document.startViewTransition === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const isThemeToken = (tokens: string[]) => tokens.some(token => themeSet.has(token))

    const flush = () => {
      flushScheduled = false
      const ops = queue
      queue = []
      if (ops.length === 0) return

      if (active || !canTransition()) {
        ops.forEach(op => op())
        return
      }

      active = true
      root.dataset.themeTransition = type
      originalAdd('theme-transition')

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          ops.forEach(op => op())
        })
      })

      transition.finished.finally(() => {
        originalRemove('theme-transition')
        delete root.dataset.themeTransition
        active = false
      })
    }

    const enqueue = (op: () => void, tokens: string[]) => {
      if (active || !isThemeToken(tokens)) {
        op()
        return
      }

      queue.push(op)
      if (flushScheduled) return
      flushScheduled = true
      queueMicrotask(flush)
    }

    list.add = (...tokens: string[]) => {
      enqueue(() => originalAdd(...tokens), tokens)
    }

    list.remove = (...tokens: string[]) => {
      if (tokens.length === 1 && tokens[0] === 'theme-transition') {
        originalRemove(...tokens)
        return
      }
      enqueue(() => originalRemove(...tokens), tokens)
    }

    list.toggle = (token: string, force?: boolean) => {
      if (!themeSet.has(token)) return originalToggle(token, force)

      let result = false
      enqueue(() => {
        result = originalToggle(token, force)
      }, [token])
      return result
    }

    list.replace = (oldToken: string, newToken: string) => {
      if (!themeSet.has(oldToken) && !themeSet.has(newToken)) {
        return originalReplace(oldToken, newToken)
      }

      let result = false
      enqueue(() => {
        result = originalReplace(oldToken, newToken)
      }, [oldToken, newToken])
      return result
    }

    return () => {
      list.add = originalAdd
      list.remove = originalRemove
      list.toggle = originalToggle
      list.replace = originalReplace
    }
  }, [type, themes])

  return null
}

/**
 * Caja negra de transición de tema (View Transitions API). Intercepta cambios de clase en `html` y aplica el revelado.
 *
 * @param props.type - Estilo: `"circle"` | `"circle-with-blur"` | `"circle-blur-top-left"` | `"polygon"` | `"polygon-gradient"` | `"png"`
 * @param props.themes - Clases de tema a interceptar (sin `"system"`)
 * @param props.children - Árbol de la app
 * @default props.type - `"circle"`
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <ThemeTransition type="png" themes={['light', 'dark', 'shei']}>
 *     {children}
 *   </ThemeTransition>
 * </ThemeProvider>
 * ```
 */
const ThemeTransition: FC<Props> = ({ type = 'circle', themes, children }) => {
  return (
    <>
      <ThemeTransitionEngine type={type} themes={themes} />
      {children}
    </>
  )
}

export default ThemeTransition
export type { ThemeTransitionType }
