import { FieldDefs, defineDocumentType } from 'contentlayer2/source-files'

import { commonLayerFields } from '@notion/lib/layerFields'

const marksFields: FieldDefs = {
  folder: { type: 'string', required: true },
  folder_color: { type: 'string', required: true },
  status: { type: 'string', required: false, default: '' },
  level: { type: 'string', required: false, default: '' },
  sessions: { type: 'list', of: { type: 'number' }, required: false, default: [] },
  tags: { type: 'list', of: { type: 'string' }, required: false, default: [] },
  ...commonLayerFields
}

export default defineDocumentType(() => ({
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
