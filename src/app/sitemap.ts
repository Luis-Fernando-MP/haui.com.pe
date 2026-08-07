import { allProjects } from 'contentlayer/generated'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://haui-dev.vercel.app'
  const now = new Date()

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    ...allProjects.map(project => ({
      url: `${base}/project/${project.id}`,
      lastModified: project.last_edited_time ? new Date(project.last_edited_time) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }))
  ]
}
