import { SOCIAL } from '@/shared/config/constants'
import { FEATURE_ROUTES } from '@/shared/config/constants/routes'
import Link from 'next/link'
import type { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className='w-full pb-40' role='contentinfo'>
      <div className='border-bg3 region max-region:px-5 mx-auto flex flex-col gap-10 border-t pt-10'>
        <div className='flex flex-col gap-2.5 max-lg:items-center max-lg:text-center'>
          <h3>Copyright © 2025 LUIS FERNANDO</h3>
          <h4 className='text-fn2'>All content belongs to their respective creators</h4>
        </div>

        <section
          className='flex items-center justify-between max-lg:flex-col max-lg:gap-10 max-lg:text-center'
          aria-label='Footer links'
        >
          <div className='flex flex-col gap-5'>
            <h4>🎨 ¿Un café?</h4>
            <div className='flex flex-wrap justify-center gap-2.5'>
              {Object.entries(SOCIAL).map(([key, value]) => {
                const { url } = value

                return (
                  <Link
                    className='text-fn2 px-2.5 underline underline-offset-4'
                    target='_blank'
                    rel='noopener noreferrer'
                    href={url}
                    key={key}
                    aria-label={`Link to ${key}`}
                  >
                    {key}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <h4>✨ Features</h4>
            <div className='flex flex-wrap justify-center gap-2.5'>
              {Object.entries(FEATURE_ROUTES).map(([key, { label, path }]) => {
                return (
                  <Link
                    className='text-fn2 pointer-events-none px-2.5 underline underline-offset-4 select-none'
                    href={path}
                    key={key}
                    aria-label={`Go to ${label} page`}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}

export default Footer
