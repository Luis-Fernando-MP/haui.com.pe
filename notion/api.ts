import { Client } from '@notionhq/client'

import { env } from './constants'

const notion = new Client({
  auth: env.NOTION_TOKEN
})

export default notion
