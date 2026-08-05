import { allProjects } from 'contentlayer/generated'

import ProjectsView, { type ProjectItem } from './ProjectsView'

const projects: ProjectItem[] = [...allProjects]
  .sort((a, b) => b.relevance - a.relevance || a.title.localeCompare(b.title))
  .map(p => {
    const sectionImages = (p.allImagesBySections ?? []).map(img => img.banner).filter((src): src is string => Boolean(src))

    const gallery = [p.banner, ...sectionImages].filter((src, i, arr) => Boolean(src) && arr.indexOf(src) === i)

    return {
      id: p.id,
      title: p.title,
      summary: p.summary ?? '',
      tags: p.tags ?? [],
      banner: p.banner,
      bannerWidth: p.banner_width ?? 0,
      bannerHeight: p.banner_height ?? 0,
      imageHash: p.image_hash,
      readingTime: p.reading_time,
      lastEditedTime: p.last_edited_time,
      website: p.website,
      github: p.github,
      figma: p.figma,
      notion: p.notion,
      status: p.status,
      images: gallery
    }
  })

const Projects = () => <ProjectsView projects={projects} />

export default Projects
