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

export async function createDirectories(...directories: string[]) {
  const createdPaths: string[] = []
  const cwd = process.cwd()

  for (const directory of directories) {
    const folderPath = path.resolve(cwd, directory)
    await fs.promises.mkdir(folderPath, { recursive: true })
    createdPaths.push(folderPath)
  }

  return createdPaths
}

export async function deleteFileIfExists(filePath: string) {
  if (await fileExists(filePath)) await fs.promises.unlink(filePath)
}

export async function writeFile(filePath: string, content: string) {
  return await fs.promises.writeFile(filePath, content)
}
