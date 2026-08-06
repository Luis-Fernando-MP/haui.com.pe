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
    imageHash: p.image_hash,
    imageBlur: p.image_blur,
    website: p.website,
    github: p.github,
    figma: p.figma,
    notion: p.notion,
    readingTime: p.reading_time
  }))

const Projects = () => <ProjectsView projects={projects} />

export default Projects
