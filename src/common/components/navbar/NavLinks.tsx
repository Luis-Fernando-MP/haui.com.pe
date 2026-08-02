'use client'

import Button from '@common/components/button'
import { cn } from '@common/core/cn'
import { NAV_ROUTES } from '@common/core/constants/routes'
import { usePathname } from 'next/navigation'
import type { FC } from 'react'

interface Props {
  className?: string
  isMobile?: boolean
}

const NavLinks: FC<Props> = ({ className, isMobile = false }) => {
  const pathname = usePathname()

  return (
    <div className={cn(className, !isMobile ? 'max-region:hidden' : 'flex-col', 'flex flex-wrap items-center gap-5')}>
      {Object.entries(NAV_ROUTES).map(([key, value]) => {
        const isActive = value.path === pathname ? 'text-gradient' : 'text-fn2'

        return (
          <Button key={key} href={value.path}>
            <h4 className={isActive}>{value.label}</h4>
          </Button>
        )
      })}
    </div>
  )
}

export default NavLinks
