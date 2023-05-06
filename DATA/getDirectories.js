import fs from "fs"

export default async function getDirectories(source) {
    const result = await fs.promises.readdir(source, { withFileTypes: true })
      .catch((e) => { console.error('getDirectories:', e) })
    return result.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
}