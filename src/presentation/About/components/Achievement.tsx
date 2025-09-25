import { Achievements, devContributionColor } from '@/lib/achievementsQuery/achievement.type'
import type { FC } from 'react'

type Props = Achievements

const Achievement: FC<Props> = ({ achievementType, name, devContribution, acquisitionDate }) => {
  const achievementColor = devContributionColor[devContribution]

  return (
    <div className='border-bg3 flex h-[200px] w-[290px] flex-col justify-between rounded-xl border p-5'>
      <span className='bg-bg2 border-bg3 text-fn2 w-fit rounded-full border px-3 py-1.5 font-mono'>{achievementType}</span>

      <h4 className='font-medium'>{name}</h4>

      <div className='flex justify-between'>
        <div className='flex items-center gap-2.5'>
          <div className='h-4 w-4 rounded-md' style={{ background: achievementColor }} />
          <h5 className='text-fn2 flex gap-2.5 font-mono'>{devContribution}</h5>
        </div>

        <span className='text-fn2 font-mono'>{acquisitionDate}</span>
      </div>
    </div>
  )
}

export default Achievement
