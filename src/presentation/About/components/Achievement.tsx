import { Achievements, devContributionColor } from '@/lib/achievementsQuery/achievement.type'
import ImageGallery from '@/shared/ui/components/FocusGallery/ImageGallery'
import { type FC, useRef } from 'react'

type Props = Achievements

const Achievement: FC<Props> = props => {
  const { achievementType, name, devContribution, acquisitionDate, path, AdditionalImages, actionLink } = props

  const achievementColor = devContributionColor[devContribution]
  const $imageRef = useRef<HTMLImageElement>(null)

  const handleOpen = (): void => {
    $imageRef.current?.click()
  }

  return (
    <button
      onClick={handleOpen}
      className='border-bg3 flex h-[200px] w-[290px] flex-col justify-between rounded-xl border p-5 text-left focus:outline-none'
    >
      <span className='bg-bg2 border-bg3 text-fn2 w-fit rounded-full border px-3 py-1.5 font-mono'>{achievementType}</span>

      <h4 className='font-medium'>{name}</h4>

      <div className='flex justify-between'>
        <div className='flex items-center gap-2.5'>
          <div className='h-4 w-4 rounded-md' style={{ background: achievementColor }} />
          <h5 className='text-fn2 flex gap-2.5 font-mono'>{devContribution}</h5>
        </div>

        <ImageGallery
          ref={$imageRef}
          src={path}
          groupId='achievement'
          className='hidden'
          caption={`<p>${name}</p>`}
          action={actionLink}
          actionText='Consultar information'
        />

        {AdditionalImages?.map(additional => {
          return <ImageGallery key={additional} src={additional} groupId='achievement' className='hidden' />
        })}

        <span className='text-fn2 font-mono'>{acquisitionDate}</span>
      </div>
    </button>
  )
}

export default Achievement
