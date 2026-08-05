'use client'

import { FC } from 'react'
import ProjectGallery from './components/ProjectGallery'
import ProjectHero from './components/ProjectHero'
import ProjectMdx from './components/ProjectMdx'
import './project-mdx.css'
import type { ProjectDetail } from './project.types'

interface Props {
  project: ProjectDetail
}

const ProjectView: FC<Props> = ({ project }) => {
  return (
    <main className='relative w-full pb-24 md:pb-32'>
      <ProjectHero project={project} />

      <div className='max-region:px-5 mx-auto flex w-full flex-col items-center gap-16 md:gap-20'>
        {project.images.length > 0 && <ProjectGallery id={project.id} title={project.title} images={project.images} />}
        {project.mdxRaw.length > 0 && <ProjectMdx raw={project.mdxRaw} />}
      </div>
    </main>
  )
}

export default ProjectView
