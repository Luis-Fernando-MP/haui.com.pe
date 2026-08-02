'use client'

import Button from '@common/components/button'
import CardTabs from '@common/components/card-tabs'
import { personalJourneys } from '@common/core/constants/personalJourneys'
import type { FC } from 'react'

import JourneyComponent from './Journey'

const HeroHeader: FC = () => {
  return (
    <article className='region max-region:px-5 mx-auto flex w-full flex-col gap-14 overflow-x-hidden pt-16 md:pt-20'>
      <div className='flex flex-col gap-6 max-lg:items-center max-lg:text-center'>
        <h1 className='font-geist text-fn2 text-7xl leading-[0.95] font-black md:text-8xl lg:text-9xl'>
          DIME <span className='text-gradient'>HAUI</span>
        </h1>
        <div className='flex flex-col gap-2'>
          <h2 className='font-geist text-3xl font-black md:text-4xl'>CONSTRUYENDO EXPERIENCIAS DIGITALES</h2>
          <p className='text-fn2 text-3xl font-light md:text-4xl'>UN PIXEL A LA VEZ</p>
        </div>
      </div>

      <section className='flex w-full items-start justify-between gap-10 max-lg:flex-col max-lg:items-center'>
        <CardTabs
          items={personalJourneys}
          defaultIndex={1}
          autoAdvance={false}
          className='max-lg:items-center'
          orientation='horizontal'
          connectorLineSize={100}
          tabsClassName='max-lg:justify-center'
          renderContent={journey => <JourneyComponent journey={journey} />}
          renderTab={(item, isActive) => (
            <div className={`rounded-full p-0.5 ${isActive ? 'gradient' : 'border-bg3 border'}`}>
              <Button className='bg-bg1 p-1.5' variant='ghost' size='icon' aria-label={item.title ?? 'journey'}>
                <item.Icon width={28} height={28} />
              </Button>
            </div>
          )}
        />

        <aside className='flex flex-col gap-6 max-lg:items-center max-lg:text-center'>
          <div className='flex flex-col gap-1.5 max-lg:items-center'>
            <h3 className='text-fn2 text-sm font-light tracking-wide'>UBICACIÓN</h3>
            <p className='font-mono'>Lima, Peru</p>
          </div>

          <p className='text-fn2 font-mono text-sm'>UTC-5</p>

          <div className='flex flex-col gap-1.5 max-lg:items-center'>
            <h3 className='text-fn2 text-sm font-light tracking-wide'>IDIOMAS</h3>
            <p className='font-mono'>Español, Nativo</p>
          </div>
        </aside>
      </section>
    </article>
  )
}

export default HeroHeader
