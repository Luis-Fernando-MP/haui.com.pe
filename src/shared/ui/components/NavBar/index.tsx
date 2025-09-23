'use client'

import { Image } from '@unpic/react/nextjs'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'

import Button from '../Button'
import NavLinks from './NavLinks'
import NavMenu from './NavMenu'

const NavBar: FC = () => {
  return (
    <nav className='from-bg1 sticky top-0 w-full bg-gradient-to-b from-70% to-transparent to-95% pt-5 pb-10'>
      <div className='region max-region:px-5 mx-auto flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-3'>
          <Image src='/logo.webp' className='rounded-md' width={45} height={45} alt='logo' />
          <h3 className='text-3xl font-extrabold'>Haui</h3>
        </Link>

        <NavLinks />

        <div className='flex flex-wrap items-center gap-5'>
          <NavMenu />
          <Button className='rounded-full' variant='active'>
            <h3 className='text-bg1'>Descargar CV</h3>
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
