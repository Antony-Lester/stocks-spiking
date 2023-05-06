import fs from 'fs'

export default async function (path, file, object) { 
    await fs.promises.writeFile(file ? path + '/' + file + '.json' : path + '.json', JSON.stringify(object, null, 4), {encoding: 'utf-8'}).catch(error => console.error("File Write Failed:", path, file, error))  
}
