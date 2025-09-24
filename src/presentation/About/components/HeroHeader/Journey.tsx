import { Journey } from '@/shared/config/constants/personalJourneys'
import { Image } from '@unpic/react/nextjs'
import type { FC } from 'react'

interface Props {
  journey: Journey
}

const JourneyComponent: FC<Props> = ({ journey }) => {
  const { title, description, images } = journey

  return (
    <article className='border-bg3 ] flex h-fit w-[550px] flex-col gap-10 rounded-xl border p-6 max-md:w-full max-sm:w-full'>
      <header className='flex flex-col gap-2.5'>
        <h3 className='font-bold'>{title}</h3>
        <div className='text-fn2'>{description}</div>
      </header>

      <section className='border-bg3 bg-bg2 flex w-fit gap-5 rounded-md border p-2.5'>
        {images.map(image => {
          return (
            <Image
              className='rounded-full'
              key={image.src + image.caption}
              src={image.src}
              width={40}
              height={40}
              alt={image.caption ?? 'journey image'}
            />
          )
        })}
      </section>
    </article>
  )
}

export default JourneyComponent
