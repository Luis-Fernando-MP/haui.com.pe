import { FieldDefs, defineDocumentType } from 'contentlayer2/source-files'

import { commonLayerConfigFields } from '../commonLayerConfigFields'

const marksFields: FieldDefs = {
  folder: {
    type: 'string',
    required: true
  },
  folder_color: {
    type: 'string',
    required: true
  },
  status: {
    type: 'string',
    required: false,
    default: ''
  },
  level: {
    type: 'string',
    required: false,
    default: ''
  },
  sessions: {
    type: 'list',
    of: { type: 'number' },
    required: false,
    default: []
  },
  tags: {
    type: 'list',
    of: { type: 'string' },
    required: false,
    default: []
  },

  ...commonLayerConfigFields
}

const MarksDocument = defineDocumentType(() => ({
  name: 'Marks',
  filePathPattern: `marks/**/*.mdx`,
  contentType: 'mdx',
  fields: marksFields,
  computedFields: {
    url: {
      type: 'string',
      resolve: post => `/marks/${post._raw.flattenedPath}`
    }
  }
}))

export default MarksDocument
