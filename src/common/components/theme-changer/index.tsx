'use client'

import Button from '@common/components/button'
import { LoaderIcon } from 'lucide-react'
import dynamic from 'next/dynamic'

const ThemeChanger = dynamic(() => import('./ThemeChanger'), {
  ssr: false,
  loading: () => {
    return (
      <Button variant='outline' className='px-2'>
        <LoaderIcon className='text-fn2 animate-spin' />
      </Button>
    )
  }
})

export default ThemeChanger
