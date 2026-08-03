import { allProjects } from 'contentlayer/generated'

import ProjectsView, { type ProjectItem } from './ProjectsView'

const projects: ProjectItem[] = [...allProjects]
  .sort((a, b) => b.relevance - a.relevance || a.title.localeCompare(b.title))
  .map(p => ({
    id: p.id,
    title: p.title,
    summary: p.summary ?? '',
    tags: p.tags ?? [],
    banner: p.banner,
    bannerWidth: p.banner_width ?? 0,
    bannerHeight: p.banner_height ?? 0,
    website: p.website,
    github: p.github,
    images: (p.allImagesBySections ?? [])
      .map(img => img.banner)
      .filter((src): src is string => Boolean(src))
      .slice(0, 3)
  }))

const Projects = () => <ProjectsView projects={projects} />

export default Projects
export type { ProjectItem }
