import getBars from "./getBars.js"
import baseDataAPIcalls from "./baseDataAPIcalls.js"
import HDDcheck from "../DATA/checkHardDrive.js"
import checkInitalData from "../DATA/checkInitalData.js"
export default async function () {
    HDDcheck()
    await checkInitalData()
    const APIcalls = await baseDataAPIcalls()
    console.log('APIcalls:', APIcalls.length)
    await getBars(APIcalls)
}

