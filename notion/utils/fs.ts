import fs from 'fs'
import path from 'path'

export async function fileExists(filePath: string) {
  try {
    await fs.promises.stat(filePath)
    return true
  } catch {
    return false
  }
}

export async function getFileTime(filePath: string) {
  try {
    const file = await fs.promises.stat(filePath)
    return file.mtime.getTime()
  } catch {
    return 0
  }
}

export async function createDirectories(...directories: string[]) {
  const createdPaths: string[] = []
  const cwd = process.cwd()

  for (const directory of directories) {
    try {
      const folderPath = path.resolve(cwd, directory)
      await fs.promises.mkdir(folderPath, { recursive: true })
      createdPaths.push(folderPath)
    } catch {
      console.error(`Failed to create directory: ${directory}`)
    }
  }

  return createdPaths
}

export async function lastEditedFile(filePath: string, str: string) {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8')
    return content.includes(str)
  } catch {
    return false
  }
}

export async function deleteFileIfExists(filePath: string) {
  if (await fileExists(filePath)) await fs.promises.unlink(filePath)
}

export async function writeFile(filePath: string, content: string) {
  return await fs.promises.writeFile(filePath, content)
}
