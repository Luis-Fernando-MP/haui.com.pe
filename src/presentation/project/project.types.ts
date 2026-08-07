export type ProjectAuthor = {
  name: string
  social?: string
  role?: string
}

export type ProjectDetail = {
  id: string
  title: string
  summary: string
  logo?: string
  banner: string
  bannerWidth: number
  bannerHeight: number
  tags: string[]
  status?: string
  website?: string
  github?: string
  figma?: string
  images: { src: string; caption?: string }[]
  authors: ProjectAuthor[]
  mdxCode: string
}
