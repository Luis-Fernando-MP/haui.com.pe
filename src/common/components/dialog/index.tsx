'use client'

import { cn } from '@common/core/cn'
import { AnimatePresence, motion } from 'motion/react'
import type { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  open: boolean
  onClose: () => void
  children?: ReactNode | ReactNode[]
  className?: string
  title?: string
}

/**
 * Diálogo modal con `AnimatePresence` y tokens haui.
 *
 * @param props.open - Controla la visibilidad
 * @param props.onClose - Cierra al hacer clic en el overlay
 * @param props.title - Etiqueta accesible del diálogo
 * @param props.className - Clases del panel
 * @example
 * ```tsx
 * <Dialog open={open} onClose={close} title="Detalle">
 *   contenido
 * </Dialog>
 * ```
 */
const Dialog: FC<Props> = ({ open, onClose, children, className, title }) => {
  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role='dialog'
          aria-modal='true'
          aria-label={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='bg-background/50 fixed inset-0 z-100 flex items-center justify-center p-5 backdrop-blur-sm'
          onClick={e => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={cn(
              'bg-card text-card-foreground border-border w-full max-w-lg rounded-xl border p-5 shadow-lg',
              className
            )}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default Dialog
