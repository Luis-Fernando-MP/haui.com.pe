'use client'

import { Image } from '@unpic/react/nextjs'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { FC } from 'react'

import { NAV_ROUTES } from '../config/constants/routes'

const NavBar: FC = () => {
  const pathname = usePathname()

  return (
    <nav className='from-bg1 sticky top-0 w-full bg-gradient-to-b from-70% to-transparent to-95% pt-5 pb-10'>
      <div className='region max-region:px-5 mx-auto flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-3'>
          <Image src='/logo.webp' className='rounded-md' width={45} height={45} alt='logo' />
          <h3 className='text-3xl font-extrabold'>Haui</h3>
        </Link>

        <div className='max-region:hidden flex flex-wrap items-center gap-5'>
          {Object.entries(NAV_ROUTES).map(route => {
            const [key, value] = route

            const { path, label } = value

            const isActive = path === pathname ? 'text-gradient' : 'text-fn2'

            return (
              <Link key={key} href={value.path} className={`text-h4 p-3 ${isActive}`}>
                {label}
              </Link>
            )
          })}
        </div>

        <div className='flex flex-wrap items-center gap-5'>
          <button className='border-bg3 text-fn2 region:hidden rounded-full border p-2.5'>
            <MenuIcon />
          </button>

          <button className='rounded-full bg-white px-4 py-2'>
            <h3 className='text-bg1'>Descargar CV</h3>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
