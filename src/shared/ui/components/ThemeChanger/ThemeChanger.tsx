'use client'

import { cl } from '@/lib/utils'
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react'
import { cactus } from '@lucide/lab'
import { LaptopIcon, MoonIcon, PiggyBankIcon, StarIcon, SunIcon, XIcon, ZapIcon } from 'lucide-react'
import { Icon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import Button from '../Button'

export const listThemes = ['light', 'juli', 'rebecca', 'dark', 'sam', 'andrea', 'system'] as const

type Theme = {
  id: (typeof listThemes)[number]
  name: string
  icon: React.ComponentType<{ className?: string }>
  group: 'light' | 'dark' | 'system'
}

const CactusIcon = ({ className }: { className?: string }) => <Icon iconNode={cactus} className={className} />

const themes: Theme[] = [
  { id: 'light', name: 'Haui', icon: SunIcon, group: 'light' },
  { id: 'juli', name: 'Julissa', icon: PiggyBankIcon, group: 'light' },
  { id: 'rebecca', name: 'Rebecca', icon: StarIcon, group: 'light' },

  { id: 'dark', name: 'Haui', icon: MoonIcon, group: 'dark' },
  { id: 'sam', name: 'Sam', icon: ZapIcon, group: 'dark' },
  { id: 'andrea', name: 'Andrea', icon: CactusIcon, group: 'dark' },

  { id: 'system', name: 'Sistema', icon: LaptopIcon, group: 'system' }
]

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [theme])

  if (!mounted) return null

  const selectedTheme = themes.find(t => t.id === theme) as Theme

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme.id)
  }

  const renderGroup = (group: Theme['group'], label: string) => (
    <>
      <h5 className='text-fn2 px-3 pt-2 font-semibold'>{label}</h5>
      {themes
        .filter(t => t.group === group)
        .map(t => {
          const isActive = selectedTheme.id === t.id

          return (
            <MenuItem key={t.id}>
              <Button onClick={() => handleThemeChange(t)} className={`hover:bg-bg3 w-full text-left ${cl(isActive, 'bg-bg2')}`}>
                <t.icon className='text-fn1 h-5 w-5' />
                <p className='text-fn2'>{t.name}</p>
              </Button>
            </MenuItem>
          )
        })}

      {group != 'system' && <MenuSeparator className='bg-bg3 mx-2 my-1 h-px' />}
    </>
  )

  return (
    <div className='w-fit text-right'>
      <Menu>
        <MenuButton as={Button} variant='border' className='px-2'>
          <selectedTheme.icon className='text-fn1' />
        </MenuButton>

        <MenuItems
          anchor='bottom end'
          className='border-bg3 bg-bg1 z-[100] mt-2 w-[200px] origin-top-right rounded-lg border backdrop-blur-md focus:outline-none'
        >
          {/* Header */}
          <div className='flex items-center justify-between px-3 py-2'>
            <h4 className='text-fn1 font-semibold'>Temas:</h4>
            <MenuItem>
              <Button className='p-0'>
                <XIcon className='text-fn2' />
              </Button>
            </MenuItem>
          </div>

          <MenuSeparator className='bg-bg3 my-1 h-px' />

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
