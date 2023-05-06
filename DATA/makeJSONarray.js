import fs from 'fs'

export default async function (path, file = '', array) { 
    fs.readFile(file ? path + '/' + file + '.json' : path + '.json', function (err, data) {
        var json = JSON.parse(data)
        json.push(array)
        fs.writeFile(file ? path + '/' + file + '.json' : path + '.json', JSON.stringify(json))
    })
}

