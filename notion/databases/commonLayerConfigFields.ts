import { FieldDefs } from 'contentlayer2/source-files'

export const commonLayerConfigFields: FieldDefs = {
  id: {
    type: 'string',
    required: true
  },
  title: {
    type: 'string',
    required: true
  },

  created_time: {
    type: 'date',
    required: false
  },
  last_edited_time: {
    type: 'date',
    required: false
  },

  reading_time: {
    type: 'number',
    required: false,
    default: 0.3
  },
  words: {
    type: 'number',
    required: false
  },

  // background image config
  banner: {
    type: 'string',
    required: false,
    default: '/fallback.webp'
  },
  banner_width: {
    type: 'number',
    default: 0,
    required: false
  },
  banner_height: {
    type: 'number',
    default: 0,
    required: false
  },
  aspectRatio: {
    type: 'number',
    default: 0,
    required: false
  },
  image_hash: {
    type: 'string',
    default: 'L1QTDn-;-;-;_NjajtfQ=}fQD%f6',
    required: false
  },
  image_blur: {
    type: 'string',
    default: 'radial-gradient(at 0 0, #fff, #ccc 50%)',
    required: false
  },

  // Thumb properties
  thumb: {
    type: 'string',
    required: false,
    default: '/fallback.webp'
  },
  thumb_width: {
    type: 'number',
    default: 0,
    required: false
  },
  thumb_height: {
    type: 'number',
    default: 0,
    required: false
  }
}
