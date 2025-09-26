'use client'

import dynamic from 'next/dynamic'

const FocusGallery = dynamic(() => import('./FocusGallery'), {
  ssr: false,
  loading() {
    return null
  }
})

export default FocusGallery
