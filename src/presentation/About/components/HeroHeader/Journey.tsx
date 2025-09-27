import { Journey } from '@/shared/config/constants/personalJourneys'
import ImageGallery from '@/shared/ui/components/FocusGallery/ImageGallery'
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

      <section className='flex w-fit gap-5'>
        {images.map(image => {
          return (
            <ImageGallery
              className='rounded-full'
              key={image.src + image.caption}
              width={40}
              height={40}
              alt={image.caption ?? 'journey image'}
              groupId={`journey-${title}`}
              {...image}
            />
          )
        })}
      </section>
    </article>
  )
}

export default JourneyComponent
