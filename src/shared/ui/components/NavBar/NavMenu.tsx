'use client'

import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { MenuIcon } from 'lucide-react'
import type { FC } from 'react'

import Button from '../Button'
import NavLinks from './NavLinks'

const NavMenu: FC = () => {
  return (
    <Menu as='div' className='region:hidden relative'>
      <MenuButton as={Button}>
        <MenuIcon />
      </MenuButton>
      <MenuItems anchor='bottom' className='bg-bg1 border-bg3 z-50 w-48 rounded-xl border px-1 py-2 focus:outline-none'>
        <NavLinks isMobile />
      </MenuItems>
    </Menu>
  )
}

export default NavMenu
