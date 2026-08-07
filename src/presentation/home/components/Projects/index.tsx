import { allProjects } from 'contentlayer/generated'

import ProjectsView, { type ProjectItem } from './ProjectsView'

const asHref = (value?: string | null) => {
  const href = value?.trim() ?? ''
  return href.length > 0 ? href : undefined
}

const projects: ProjectItem[] = [...allProjects]
  .sort((a, b) => b.relevance - a.relevance || a.title.localeCompare(b.title))
  .map(p => ({
    id: p.id,
    title: p.title,
    summary: (p.summary ?? '').trim(),
    tags: p.tags ?? [],
    banner: p.banner,
    bannerWidth: p.banner_width ?? 0,
    bannerHeight: p.banner_height ?? 0,
    imageHash: p.image_hash || undefined,
    imageBlur: p.image_blur || undefined,
    website: asHref(p.website),
    github: asHref(p.github),
    figma: asHref(p.figma),
    notion: asHref(p.notion),
    readingTime: p.reading_time
  }))

const Projects = () => <ProjectsView projects={projects} />

export default Projects
