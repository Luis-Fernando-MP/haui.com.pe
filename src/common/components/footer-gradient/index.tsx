import type { FC } from 'react'

const FooterGradient: FC = () => {
  return (
    <div
      aria-hidden
      className='from-bg1 pointer-events-none sticky bottom-0 z-40 h-24 w-full bg-gradient-to-t from-40% to-transparent select-none'
    />
  )
}

export default FooterGradient
