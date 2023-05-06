import fs from "fs"

export default async function isDirEmpty(dirname) {
    const files = await fs.promises.readdir(dirname);
    return files.length === 0;
}

export async function isDirNotEmpty(dirname) {
    const files = await fs.promises.readdir(dirname);
    return files.length > 0;
}