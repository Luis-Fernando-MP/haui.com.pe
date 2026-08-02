'use client'

import Button from '@common/components/button'
import CardTabs from '@common/components/card-tabs'
import Image from '@common/components/image'
import { testimonies } from '@common/core/constants/testimonies'
import { useMediaQuery } from 'usehooks-ts'

import TestimonyCard from './TestimonyCard'

const TestimoniesList = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <CardTabs
      orientation={isMobile ? 'horizontal' : 'vertical'}
      items={testimonies}
      tabsClassName='max-md:max-w-full'
      renderContent={item => <TestimonyCard testimony={item} />}
      renderTab={(item, isActive) => (
        <div
          className={
            isActive
              ? 'gradient rounded-full p-[2px] shadow-[0_0_0_1px_color-mix(in_oklab,var(--fn1)_12%,transparent)]'
              : 'border-bg3 rounded-full border p-[2px]'
          }
        >
          <Button className='bg-bg1 p-1.5 max-md:w-[38px]' variant='ghost' size='icon' aria-label={`Ver testimonio de ${item.autor}`}>
            <Image
              className='aspect-square size-7 rounded-full object-cover'
              src={item.photo}
              width={28}
              height={28}
              alt=''
            />
          </Button>
        </div>
      )}
    />
  )
}

export default TestimoniesList
