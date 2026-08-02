import type { FC } from 'react'

import './style.css'

const GradientSvg: FC = () => {
  return (
    <svg className='absolute inset-0'>
      <defs>
        <linearGradient id='text-gradient-stroke' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop
            offset='0%'
            style={{
              stopColor: 'var(--gr-from)'
            }}
          />
          <stop
            offset='50%'
            style={{
              stopColor: 'var(--gr-via)'
            }}
          />
          <stop
            offset='100%'
            style={{
              stopColor: 'var(--gr-to)'
            }}
          />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default GradientSvg
