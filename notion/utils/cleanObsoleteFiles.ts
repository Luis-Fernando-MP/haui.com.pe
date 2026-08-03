import clog from '@notion/utils/log'
import fs from 'fs'
import path from 'path'

const cleanObsoleteFiles = async (existingIds: string[], folderPath: string, suffix?: string) => {
  const files = await fs.promises.readdir(folderPath)

  const toDelete = await Promise.all(
    files.map(async file => {
      const fullPath = path.join(folderPath, file)
      const stat = await fs.promises.stat(fullPath)

      if (stat.isFile() && suffix && file.endsWith(suffix)) {
        const id = file.replace(suffix, '')
        return !existingIds.includes(id) ? file : null
      }

      if (stat.isDirectory() && !existingIds.includes(file)) {
        return file
      }

      return null
    })
  )

  await Promise.all(
    toDelete
      .filter((name): name is string => name !== null)
      .map(async name => {
        const fullPath = path.join(folderPath, name)
        if (suffix) {
          await fs.promises.unlink(fullPath)
        } else {
          await fs.promises.rm(fullPath, { recursive: true, force: true })
        }
        clog.error(`Eliminado: ${name.slice(0, 30)}`)
      })
  )
}

export default cleanObsoleteFiles
