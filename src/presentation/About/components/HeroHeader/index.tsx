'use client'

import { personalJourneys } from '@/shared/config/constants/personalJourneys'
import Button from '@/shared/ui/components/Button'
import CardTabs from '@/shared/ui/components/CardTabs'
import type { FC } from 'react'

import JourneyComponent from './Journey'

const HeroHeader: FC = () => {
  return (
    <article className='region max-region:px-5 mx-auto flex min-h-[80vh] w-full flex-col gap-24 overflow-x-hidden'>
      <div className='flex flex-col gap-10 pt-30 max-lg:items-center max-lg:text-center'>
        <h1 className='font-geist text-fn2 text-9xl font-black max-lg:text-8xl'>
          DIME <span className='text-gradient text-9xl font-black max-lg:text-8xl'>HAUI</span>
        </h1>
        <div className='flex flex-col gap-2.5'>
          <h2 className='font-geist text-4xl font-black max-lg:text-3xl'>CONSTRUYENDO EXPERIENCIAS DIGITALES</h2>
          <h3 className='text-fn2 text-5xl font-light max-lg:text-3xl'>UN PIXEL A LA VEZ</h3>
        </div>
      </div>

      <section className='flex w-full justify-between max-lg:flex-col max-lg:items-center max-lg:gap-10'>
        <CardTabs
          items={personalJourneys}
          defaultIndex={1}
          autoAdvance={false}
          className='max-lg:items-center'
          orientation='horizontal'
          connectorLineSize={100}
          tabsClassName='max-lg:justify-center'
          renderContent={journey => <JourneyComponent journey={journey} />}
          renderTab={(item, isActive) => {
            return (
              <div className={`rounded-full p-0.5 ease-in ${isActive ? 'gradient animate-[spin_5s]' : 'border-bg3 border'}`}>
                <Button className='bg-bg1 p-1.5 max-md:w-[38px]'>
                  <item.Icon width={28} height={28} />
                </Button>
              </div>
            )
          }}
        />

        <section className='flex flex-col gap-10 max-lg:items-center max-lg:text-center'>
          <div className='flex flex-col flex-wrap gap-2.5 max-lg:flex-row max-lg:items-center'>
            <h3 className='text-fn2 font-light'>UBICACIÓN</h3>
            <p className='font-mono'>Lima, Peru</p>
          </div>

          <h3 className='text-fn2'>UTC-5</h3>

          <div className='flex flex-col flex-wrap gap-2.5 max-lg:flex-row max-lg:items-center'>
            <h3 className='text-fn2 font-light'>IDIOMAS</h3>
            <p className='font-mono'>Español, Nativo</p>
          </div>
        </section>
      </section>
    </article>
  )
}

export default HeroHeader
