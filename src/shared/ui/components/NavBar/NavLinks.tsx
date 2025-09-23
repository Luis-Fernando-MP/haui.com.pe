'use client'

import { cn } from '@/lib/utils'
import { NAV_ROUTES } from '@/shared/config/constants/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { FC } from 'react'

import Button from '../Button'

interface Props {
  className?: string
  isMobile?: boolean
}

const NavLinks: FC<Props> = ({ className, isMobile = false }) => {
  const pathname = usePathname()

  return (
    <div className={cn(className, !isMobile ? 'max-region:hidden' : 'flex-col', 'flex flex-wrap items-center gap-5')}>
      {Object.entries(NAV_ROUTES).map(route => {
        const [key, value] = route

        const { path, label } = value

        const isActive = path === pathname ? 'text-gradient' : 'text-fn2'

        return (
          <Link key={key} href={value.path}>
            <Button asClass>
              <h4 className={`${isActive}`}>{label}</h4>
            </Button>
          </Link>
        )
      })}
    </div>
  )
}

export default NavLinks
