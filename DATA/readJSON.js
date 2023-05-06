import fs from 'fs'
export default async function (path, file) {
    return await fs.promises.readFile(file ? path + '/' + file + '.json' : path + '.json')
        .then(resp=>JSON.parse(resp))
        .catch(error => console.error(error, file ? path + '/' + file + '.json' : path + '.json', path, file))
}