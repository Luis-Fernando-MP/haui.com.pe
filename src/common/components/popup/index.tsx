'use client'

import Button from '@common/components/button'
import { cn } from '@common/core/cn'
import { XIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { Popover as PopoverPrimitive } from 'radix-ui'
import { type ComponentProps, type FC, type HTMLAttributes, type ReactNode, useState } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Popup flotante (Radix Popover + tokens haui). Compound: `Header` / `Content` / `Footer`.
 * Caja negra: gestiona open/focus y no se cierra durante `theme-transition`.
 *
 * @example
 * ```tsx
 * <Popup>
 *   <Popup.Trigger asChild>
 *     <Button variant="outline" size="icon">Open</Button>
 *   </Popup.Trigger>
 *   <Popup.Content align="end">
 *     <Popup.Header>
 *       <Popup.Title>Título</Popup.Title>
 *       <Popup.Close />
 *     </Popup.Header>
 *     <div className="p-2">Cuerpo</div>
 *     <Popup.Footer>Pie</Popup.Footer>
 *   </Popup.Content>
 * </Popup>
 * ```
 */
const PopupRoot: FC<ComponentProps<typeof PopoverPrimitive.Root>> = ({
  modal = false,
  open,
  defaultOpen = false,
  onOpenChange,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = open != null
  const resolvedOpen = isControlled ? open : internalOpen

  return (
    <PopoverPrimitive.Root
      data-slot='popup'
      modal={modal}
      open={resolvedOpen}
      onOpenChange={next => {
        if (!next && document.documentElement.classList.contains('theme-transition')) return
        if (!isControlled) setInternalOpen(next)
        onOpenChange?.(next)
      }}
      {...props}
    />
  )
}

const PopupTrigger: FC<ComponentProps<typeof PopoverPrimitive.Trigger>> = props => {
  return <PopoverPrimitive.Trigger data-slot='popup-trigger' {...props} />
}

const PopupAnchor: FC<ComponentProps<typeof PopoverPrimitive.Anchor>> = props => {
  return <PopoverPrimitive.Anchor data-slot='popup-anchor' {...props} />
}

interface PopupContentProps extends ComponentProps<typeof PopoverPrimitive.Content> {
  children?: ReactNode
}

const PopupContent: FC<PopupContentProps> = ({
  className,
  align = 'end',
  sideOffset = 8,
  onOpenAutoFocus,
  onCloseAutoFocus,
  children,
  ...props
}) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot='popup-content'
        align={align}
        sideOffset={sideOffset}
        onOpenAutoFocus={event => {
          event.preventDefault()
          onOpenAutoFocus?.(event)
        }}
        onCloseAutoFocus={event => {
          event.preventDefault()
          onCloseAutoFocus?.(event)
        }}
        asChild
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22, ease }}
          className={cn(
            'bg-bg1 text-fn1 border-bg3 z-100 w-64 origin-[var(--radix-popover-content-transform-origin)] overflow-hidden rounded-2xl border shadow-[0_18px_42px_-18px_rgba(0,0,0,0.35)] outline-none',
            className
          )}
        >
          {children}
        </motion.div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}

const PopupHeader: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div
      data-slot='popup-header'
      className={cn('border-bg3 flex items-center justify-between gap-3 border-b px-3.5 py-2.5', className)}
      {...props}
    >
      {children}
    </div>
  )
}

const PopupTitle: FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => {
  return (
    <h4 data-slot='popup-title' className={cn('text-fn1 text-sm font-semibold tracking-tight', className)} {...props}>
      {children}
    </h4>
  )
}

const PopupDescription: FC<HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => {
  return (
    <p data-slot='popup-description' className={cn('text-fn2 text-xs leading-relaxed', className)} {...props}>
      {children}
    </p>
  )
}

const PopupFooter: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div
      data-slot='popup-footer'
      className={cn('border-bg3 bg-bg2/40 text-fn2 border-t px-3.5 py-2.5 text-xs', className)}
      {...props}
    >
      {children}
    </div>
  )
}

const PopupClose: FC<ComponentProps<typeof Button>> = ({ className, children, ...props }) => {
  return (
    <PopoverPrimitive.Close asChild>
      <Button
        data-slot='popup-close'
        variant='ghost'
        size='icon'
        aria-label='Cerrar'
        className={cn('size-8 shrink-0', className)}
        {...props}
      >
        {children ?? <XIcon className='text-fn2 size-4' />}
      </Button>
    </PopoverPrimitive.Close>
  )
}

const Popup = Object.assign(PopupRoot, {
  Trigger: PopupTrigger,
  Content: PopupContent,
  Header: PopupHeader,
  Footer: PopupFooter,
  Title: PopupTitle,
  Description: PopupDescription,
  Close: PopupClose,
  Anchor: PopupAnchor
})

export default Popup
export { PopupRoot, PopupTrigger, PopupContent, PopupHeader, PopupFooter, PopupTitle, PopupDescription, PopupClose, PopupAnchor }
