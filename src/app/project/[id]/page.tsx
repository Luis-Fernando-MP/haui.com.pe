import ProjectView from '@presentation/project'
import { allProjects } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { FC } from 'react'

export const generateStaticParams = () => allProjects.map(p => ({ id: p.id }))

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> => {
  const { id } = await params
  const project = allProjects.find(p => p.id === id)

  if (!project) {
    return { title: 'Proyecto | haui' }
  }

  const description = project.summary?.trim() || `Detalle del proyecto ${project.title}`

  return {
    title: `${project.title} | haui`,
    description,
    openGraph: {
      title: project.title,
      description,
      images: [
        {
          url: project.banner,
          width: project.banner_width || 1200,
          height: project.banner_height || 630,
          alt: project.title
        }
      ]
    }
  }
}

interface Props {
  params: Promise<{ id: string }>
}

const ProjectPage: FC<Props> = async ({ params }) => {
  const { id } = await params
  const project = allProjects.find(p => p.id === id)

  if (!project) notFound()

  console.log('project', project)

  const {
    relevance,
    priority,
    team,
    progress,
    status,
    github = '',
    website = '',
    figma = '',
    notion = '',
    logo = '',
    summary = '',
    images = [],
    authors = [],
    tags = [],
    id: pageId,
    title,
    created_time,
    last_edited_time,
    reading_time,
    banner,
    banner_width,
    banner_height,
    image_hash,
    body
  } = project

  const pageImages = (images ?? [])
    .map(img => {
      return {
        src: img.banner,
        thumb: img.thumb,
        caption: img.caption ?? ''
      }
    })
    .filter(img => !img.src)

  return (
    <ProjectView
      project={{
        id: pageId,
        title,
        summary,
        logo,
        banner,
        bannerWidth: banner_width,
        bannerHeight: banner_height,
        tags,
        status,
        website,
        github,
        figma,
        images: [],
        authors,
        mdxCode: body.code
      }}
    />
  )
}

export default ProjectPage
