import { makeSource } from 'contentlayer2/source-files'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'

import MarksDocument from './notion/databases/marks/marks.layerConfig'
import ProjectsDocument from './notion/databases/projects/projects.layerConfig'
import SeriesDocument from './notion/databases/series/series.layerConfig'

export default makeSource({
  contentDirPath: 'content',
  contentDirExclude: ['projects/trace.yaml', 'series/trace.yaml', 'marks/trace.yaml'],
  documentTypes: [ProjectsDocument, SeriesDocument, MarksDocument],
  mdx: {
    rehypePlugins: [rehypeCodeTitles, [rehypePrism, { showLineNumbers: true }]]
  }
})
