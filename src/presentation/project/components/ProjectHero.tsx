'use client'

import Button from '@common/components/button'
import Image from '@common/components/image'
import { technologies } from '@common/core/data/technologies'
import GithubIcon from '@common/icons/github'
import { ArrowLeftIcon } from 'lucide-react'
import { motion } from 'motion/react'
import type { FC } from 'react'

import type { ProjectDetail } from '../project.types'

const ease = [0.22, 1, 0.36, 1] as const

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

const resolveTechs = (tags: string[]) => {
  const byKey = new Map(technologies.map(t => [normalize(t.name), t]))

  return tags
    .flatMap(tag => {
      const key = normalize(tag)
      const match =
        byKey.get(key) ?? [...byKey.entries()].find(([techKey]) => techKey.includes(key) || key.includes(techKey))?.[1]

      if (match) return [{ label: match.name, icon: match.icon }]
      return [{ label: tag, icon: null as string | null }]
    })
    .slice(0, 5)
}

interface Props {
  project: ProjectDetail
}

const ProjectHero: FC<Props> = ({ project }) => {
  const { title, summary, logo, banner, bannerWidth, bannerHeight, tags, website, github, figma } = project
  const techs = resolveTechs(tags)
  const webHref = website?.trim()
  const gitHref = github?.trim()
  const figmaHref = figma?.trim()
  const logoSrc = logo?.trim()
  const monogram = title.trim().slice(0, 1).toUpperCase()

  return (
    <header className='relative flex min-h-[70vh] w-full flex-col items-center justify-end pb-12 md:min-h-[78vh] md:pb-16'>
      <div className='absolute inset-0 overflow-hidden' aria-hidden>
        <Image
          src={banner}
          alt=''
          width={bannerWidth || 1500}
          height={bannerHeight || 1125}
          priority
          layout='fullWidth'
          unstyled
          objectFit='cover'
          className='absolute inset-0 size-full object-cover object-[center_30%] opacity-40 brightness-[0.55] saturate-[0.85]'
        />
        <div className='from-bg1 via-bg1/90 absolute inset-0 bg-gradient-to-t to-transparent' />
        <div className='from-bg1/50 absolute inset-0 bg-gradient-to-b via-transparent to-transparent' />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className='region max-region:px-5 relative z-[1] mx-auto flex w-full flex-col items-center gap-5 text-center md:gap-6'
      >
        <div className='bg-bg1/80 border-bg3/50 flex size-20 items-center justify-center overflow-hidden rounded-2xl border md:size-24'>
          {logoSrc && (
            <Image src={logoSrc} alt={`Logo de ${title}`} width={96} height={96} className='size-full object-contain p-3' />
          )}
          {!logoSrc && <span className='font-flowers text-fn1 text-4xl leading-none md:text-5xl'>{monogram}</span>}
        </div>

        <h1 className='font-flowers text-fn1 text-5xl leading-none tracking-tight md:text-6xl lg:text-7xl'>{title}</h1>

        {techs.length > 0 && (
          <ul className='flex flex-wrap items-center justify-center gap-x-5 gap-y-2'>
            {techs.map(tech => (
              <li key={tech.label} className='text-fn2 flex list-none items-center gap-2'>
                {tech.icon && <Image src={tech.icon} alt='' width={18} height={18} className='size-[18px] object-contain' />}
                <span className='text-sm tracking-wide'>{tech.label}</span>
              </li>
            ))}
          </ul>
        )}

        {summary.length > 0 && (
          <p className='text-fn2 max-w-[36rem] text-sm leading-relaxed text-pretty md:text-base'>{summary}</p>
        )}

        <div className='flex flex-wrap items-center justify-center gap-2 pt-1'>
          <Button href='/#projects' variant='outline' size='sm' className='gap-1.5 rounded-full'>
            <ArrowLeftIcon className='size-3.5' aria-hidden />
            Regresar
          </Button>

          {webHref && (
            <Button href={webHref} target='_blank' rel='noopener noreferrer' size='sm' className='rounded-full' showIconLink>
              Sitio
            </Button>
          )}

          {gitHref && (
            <Button
              href={gitHref}
              target='_blank'
              rel='noopener noreferrer'
              variant='ghost'
              size='sm'
              className='gap-1.5 rounded-full'
            >
              <GithubIcon className='size-3.5' aria-hidden />
              Código
            </Button>
          )}

          {figmaHref && (
            <Button
              href={figmaHref}
              target='_blank'
              rel='noopener noreferrer'
              variant='ghost'
              size='sm'
              className='rounded-full'
              showIconLink
            >
              Figma
            </Button>
          )}
        </div>
      </motion.div>
    </header>
  )
}

export default ProjectHero
