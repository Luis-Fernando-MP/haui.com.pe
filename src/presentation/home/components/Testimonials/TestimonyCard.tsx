'use client'

import Button from '@common/components/button'
import { Testimony } from '@common/core/constants/testimonies'
import { GraduationCapIcon } from 'lucide-react'
import type { FC } from 'react'

interface Props {
  testimony: Testimony
}

const TestimonyCard: FC<Props> = ({ testimony }) => {
  const { autor, degree, githubPage, webPage, mailTo, linkedIn, testimonial } = testimony

  return (
    <article className='bg-bg1 border-bg3 flex min-h-[400px] w-full max-w-[550px] flex-col justify-between gap-10 rounded-2xl border p-7 md:min-h-[430px] md:p-8'>
      <header className='flex flex-col items-center gap-3 text-center'>
        <h3 className='font-flowers text-h1 text-pretty'>{autor}</h3>
        <div className='text-fn2 flex items-center gap-2 font-mono text-sm'>
          <GraduationCapIcon className='size-4 max-sm:hidden' aria-hidden />
          <p>{degree}</p>
        </div>
      </header>

      <blockquote className='text-fn2 text-pretty mx-auto max-w-[460px] text-center font-mono text-sm leading-relaxed md:text-base'>
        “{testimonial}”
      </blockquote>

      <footer className='flex flex-wrap items-center justify-center gap-2'>
        {githubPage && (
          <Button href={githubPage} target='_blank' rel='noopener noreferrer' variant='outline' className='px-3 text-sm'>
            GitHub
          </Button>
        )}
        {linkedIn && (
          <Button href={linkedIn} target='_blank' rel='noopener noreferrer' variant='outline' className='px-3 text-sm'>
            LinkedIn
          </Button>
        )}
        {webPage && (
          <Button href={webPage} target='_blank' rel='noopener noreferrer' variant='outline' className='px-3 text-sm'>
            Website
          </Button>
        )}
        {mailTo && (
          <Button href={mailTo} variant='outline' className='px-3 text-sm'>
            Email
          </Button>
        )}
      </footer>
    </article>
  )
}

export default TestimonyCard
