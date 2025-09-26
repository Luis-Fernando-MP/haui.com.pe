'use client'

import { LoaderIcon } from 'lucide-react'
import dynamic from 'next/dynamic'

import Button from '../Button'

const ThemeChanger = dynamic(() => import('./ThemeChanger'), {
  ssr: false,
  loading: () => {
    return (
      <Button variant='border'>
        <LoaderIcon className='text-fn2 animate-spin' />
      </Button>
    )
  }
})

export default ThemeChanger
