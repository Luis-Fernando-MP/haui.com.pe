'use client'

import { INFO } from '@/shared/config/constants'
import { Image } from '@unpic/react/nextjs'
import Link from 'next/link'
import type { FC } from 'react'

import Button from '../Button'
import ThemeChanger from '../ThemeChanger'
import NavLinks from './NavLinks'
import NavMenu from './NavMenu'

const NavBar: FC = () => {
  return (
    <nav className='from-bg1 sticky top-0 z-50 w-full bg-gradient-to-b from-70% to-transparent pt-5 pb-15'>
      <div className='region max-region:px-5 max-min:items-center max-min:justify-center max-min:gap-5 mx-auto flex flex-wrap items-center justify-between max-sm:justify-center max-sm:gap-5'>
        <Link href='/' className='flex items-center gap-3'>
          <Image
            src='/logo.webp'
            className='bg-logo-bg aspect-square h-[45px] w-[45px] rounded-md p-1'
            width={45}
            height={45}
            alt='logo'
          />
          <h3 className='text-gradient text-3xl font-extrabold'>Haui</h3>
        </Link>

        <NavLinks />

        <div className='flex flex-wrap items-center gap-5'>
          <NavMenu />
          <ThemeChanger />
          <Link href={INFO.cv} target='_blank' rel='noopener noreferrer'>
            <Button asClass className='rounded-full' variant='active'>
              <h3 className='text-bg1'>Descargar CV</h3>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
