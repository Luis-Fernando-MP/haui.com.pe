'use client'

import Button from '@common/components/button'
import { cn } from '@common/core/cn'
import { NAV_ROUTES } from '@common/core/data/routes'
import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { type FC, useEffect, useState } from 'react'

interface Props {
  className?: string
  isMobile?: boolean
  onNavigate?: () => void
}

const NavLinks: FC<Props> = ({ className, isMobile = false, onNavigate }) => {
  const pathname = usePathname()
  const [hash, setHash] = useState('')

  useEffect(() => {
    const sync = () => setHash(window.location.hash)
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [pathname])

  return (
    <div className={cn('flex items-center', isMobile ? 'w-full flex-col gap-1' : 'flex-nowrap gap-1.5 p-1', className)}>
      {Object.entries(NAV_ROUTES).map(([key, value]) => {
        const hashTarget = value.path.includes('#') ? value.path.slice(value.path.indexOf('#')) : ''
        const isActive =
          value.path === '/about'
            ? pathname.startsWith('/about')
            : pathname === '/' && hashTarget.length > 0 && hash === hashTarget

        return (
          <Button
            key={key}
            href={value.path}
            onClick={onNavigate}
            variant='ghost'
            noHover
            className={cn(
              'relative shrink-0 rounded-full px-3.5 py-2 whitespace-nowrap transition-colors duration-300',
              isMobile && 'w-full justify-start px-5 py-3',
              isActive ? 'text-fn1' : 'text-fn2 hover:text-fn1'
            )}
          >
            {isActive && !isMobile && (
              <motion.div
                layoutId='nav-active'
                className='bg-bg3/40 absolute inset-0 -z-10 rounded-full'
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <p className={cn('text-sm font-semibold tracking-wide whitespace-nowrap', isActive && 'text-gradient')}>
              {value.label}
            </p>
          </Button>
        )
      })}
    </div>
  )
}

export default NavLinks
