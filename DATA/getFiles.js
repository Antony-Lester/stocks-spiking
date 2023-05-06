import fs from "fs"

export default async function getFiles(source) {
    return await fs.promises.readdir(source, { withFileTypes: true })
    .then(data=>data.filter(dirent => !dirent.isDirectory()).map(dirent => dirent.name))
    .catch((e) => { console.error('getFiles:', e) })
    
}