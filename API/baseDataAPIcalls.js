import { RAW_DATA } from '../DATA/_locations.js'
import readJSON from '../DATA/readJSON.js'
export default async function () { 
    const report = await readJSON(RAW_DATA, 'structure')
    const APIcalls = []
    for (const exchange of Object.keys(report)) { 
        let holder = report[exchange]
        for (const [ticker, obj] of Object.entries(holder)) { 
            if (obj.completed !== true)
            {APIcalls.push([exchange, ticker])}}}
    return APIcalls
}

