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
      <MenuItems
        anchor='bottom end'
        className='border-bg3 bg-bg1 w-48 origin-top-right rounded-xl border px-1 py-2 focus:outline-none'
      >
        <NavLinks isMobile />
      </MenuItems>
    </Menu>
  )
}

export default NavMenu
