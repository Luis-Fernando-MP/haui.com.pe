import { FieldDefs, defineDocumentType, defineNestedType } from 'contentlayer2/source-files'

import { commonLayerConfigFields } from '../commonLayerConfigFields'

export const ImageSection = defineNestedType(() => ({
  name: 'ImageSection',
  fields: {
    banner: { type: 'string', required: false },
    thumb: { type: 'string', required: false }
  }
}))

const marksFields: FieldDefs = {
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
  allImagesBySections: {
    type: 'list',
    of: ImageSection,
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
  fields: marksFields,
  computedFields: {
    url: {
      type: 'string',
      resolve: post => `/projects/${post._raw.flattenedPath}`
    }
  }
}))

export default ProjectsDocument
