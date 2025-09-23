'use client'

import { Testimony } from '@/shared/config/constants/testimonies'
import { GraduationCapIcon } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'

interface Props {
  testimony: Testimony
}

const TestimonyCard: FC<Props> = ({ testimony }) => {
  const { autor, degree, githubPage, webPage, mailTo } = testimony

  return (
    <section className='bg-bg1 border-bg3 flex h-[430px] w-[550px] flex-col items-center justify-center gap-16 rounded-xl border p-6 max-md:w-full'>
      <div className='flex flex-col items-center gap-3'>
        <h2 className='font-flowers text-h1'>{autor}</h2>
        <div className='text-fn2 flex items-center gap-2 font-mono'>
          <GraduationCapIcon className='h-5 w-5 max-sm:hidden' />
          <h4>{degree}</h4>
        </div>
      </div>

      <div className='flex flex-col items-center gap-10'>
        <p className='text-fn2 max-w-[450px] text-center font-mono'>{testimony.testimonial}</p>

        <div className='flex gap-5'>
          {githubPage && (
            <Link href={githubPage} target='_blank' rel='noopener noreferrer' className='text-fn2 underline underline-offset-4'>
              GitHub
            </Link>
          )}
          {webPage && (
            <Link href={webPage} target='_blank' rel='noopener noreferrer' className='text-fn2 underline underline-offset-4'>
              Website
            </Link>
          )}
          {mailTo && (
            <Link href={mailTo} className='text-fn2 underline underline-offset-4'>
              Email
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default TestimonyCard
