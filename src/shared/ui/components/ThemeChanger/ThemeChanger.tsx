'use client'

import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react'
import { LaptopIcon, MoonStarIcon, PaletteIcon, StarIcon, SunIcon, XIcon, ZapIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'

import Button from '../Button'

type Theme = {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  group: 'light' | 'dark' | 'system'
}

export const listThemes = ['light', 'candy', 'rebecca', 'dark', 'midnight', 'neon', 'system']

const themes: Theme[] = [
  { id: 'light', name: 'Haui', icon: SunIcon, group: 'light' },
  { id: 'candy', name: 'Candy', icon: PaletteIcon, group: 'light' },
  { id: 'rebecca', name: 'Rebecca', icon: StarIcon, group: 'light' },

  { id: 'dark', name: 'Haui', icon: MoonStarIcon, group: 'dark' },
  { id: 'midnight', name: 'Midnight', icon: MoonStarIcon, group: 'dark' },
  { id: 'neon', name: 'Neón', icon: ZapIcon, group: 'dark' },

  { id: 'system', name: 'Sistema', icon: LaptopIcon, group: 'system' }
]

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes.find(t => t.id === theme) || themes[0])

  const handleThemeChange = (newTheme: Theme) => {
    setSelectedTheme(newTheme)
    setTheme(newTheme.id)
  }

  const renderGroup = (group: Theme['group'], label: string) => (
    <>
      <h5 className='text-fn2 px-3 pt-2 text-xs font-semibold'>{label}</h5>
      {themes
        .filter(t => t.group === group)
        .map(t => (
          <MenuItem key={t.id}>
            <Button
              onClick={() => handleThemeChange(t)}
              className={`hover:bg-bg2 flex w-full items-center gap-2 rounded-md px-3 py-2 text-left ${
                selectedTheme.id === t.id ? 'bg-bg3' : ''
              }`}
            >
              <t.icon className='text-fn1 h-4 w-4' />
              <span className='text-fn2 text-sm'>{t.name}</span>
            </Button>
          </MenuItem>
        ))}
      <MenuSeparator className='bg-bg3 mx-2 my-1 h-px' />
    </>
  )

  return (
    <div className='w-fit text-right'>
      <Menu>
        <MenuButton as={Button} variant='border'>
          <selectedTheme.icon className='text-fn1 h-5 w-5' />
        </MenuButton>

        <MenuItems
          anchor='bottom end'
          className='border-bg3 bg-bg1 z-[60] mt-2 w-44 origin-top-right rounded-lg border shadow-xl backdrop-blur-md focus:outline-none'
        >
          {/* Header */}
          <div className='flex items-center justify-between px-3 py-2'>
            <h4 className='text-fn1 text-sm font-semibold'>Temas</h4>
            <MenuItem>
              <Button className='p-1' variant='border'>
                <XIcon className='text-fn2 h-4 w-4' />
              </Button>
            </MenuItem>
          </div>

          <MenuSeparator className='bg-bg3 mx-2 my-1 h-px' />

          {/* Agrupación */}
          <div className='flex flex-col gap-1 p-1'>
            {renderGroup('light', 'Claros')}
            {renderGroup('dark', 'Oscuros')}
            {renderGroup('system', 'Sistema')}
          </div>
        </MenuItems>
      </Menu>
    </div>
  )
}

export default ThemeChanger
