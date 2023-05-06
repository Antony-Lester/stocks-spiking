import fs from "fs"

export default async function isDirEmpty(dirname) {
    const files = await fs.promises.readdir(dirname);
    return files.length === 0;
}