import fs from 'fs'

export default function (path, file = '', object) { 
    fs.readFile(file ? path + '/' + file + '.json' : path + '.json', function (err, data) {
        var json = JSON.parse(data)
        json = { ...json, ...object }
        fs.writeFile(file ? path + '/' + file + '.json' : path + '.json', JSON.stringify(json))
    })
}