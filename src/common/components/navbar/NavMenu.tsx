'use client'

import Button from '@common/components/button'
import { INFO, SOCIAL } from '@common/core/data/info'
import GithubIcon from '@common/icons/github'
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react'
import { BriefcaseBusinessIcon, DownloadIcon, MenuIcon, XIcon } from 'lucide-react'
import type { FC } from 'react'

import NavLinks from './NavLinks'

const NavMenu: FC = () => {
  return (
    <Menu as='div' className='region:hidden relative'>
      {({ open, close }) => (
        <>
          <MenuButton as={Button} variant='outline' className='px-2.5' aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
            {open ? <XIcon className='text-fn1 size-5' /> : <MenuIcon className='text-fn1 size-5' />}
          </MenuButton>

          <MenuItems
            anchor='bottom end'
            className='border-bg3/80 bg-bg1/95 z-50 mt-2 w-64 origin-top-right rounded-2xl border p-2 shadow-lg backdrop-blur-xl focus:outline-none'
          >
            <div className='flex items-center justify-between px-3 py-2.5'>
              <div className='flex flex-col gap-0.5'>
                <span className='text-fn1 text-sm font-semibold'>Navegación</span>
                {!INFO.working.state && <span className='text-fn2 text-xs'>Disponible para proyectos</span>}
              </div>
              <MenuItem>
                <Button className='px-2' variant='outline' aria-label='Cerrar' onClick={close}>
                  <XIcon className='text-fn2 size-4' />
                </Button>
              </MenuItem>
            </div>

            <MenuSeparator className='bg-bg3 my-1 h-px' />

            <div className='py-1'>
              <NavLinks isMobile onNavigate={close} />
            </div>

            <MenuSeparator className='bg-bg3 my-1 h-px' />

            <div className='flex flex-col gap-1 p-1'>
              <MenuItem>
                <Button
                  href={SOCIAL.GitHub.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='ghost'
                  className='w-full justify-start'
                >
                  <GithubIcon className='text-fn1 size-4' />
                  <span className='text-fn2 text-sm'>GitHub</span>
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  href={SOCIAL.LinkedIn.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='ghost'
                  className='w-full justify-start'
                >
                  <BriefcaseBusinessIcon className='text-fn1 size-4' />
                  <span className='text-fn2 text-sm'>LinkedIn</span>
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  href={INFO.cv}
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='default'
                  className='mt-1 w-full justify-center'
                >
                  <DownloadIcon className='size-4' />
                  <span className='text-bg1 text-sm font-semibold'>Descargar CV</span>
                </Button>
              </MenuItem>
            </div>
          </MenuItems>
        </>
      )}
    </Menu>
  )
}

export default NavMenu
