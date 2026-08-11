'use client'

import Button from '@common/components/button'
import Image from '@common/components/image'
import { INFO, SOCIAL } from '@common/core/data/info'
import GithubIcon from '@common/icons/github'
import { BriefcaseBusinessIcon } from 'lucide-react'
import { motion } from 'motion/react'
import type { FC } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const HeroHeader: FC = () => {
  return (
    <header className='region max-region:px-5 relative mx-auto flex w-full min-w-0 items-center justify-center gap-8 overflow-x-hidden pt-20 pb-12 max-lg:flex-col max-lg:gap-7 sm:pt-24 sm:pb-16 md:gap-14 md:pt-28 md:pb-20 lg:min-h-[calc(100svh-5rem)]'>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease, delay: 0.05 }}
        className='relative z-[1] shrink-0'
      >
        <Image
          src='/logo-big.webp'
          width={360}
          height={360}
          alt={`Logo de ${INFO.devShortName}`}
          priority
          layout='constrained'
          unstyled
          objectFit='contain'
          sizes='(max-width: 640px) 140px, (max-width: 768px) 180px, 280px'
          className='pointer-events-none relative h-auto w-[140px] object-contain select-none sm:w-[180px] md:w-[280px]'
        />
      </motion.div>

      <div className='relative z-[1] flex w-full min-w-0 max-w-[560px] flex-col gap-4 max-lg:items-center max-lg:text-center sm:gap-5 md:gap-6'>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.12 }}
          className='border-bg3 bg-bg1 text-fn1 inline-flex max-w-full w-fit items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase sm:gap-2.5 sm:px-3.5 sm:text-[11px] sm:tracking-[0.18em]'
        >
          {!INFO.working.state && (
            <span className='relative flex size-1.5 shrink-0'>
              <span className='bg-semantic-success absolute inset-0 animate-ping rounded-full opacity-60 motion-reduce:animate-none' />
              <span className='bg-semantic-success relative size-1.5 rounded-full' />
            </span>
          )}
          {INFO.working.state && <span className='bg-via size-1.5 shrink-0 rounded-full' />}
          <span className='truncate'>
            {INFO.devShortName} · Portfolio {new Date().getFullYear()}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.18 }}
          className='w-full text-[clamp(2.65rem,11.5vw,3.75rem)] leading-[0.92] font-extrabold tracking-tight text-pretty sm:text-7xl md:text-8xl lg:text-[6rem]'
        >
          <span className='text-gradient font-[inherit] text-[length:inherit] leading-[inherit]'>LUIS</span>
          <br />
          <span className='text-fn1 font-[inherit] text-[length:inherit] leading-[inherit]'>FERNANDO</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.28 }}
          className='flex w-full flex-col gap-2 max-lg:items-center sm:gap-2.5'
        >
          <p className='text-fn1 text-base font-semibold tracking-tight text-balance sm:text-lg md:text-xl'>{INFO.resumeAbout}</p>
          <p className='text-fn2 max-w-[460px] text-sm leading-relaxed text-pretty sm:text-base md:text-lg'>
            Diseño y construyo productos web claros, interactivos y centrados en la experiencia real del usuario.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.36 }}
          className='flex w-full flex-wrap items-center gap-2 max-lg:justify-center sm:gap-2.5'
        >
          {INFO.working.enterprise.length > 0 && (
            <Button href='#experience' variant='outline' showIconLink className='max-w-full gap-1.5'>
              <Image
                src={INFO.working.logo}
                alt={`Logo de ${INFO.working.enterprise}`}
                width={16}
                height={16}
                layout='fixed'
                unstyled
                objectFit='contain'
                className='size-4 shrink-0 rounded-md object-contain'
              />
              <span className='max-w-[11rem] truncate sm:max-w-none'>
                <span className='hidden sm:inline'>Creando ideas con: </span>
                {INFO.working.enterprise}
              </span>
            </Button>
          )}
          {!INFO.working.state && INFO.working.enterprise.length === 0 && (
            <Button href='#contact' showIconLink className='gap-1.5'>
              <span className='relative flex size-2 shrink-0'>
                <span className='bg-semantic-success absolute inset-0 animate-ping rounded-full opacity-55 motion-reduce:animate-none' />
                <span className='bg-semantic-success relative size-2 rounded-full' />
              </span>
              <span>Disponible para trabajar</span>
            </Button>
          )}

          <Button href='#experience' variant='outline' showIconLink className='gap-1.5'>
            <span>Ver experiencia</span>
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
      </div>

      <div
        aria-hidden
        className='font-rubik text-fn2 pointer-events-none absolute top-1/2 left-1/2 -z-0 w-[min(100%,42rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-transparent text-center text-[clamp(4.5rem,18vw,12rem)] leading-[0.85] opacity-[0.22] select-none sm:opacity-[0.3] [font-size-adjust:none]'
      >
        LUIS
        <br />
        FERNANDO
        <br />
        DEVELOPER
      </div>
    </header>
  )
}

export default HeroHeader
