import Button from '@common/components/button'
import Title from '@common/components/title'
import { SOCIAL } from '@common/core/constants'
import type { FC } from 'react'

const Contact: FC = () => {
  const socialList = Object.entries(SOCIAL).slice(1)

  return (
    <section
      id='contact'
      className='region max-region:px-5 max-region:flex-col max-region:items-center max-region:gap-12 max-region:text-center relative mx-auto flex scroll-mt-28 items-end justify-between gap-14'
    >
      <div className='max-region:items-center flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          <p className='text-fn2 font-mono text-xs tracking-[0.18em] uppercase'>Contacto</p>
          <Title>Hablemos</Title>
          <p className='text-fn2 text-pretty max-w-[400px] font-mono text-base leading-relaxed'>
            Abierto a oportunidades, colaboraciones y conversaciones sobre tecnología y diseño.
          </p>
        </div>

        <Button
          href={SOCIAL.Gmail.url}
          target='_blank'
          rel='noopener noreferrer'
          variant='default'
          showIconLink
          className='px-5 font-mono'
        >
          {SOCIAL.Gmail.display}
        </Button>
      </div>

      <div className='relative flex w-full max-w-[400px] flex-col gap-4'>
        <h3 className='text-fn2 text-sm font-medium tracking-wide'>En otros espacios</h3>

        <ul className='grid grid-cols-2 gap-3 max-sm:grid-cols-1'>
          {socialList.map(([key, value]) => (
            <li key={`${key}-contact`}>
              <Button
                href={value.url}
                target='_blank'
                rel='noopener noreferrer'
                variant='outline'
                center={false}
                className='flex h-full w-full flex-col items-start gap-1 rounded-2xl px-5 py-5'
              >
                <span className='text-fn1 text-base font-semibold'>{key}</span>
                <span className='text-fn2 truncate text-sm'>{value.display}</span>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div
        aria-hidden
        className='bg-fn2 pointer-events-none absolute top-1/2 -left-8 -z-10 h-[200px] w-[200px] -translate-y-1/2 rounded-full opacity-30 blur-[100px] select-none max-lg:left-1/2 max-lg:-translate-x-1/2'
      />
    </section>
  )
}

export default Contact
