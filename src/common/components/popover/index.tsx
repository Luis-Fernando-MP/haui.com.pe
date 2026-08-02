'use client'

import { cn } from '@common/core/cn'
import { AnimatePresence, motion } from 'motion/react'
import type { FC, ReactNode } from 'react'

interface Props {
  open: boolean
  children?: ReactNode | ReactNode[]
  className?: string
}

/**
 * Panel flotante animado para menús contextuales.
 *
 * @param props.open - Controla la visibilidad
 * @param props.className - Clases adicionales
 * @example
 * ```tsx
 * <Popover open={open}>contenido</Popover>
 * ```
 */
const Popover: FC<Props> = ({ open, children, className }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className={cn(
            'bg-popover text-popover-foreground border-border absolute z-50 rounded-xl border p-2 shadow-md',
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Popover
