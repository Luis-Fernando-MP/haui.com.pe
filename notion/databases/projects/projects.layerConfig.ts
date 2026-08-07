import { FieldDefs, defineDocumentType, defineNestedType } from 'contentlayer2/source-files'

import { commonLayerConfigFields } from '../commonLayerConfigFields'

export const ProjectImage = defineNestedType(() => ({
  name: 'ProjectImage',
  fields: {
    id: { type: 'string', required: true },
    banner: { type: 'string', required: false },
    thumb: { type: 'string', required: false },
    caption: { type: 'string', required: false, default: '' }
  }
}))

export const ProjectAuthor = defineNestedType(() => ({
  name: 'ProjectAuthor',
  fields: {
    name: { type: 'string', required: true },
    social: { type: 'string', required: false, default: '' },
    role: { type: 'string', required: false, default: '' }
  }
}))

const projectsFields: FieldDefs = {
  relevance: {
    type: 'number',
    required: true,
    default: 1
  },
  priority: {
    type: 'string',
    required: true
  },
  team: {
    type: 'string',
    required: true
  },
  progress: {
    type: 'number',
    required: true
  },

  status: {
    type: 'string',
    required: true
  },
  github: {
    type: 'string',
    required: false
  },
  website: {
    type: 'string',
    required: false
  },
  figma: {
    type: 'string',
    required: false
  },
  notion: {
    type: 'string',
    required: false
  },
  logo: {
    type: 'string',
    required: false
  },
  summary: {
    type: 'string',
    required: false,
    default: ''
  },
  images: {
    type: 'list',
    of: ProjectImage,
    required: false
  },
  authors: {
    type: 'list',
    of: ProjectAuthor,
    required: false
  },

  tags: {
    type: 'list',
    of: { type: 'string' },
    required: false,
    default: []
  },

  ...commonLayerConfigFields
}

const ProjectsDocument = defineDocumentType(() => ({
  name: 'Projects',
  filePathPattern: `projects/**/*.mdx`,
  contentType: 'mdx',
  fields: projectsFields,
  computedFields: {
    url: {
      type: 'string',
      resolve: post => `/project/${post.id}`
    }
  }
}))

export default ProjectsDocument
