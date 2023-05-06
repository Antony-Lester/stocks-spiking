import getFiles from './getFiles.js'
import readJSON from './readJSON.js'
import makeJSON from './makeJSON.js'
import { count1Day, count2Hour, count30Min, count5Min, count1Min } from './_auditRaw.js'
import { RAW_DATA } from './_locations.js'
import path from 'path'
export default async function () { 
    
const report = await readJSON(RAW_DATA, 'structure')

for (const exchange of Object.keys(report)) { 
    const holder = report[exchange]
    for (const [ticker, obj] of Object.entries(holder)) { 

        const completed = report[exchange][ticker].completed
        if (!completed) { 
            const audit1Day = await getFiles(path.join(RAW_DATA, exchange, ticker, 'timeframe', '1Day'))
                .then((data) => data.length)
            const audit2Hour = await getFiles(path.join(RAW_DATA, exchange, ticker, 'timeframe', '2Hour'))
                .then((data) => data.length)
            const audit30Min = await getFiles(path.join(RAW_DATA, exchange, ticker, 'timeframe', '30Min'))
                .then((data) => data.length)
            const audit5Min = await getFiles(path.join(RAW_DATA, exchange, ticker, 'timeframe', '5Min'))
                .then((data) => data.length)
            const audit1Min = await getFiles(path.join(RAW_DATA, exchange, ticker, 'timeframe', '1Min'))
                .then((data) => data.length)
            if (audit1Day > count1Day && audit2Hour > count2Hour && audit30Min > count30Min && audit5Min > count5Min && audit1Min > count1Min) { report[exchange][ticker].completed = true }
            else {
                const result = []
                if (audit1Day > count1Day) {result.push('1Day')}
                if (audit2Hour > count2Hour) {result.push('2Hour')}
                if (audit30Min > count30Min) {result.push('30Min')}
                if (audit5Min > count5Min) {result.push('5Min')}
                if (audit1Min > count1Min) {result.push('1Min')}
            }
        }
    }
}
            
await makeJSON(RAW_DATA, 'structure', report)

console.log('Inital Data Check Completed')

}