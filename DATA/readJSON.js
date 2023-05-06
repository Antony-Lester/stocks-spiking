import fs from 'fs'
export default async function initJson(path, file) {
    return JSON.parse(await fs.promises.readFile(file ? path + '/' + file + '.json' : path + '.json')
        .catch(error => console.error(error, file ? path + '/' + file + '.json' : path + '.json', path, file)))
}