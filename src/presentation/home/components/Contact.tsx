import Button from '@common/components/button'
import Title from '@common/components/title'
import { SOCIAL } from '@common/core/constants'
import { ArrowRightIcon } from 'lucide-react'
import type { FC } from 'react'

const Contact: FC = () => {
  const socialList = Object.entries(SOCIAL).slice(1)

  return (
    <article
      id='contact'
      className='region max-region:px-5 max-region:flex-col max-region:gap-10 max-region:text-center relative mx-auto flex items-start justify-between gap-12'
    >
      <section className='max-region:items-center flex flex-col gap-8'>
        <div className='flex flex-col gap-3'>
          <Title>Hablemos</Title>
          <p className='text-fn2 max-w-[400px] font-mono'>
            Siempre abierto a nuevas oportunidades, colaboraciones y charlas sobre tecnología y diseño.
          </p>
        </div>

        <Button href={SOCIAL.Gmail.url} target='_blank' rel='noopener noreferrer' variant='border' className='font-mono'>
          <span>{SOCIAL.Gmail.display}</span>
          <ArrowRightIcon />
        </Button>
      </section>

      <section className='relative flex flex-col gap-4'>
        <h3 className='text-fn2 font-light'>En otros espacios:</h3>

        <ul className='flex max-w-[400px] flex-wrap gap-3 max-sm:justify-center'>
          {socialList.map(([key, value]) => (
            <li key={`${key}-contact`} className='w-full max-w-[180px]'>
              <Button
                href={value.url}
                target='_blank'
                rel='noopener noreferrer'
                variant='border'
                className='border-bg3 bg-bg1 hover:bg-bg2 h-full w-full flex-col items-start rounded-xl px-5 py-6 transition-colors'
              >
                <span className='text-h3 font-medium'>{key}</span>
                <span className='text-fn2 text-sm'>{value.display}</span>
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <div
        aria-hidden
        className='bg-fn2 pointer-events-none absolute top-1/2 -left-1/12 -z-10 h-[220px] w-[220px] -translate-y-1/2 rounded-full opacity-40 blur-[120px] select-none'
      />
    </article>
  )
}

export default Contact
