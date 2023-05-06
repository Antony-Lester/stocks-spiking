import fs from 'fs';

export default async function (path, name = '') {
        await fs.promises.mkdir(path + '/' + name)
        //.then(() => console.log('Folder Created :', path + '/' + name))
        .catch((e) => { if (e.errno !== -17) { console.log(e) } })
}