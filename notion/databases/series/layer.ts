import { FieldDefs, defineDocumentType } from 'contentlayer2/source-files'

import { commonLayerFields } from '@notion/lib/layerFields'

const seriesFields: FieldDefs = {
  folder: { type: 'string', required: true },
  folder_color: { type: 'string', required: true },
  profesor: { type: 'string', required: false },
  tags: { type: 'list', of: { type: 'string' }, required: false, default: [] },
  ...commonLayerFields
}

export default defineDocumentType(() => ({
  name: 'Series',
  filePathPattern: `series/**/*.mdx`,
  contentType: 'mdx',
  fields: seriesFields,
  computedFields: {
    url: {
      type: 'string',
      resolve: post => `/series/${post._raw.flattenedPath}`
    }
  }
}))
