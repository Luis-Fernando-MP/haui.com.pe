import ProjectView from '@presentation/project'
import { allProjects } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

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

const ProjectPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const project = allProjects.find(p => p.id === id)

  if (!project) notFound()

  const sectionImages = (project.allImagesBySections ?? []).map(img => img.banner).filter((src): src is string => Boolean(src))

  const gallery = [project.banner, ...sectionImages].filter((src, i, arr) => Boolean(src) && arr.indexOf(src) === i)

  return (
    <ProjectView
      project={{
        id: project.id,
        title: project.title,
        summary: project.summary ?? '',
        logo: project.logo,
        banner: project.banner,
        bannerWidth: project.banner_width ?? 0,
        bannerHeight: project.banner_height ?? 0,
        tags: project.tags ?? [],
        status: project.status,
        website: project.website,
        github: project.github,
        figma: project.figma,
        images: gallery,
        mdxRaw: project.body.raw
      }}
    />
  )
}

export default ProjectPage
