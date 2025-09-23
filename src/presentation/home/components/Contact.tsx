import { SOCIAL } from '@/shared/config/constants'
import Title from '@/shared/ui/components/Title'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'

const Contact: FC = () => {
  const socialList = Object.entries(SOCIAL).slice(1, Object.entries(SOCIAL).length)

  return (
    <article className='region max-region:px-5 max-region:flex-col max-region:items-center max-region:gap-7 max-region:text-center relative mx-auto flex justify-between'>
      <section className='max-region:items-center max-region:gap-10 flex flex-col gap-20'>
        <div className='flex flex-col gap-3'>
          <Title>Hablemos</Title>
          <h3 className='text-fn2 max-w-[400px] font-mono'>
            Siempre abierto a nuevas oportunidades, colaboraciones y charlas sobre tecnología y diseño.
          </h3>
        </div>

        <Link href={SOCIAL.Gmail.url} target='__blank' rel='noopener noreferrer' className='flex items-center gap-1.5 font-mono'>
          <h3>{SOCIAL.Gmail.display}</h3>
          <ArrowRightIcon />
        </Link>
      </section>

      <section className='relative flex flex-col gap-5'>
        <h3 className='text-fn2 font-light'>En otros espacios:</h3>

        <ul className='flex max-w-[400px] flex-wrap gap-5 max-sm:justify-center'>
          {socialList.map(social => {
            const [key, value] = social

            const { url, display } = value

            return (
              <Link
                className='border-bg3 bg-bg1 w-full max-w-[180px] rounded-xl border px-6 py-8'
                key={`${key}-contact`}
                href={url}
                target='__blank'
                rel='noopener noreferrer'
              >
                <h3>{key}</h3>
                <h5 className='text-fn2'>{display}</h5>
              </Link>
            )
          })}
        </ul>
      </section>

      <div className='bg-fn2 pointer-events-none absolute top-1/2 -left-1/12 -z-10 h-[300px] w-[300px] -translate-y-1/2 rounded-full opacity-50 blur-[150px] select-none'></div>
    </article>
  )
}

export default Contact
