'use client'

import Button from '@common/components/button'
import Image from '@common/components/image'
import { INFO, SOCIAL } from '@common/core/constants'
import GithubIcon from '@common/icons/github'
import { BriefcaseBusinessIcon } from 'lucide-react'
import { motion } from 'motion/react'
import type { FC } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const HeroHeader: FC = () => {
  return (
    <header className='region max-region:px-5 relative mx-auto flex min-h-[calc(100svh-5rem)] w-full items-center justify-center gap-10 overflow-x-hidden pt-24 pb-16 max-lg:flex-col max-lg:gap-8 md:gap-14 md:pt-28 md:pb-20'>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease, delay: 0.05 }}
        className='relative z-[1] shrink-0'
      >
        <div
          aria-hidden
          className='from-from/25 via-via/20 to-to/25 absolute top-1/2 left-1/2 -z-10 size-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br blur-3xl'
        />
        <div
          aria-hidden
          className='bg-semantic-success/10 absolute top-[18%] right-[8%] -z-10 size-24 rounded-full blur-2xl'
        />
        <Image
          src='/logo-big.webp'
          width={360}
          height={360}
          alt={`Logo de ${INFO.devShortName}`}
          priority
          className='pointer-events-none relative h-auto w-[180px] object-contain select-none md:w-[280px]'
        />
      </motion.div>

      <div className='relative z-[1] flex max-w-[560px] flex-col gap-5 max-lg:items-center max-lg:text-center md:gap-6'>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.12 }}
          className='border-bg3 bg-bg1 text-fn1 inline-flex w-fit items-center gap-2.5 rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.18em] uppercase'
        >
          {!INFO.working.state ? (
            <span className='relative flex size-1.5'>
              <span className='bg-semantic-success absolute inset-0 animate-ping rounded-full opacity-60 motion-reduce:animate-none' />
              <span className='bg-semantic-success relative size-1.5 rounded-full' />
            </span>
          ) : (
            <span className='bg-via size-1.5 shrink-0 rounded-full' />
          )}
          {INFO.devShortName} · Portfolio {new Date().getFullYear()}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.18 }}
          className='text-6xl leading-[0.92] font-extrabold tracking-tight text-pretty sm:text-7xl md:text-8xl lg:text-[6rem]'
        >
          <span className='text-gradient font-[inherit] text-[length:inherit] leading-[inherit]'>LUIS</span>
          <br />
          <span className='text-fn1 font-[inherit] text-[length:inherit] leading-[inherit]'>FERNANDO</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.55, ease, delay: 0.24 }}
          className='gradient h-px w-16 origin-left max-lg:origin-center'
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.28 }}
          className='flex flex-col gap-2.5 max-lg:items-center'
        >
          <p className='text-fn1 text-lg font-semibold tracking-tight md:text-xl'>{INFO.resumeAbout}</p>
          <p className='text-fn2 max-w-[460px] text-base leading-relaxed text-pretty md:text-lg'>
            Diseño y construyo productos web claros, interactivos y centrados en la experiencia real del usuario.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.36 }}
          className='flex flex-wrap items-center gap-2.5 max-lg:justify-center'
        >
          {!INFO.working.state && (
            <Button href='#contact' status='success' showIconLink size='lg'>
              <span className='relative flex size-2'>
                <span className='bg-semantic-success absolute inset-0 animate-ping rounded-full opacity-55 motion-reduce:animate-none' />
                <span className='bg-semantic-success relative size-2 rounded-full' />
              </span>
              Disponible para trabajar
            </Button>
          )}
          <Button href='#experience' variant='outline' showIconLink size='lg'>
            Ver experiencia
          </Button>
          <Button
            href={SOCIAL.GitHub.url}
            target='_blank'
            rel='noopener noreferrer'
            variant='outline'
            size='icon'
            aria-label='GitHub'
          >
            <GithubIcon className='size-4' />
          </Button>
          <Button
            href={SOCIAL.LinkedIn.url}
            target='_blank'
            rel='noopener noreferrer'
            variant='outline'
            size='icon'
            aria-label='LinkedIn'
          >
            <BriefcaseBusinessIcon className='size-4' />
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease, delay: 0.5 }}
          className='text-fn2 font-mono text-xs tracking-wide'
        >
          {SOCIAL.GitHub.display}
          <span className='text-fn2/50 mx-2'>·</span>
          Open to collaborate
        </motion.p>
      </div>

      <p
        aria-hidden
        className='font-rubik text-fn2 pointer-events-none absolute top-1/2 left-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 text-center text-[5.5rem] leading-[0.9] opacity-[0.04] select-none sm:text-[7rem] md:text-[9rem]'
      >
        LUIS
        <br />
        FERNANDO
        <br />
        DEVELOPER
      </p>
    </header>
  )
}

export default HeroHeader
