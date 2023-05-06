import getBars from "../API/getBars.js"
import baseDataAPIcalls from "../API/baseDataAPIcalls.js"
import HDDcheck from "../DATA/checkHardDrive.js"
import checkInitalData from "../DATA/checkInitalData.js"
export default async function () {
    HDDcheck()
    await checkInitalData()
    const APIcalls = await baseDataAPIcalls()
    console.log('APIcalls:', APIcalls.length)
    await getBars(APIcalls)
}

