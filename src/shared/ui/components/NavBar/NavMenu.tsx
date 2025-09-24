'use client'

import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react'
import { MenuIcon, XIcon } from 'lucide-react'
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
        <div className='flex items-center justify-between px-4 py-3'>
          <h4 className='text-fn1 font-semibold'>Menú</h4>
          <MenuItem>
            <Button className='px-2' variant='border'>
              <XIcon className='text-fn2 h-5 w-5' />
            </Button>
          </MenuItem>
        </div>

        <MenuSeparator className='bg-bg3 my-1 h-px' />

        <div className='py-1'>
          <NavLinks isMobile />
        </div>
      </MenuItems>
    </Menu>
  )
}

export default NavMenu
