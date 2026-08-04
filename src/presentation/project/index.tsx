'use client'

import ProjectGallery from './components/ProjectGallery'
import ProjectHero from './components/ProjectHero'
import ProjectMdx from './components/ProjectMdx'
import './project-mdx.css'
import type { ProjectDetail } from './project.types'

export type { ProjectDetail }

const ProjectView = ({ project }: { project: ProjectDetail }) => {
  return (
    <main className='relative w-full pb-24 md:pb-32'>
      <ProjectHero project={project} />
      <div className='max-region:px-5 mx-auto flex w-full flex-col items-center gap-16 md:gap-20'>
        {project.images.length > 0 && <ProjectGallery id={project.id} title={project.title} images={project.images} />}
        {project.mdxCode.length > 0 && <ProjectMdx code={project.mdxCode} />}
      </div>
    </main>
  )
}

export default ProjectView
