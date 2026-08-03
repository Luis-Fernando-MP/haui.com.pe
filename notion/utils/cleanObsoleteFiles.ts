import clog from '@notion/utils/log'
import fs from 'fs'
import path from 'path'

const cleanObsoleteFiles = async (existingIds: string[], folderPath: string, suffix?: string) => {
  let files: string[]
  try {
    files = await fs.promises.readdir(folderPath)
  } catch {
    return
  }

  const keep = new Set(existingIds)

  await Promise.all(
    files.map(async file => {
      if (file === 'trace.yaml') return

      const fullPath = path.join(folderPath, file)
      const stat = await fs.promises.stat(fullPath)

      if (stat.isFile() && suffix && file.endsWith(suffix)) {
        const id = file.slice(0, -suffix.length)
        if (keep.has(id)) return
        await fs.promises.unlink(fullPath)
        clog.warn(`rm ${file.slice(0, 28)}`)
        return
      }

      if (stat.isDirectory() && !keep.has(file)) {
        await fs.promises.rm(fullPath, { recursive: true, force: true })
        clog.warn(`rm ${file.slice(0, 28)}/`)
      }
    })
  )
}

export default cleanObsoleteFiles
