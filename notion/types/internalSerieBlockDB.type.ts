export default interface InternalSerieBlockDB {
  object: 'block'
  id: string
  parent: {
    type: 'page_id'
    page_id: string
  }
  created_time: string
  last_edited_time: string
  has_children: boolean
  archived: boolean
  in_trash: boolean
  type: 'child_database'
  child_database: null | { title: string | null }
}
