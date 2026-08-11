'use client'

import Button from '@common/components/button'
import Image from '@common/components/image'
import { Testimony } from '@common/core/data/testimonies'
import GithubIcon from '@common/icons/github'
import LinkedInIcon from '@common/icons/linkedin'
import { Globe, GraduationCapIcon, Mail } from 'lucide-react'
import type { FC } from 'react'

interface Props {
  testimony: Testimony
}

const TestimonyCard: FC<Props> = ({ testimony }) => {
  const { autor, photo, role, degree, githubPage, webPage, mailTo, linkedIn, testimonial } = testimony
  const hasLinks =
    Boolean(githubPage?.length) || Boolean(linkedIn?.length) || Boolean(webPage?.length) || Boolean(mailTo?.length)

  return (
    <article className='bg-bg1 border-bg3 flex h-full min-w-0 flex-col gap-6 rounded-2xl border p-4 sm:gap-8 sm:p-6 md:p-8'>
      <header className='flex min-w-0 items-start gap-3 sm:items-center sm:gap-4'>
        <div className='bg-bg2 border-bg3 size-14 shrink-0 overflow-hidden rounded-2xl border sm:size-16 md:size-20'>
          <Image
            src={photo}
            alt={`Foto de ${autor}`}
            width={80}
            height={80}
            layout='fixed'
            unstyled
            objectFit='cover'
            className='size-full object-cover'
          />
        </div>

        <div className='flex min-w-0 flex-col gap-1'>
          <h3 className='font-flowers text-fn1 text-xl leading-tight text-pretty sm:text-2xl md:text-3xl'>{autor}</h3>
          <p className='text-fn1/90 text-sm font-medium text-pretty'>{role}</p>
          <p className='text-fn2 flex items-start gap-1.5 font-mono text-xs'>
            <GraduationCapIcon className='mt-0.5 size-3.5 shrink-0' aria-hidden />
            <span className='text-pretty break-words'>{degree}</span>
          </p>
        </div>
      </header>

      <blockquote className='border-bg3 text-fn2 border-l-2 pl-4 text-sm leading-relaxed text-pretty sm:pl-5 sm:text-base md:text-lg'>
        “{testimonial}”
      </blockquote>

      {hasLinks && (
        <footer className='border-bg3/50 flex flex-wrap items-center gap-2 border-t pt-4 sm:pt-5'>
          {Boolean(githubPage?.length) && (
            <Button
              href={githubPage}
              target='_blank'
              rel='noopener noreferrer'
              variant='outline'
              size='sm'
              className='gap-1.5 rounded-lg px-3'
              aria-label={`GitHub de ${autor}`}
            >
              <GithubIcon className='size-3.5' />
              GitHub
            </Button>
          )}
          {Boolean(linkedIn?.length) && (
            <Button
              href={linkedIn}
              target='_blank'
              rel='noopener noreferrer'
              variant='outline'
              size='sm'
              className='gap-1.5 rounded-lg px-3'
              aria-label={`LinkedIn de ${autor}`}
            >
              <LinkedInIcon className='size-3.5' />
              LinkedIn
            </Button>
          )}
          {Boolean(webPage?.length) && (
            <Button
              href={webPage}
              target='_blank'
              rel='noopener noreferrer'
              variant='outline'
              size='sm'
              className='gap-1.5 rounded-lg px-3'
              aria-label={`Sitio web de ${autor}`}
            >
              <Globe className='size-3.5' />
              Website
            </Button>
          )}
          {Boolean(mailTo?.length) && (
            <Button href={mailTo} variant='outline' size='sm' className='gap-1.5 rounded-lg px-3' aria-label={`Email de ${autor}`}>
              <Mail className='size-3.5' />
              Email
            </Button>
          )}
        </footer>
      )}
    </article>
  )
}

export default TestimonyCard
