'use client'

import Button from '@common/components/button'
import Popup from '@common/components/popup'
import { cactus } from '@lucide/lab'
import { HexagonIcon, Icon, LaptopIcon, MoonIcon, PiggyBankIcon, StarIcon, SunIcon, ZapIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { type ComponentType, type FC, useEffect, useState } from 'react'

export const listThemes = ['light', 'juli', 'rebecca', 'dark', 'sam', 'andrea', 'shei', 'system'] as const

type ThemeId = (typeof listThemes)[number]
type ThemeGroup = 'light' | 'dark' | 'system'

type ThemeOption = {
  id: ThemeId
  name: string
  icon: ComponentType<{ className?: string }>
  group: ThemeGroup
}

const CactusIcon = ({ className }: { className?: string }) => <Icon iconNode={cactus} className={className} />

const themes: ThemeOption[] = [
  { id: 'light', name: 'Haui', icon: SunIcon, group: 'light' },
  { id: 'juli', name: 'Julissa', icon: PiggyBankIcon, group: 'light' },
  { id: 'rebecca', name: 'Rebecca', icon: StarIcon, group: 'light' },
  { id: 'dark', name: 'Haui', icon: MoonIcon, group: 'dark' },
  { id: 'sam', name: 'Sam', icon: ZapIcon, group: 'dark' },
  { id: 'andrea', name: 'Andrea', icon: CactusIcon, group: 'dark' },
  { id: 'shei', name: 'Shei', icon: HexagonIcon, group: 'dark' },
  { id: 'system', name: 'Sistema', icon: LaptopIcon, group: 'system' }
]

const groups: { id: ThemeGroup; label: string }[] = [
  { id: 'light', label: 'Claros' },
  { id: 'dark', label: 'Oscuros' },
  { id: 'system', label: 'Sistema' }
]

const ThemeChanger: FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const selected = themes.find(t => t.id === theme) ?? themes.find(t => t.id === 'system')!

  return (
    <Popup>
      <Popup.Trigger asChild>
        <Button variant='outline' size='icon' aria-label='Cambiar tema'>
          <selected.icon className='text-fn1 size-5' />
        </Button>
      </Popup.Trigger>

      <Popup.Content align='end' className='w-[220px]'>
        <Popup.Header>
          <Popup.Title>Temas</Popup.Title>
          <Popup.Close />
        </Popup.Header>

        <div className='flex flex-col gap-3 p-2'>
          {groups.map(group => (
            <div key={group.id} className='flex flex-col gap-1'>
              <p className='text-fn2 px-2 pt-0.5 text-[11px] font-semibold tracking-wide uppercase'>{group.label}</p>
              {themes
                .filter(t => t.group === group.id)
                .map(t => {
                  const isActive = selected.id === t.id

                  return (
                    <Button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      variant={isActive ? 'secondary' : 'ghost'}
                      className='w-full justify-start'
                    >
                      <t.icon className='text-fn1 size-4' />
                      <span className={isActive ? 'text-fn1' : 'text-fn2'}>{t.name}</span>
                    </Button>
                  )
                })}
            </div>
          ))}
        </div>

        <Popup.Footer>
          <Popup.Description>Apariencia del portafolio</Popup.Description>
        </Popup.Footer>
      </Popup.Content>
    </Popup>
  )
}

export default ThemeChanger
