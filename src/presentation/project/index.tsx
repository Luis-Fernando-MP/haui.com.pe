'use client'

import type { FC } from 'react'

import ProjectAuthors from './components/ProjectAuthors'
import ProjectGallery from './components/ProjectGallery'
import ProjectHero from './components/ProjectHero'
import ProjectMdx from './components/ProjectMdx'
import type { ProjectDetail } from './project.types'

interface Props {
  project: ProjectDetail
}

const ProjectView: FC<Props> = ({ project }) => {
  const authors = project.authors ?? []
  const images = project.images ?? []
  const hasMdx = (project.mdxCode ?? '').trim().length > 0

  return (
    <main className='relative w-full overflow-x-hidden pb-24 md:pb-32'>
      <ProjectHero project={project} />

      <div className='max-region:px-5 mx-auto flex w-full min-w-0 flex-col items-center gap-12 md:gap-20'>
        {authors.length > 0 && <ProjectAuthors authors={authors} />}
        {images.length > 0 && <ProjectGallery id={project.id} title={project.title} images={images} />}

        {hasMdx && <ProjectMdx code={project.mdxCode} />}
      </div>
    </main>
  )
}

export default ProjectView
