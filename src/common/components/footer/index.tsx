import Button from '@common/components/button'
import Image from '@common/components/image'
import { INFO, SOCIAL } from '@common/core/constants'
import { FEATURE_ROUTES, NAV_ROUTES } from '@common/core/constants/routes'
import Link from 'next/link'
import type { FC } from 'react'

const Footer: FC = () => {
  const year = new Date().getFullYear()
  const socialEntries = Object.entries(SOCIAL)
  const navEntries = Object.entries(NAV_ROUTES)
  const featureEntries = Object.entries(FEATURE_ROUTES)

  return (
    <footer className='w-full pb-36' role='contentinfo'>
      <div className='border-bg3 region max-region:px-5 mx-auto border-t pt-12 md:pt-16'>
        <div className='max-region:items-center max-region:text-center grid gap-12 md:grid-cols-[1.2fr_1fr_1fr] md:gap-10'>
          <div className='max-region:items-center flex flex-col gap-4'>
            <Link href='/' className='inline-flex w-fit items-center gap-2.5' aria-label={`${INFO.devShortName} — Inicio`}>
              <div className='bg-logo-bg flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg p-1'>
                <Image src='/logo.webp' alt='' width={24} height={24} className='size-full object-contain' />
              </div>
              <h4 className='text-gradient text-2xl font-bold tracking-tight'>{INFO.devShortName}</h4>
            </Link>

            <p className='text-fn2 max-w-[280px] text-sm leading-relaxed text-pretty'>
              {INFO.resumeAbout}. Diseño y desarrollo de productos web claros y centrados en la experiencia.
            </p>
          </div>

          <nav className='max-region:items-center flex flex-col gap-4' aria-label='Navegación del pie'>
            <h3 className='text-fn2 font-mono text-[11px] tracking-[0.18em] uppercase'>Explorar</h3>
            <ul className='flex flex-col gap-2.5 max-region:items-center'>
              {navEntries.map(([key, { label, path }]) => (
                <li key={key} className='list-none'>
                  <Button href={path} variant='link' className='text-fn2 hover:text-fn1 h-auto min-h-0 px-0 text-sm font-medium'>
                    {label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          <div className='max-region:items-center flex flex-col gap-4'>
            <h3 className='text-fn2 font-mono text-[11px] tracking-[0.18em] uppercase'>Contacto</h3>
            <ul className='flex flex-col gap-2.5 max-region:items-center'>
              {socialEntries.map(([key, value]) => (
                <li key={key} className='list-none'>
                  <Button
                    href={value.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    variant='link'
                    showIconLink
                    className='text-fn2 hover:text-fn1 h-auto min-h-0 px-0 text-sm font-medium'
                    aria-label={key}
                  >
                    {key}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='border-bg3 mt-12 flex flex-col gap-6 border-t py-8 md:mt-14'>
          <div className='max-region:items-center flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
            <p className='text-fn2 font-mono text-[11px] tracking-[0.14em] uppercase'>Próximamente</p>
            <ul className='flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-end'>
              {featureEntries.map(([key, { label, path }]) => (
                <li key={key} className='list-none'>
                  <Link href={path} className='text-fn2/50 pointer-events-none text-sm select-none' aria-disabled tabIndex={-1}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='max-region:items-center max-region:text-center flex flex-col gap-1.5 md:flex-row md:items-end md:justify-between'>
            <p className='text-fn1 text-sm font-medium'>
              © {year} {INFO.fullName}
            </p>
            <p className='text-fn2 text-xs leading-relaxed'>Todo el contenido pertenece a sus respectivos creadores.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
