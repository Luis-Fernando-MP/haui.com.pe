'use client'

import { testimonies } from '@/shared/config/constants/testimonies'
import Button from '@/shared/ui/components/Button'
import CardTabs from '@/shared/ui/components/CardTabs'
import { Image } from '@unpic/react/nextjs'
import { useMediaQuery } from 'usehooks-ts'

import TestimonyCard from './TestimonyCard'

const TestimoniesList = () => {
  const matches = useMediaQuery('(max-width: 768px)')

  return (
    <CardTabs
      orientation={matches ? 'horizontal' : 'vertical'}
      items={testimonies}
      tabsClassName='max-md:max-w-full'
      renderContent={item => <TestimonyCard testimony={item} />}
      renderTab={(item, isActive) => {
        return (
          <div className={`rounded-full p-0.5 ease-in ${isActive ? 'gradient animate-[spin_5s]' : 'border-bg3 border'}`}>
            <Button className='bg-bg1 p-1.5 max-md:w-[38px]'>
              <Image
                className='aspect-square h-[28px] w-[28px] rounded-full'
                src={item.photo}
                width={28}
                height={28}
                alt={item.autor}
              />
            </Button>
          </div>
        )
      }}
    />
  )
}

export default TestimoniesList
