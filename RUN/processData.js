import path from 'path'

import { RAW_DATA, TIMEFRAMES, PROCESSED_DATA } from "../DATA/_locations.js"
import { isDirNotEmpty } from "../DATA/checkFolder.js"
import getFiles from '../DATA/getFiles.js'
import readJSON from '../DATA/readJSON.js'
import makeJSON from '../DATA/makeJSON.js'

export default async function processData() {
    const processes = await readJSON(RAW_DATA, 'structure')
    const processList = []
    for (const exchange of Object.keys(processes)) {let holder = processes[exchange]
        for (const [ticker, _] of Object.entries(holder)) {processList.push([exchange, ticker])}}
    processList.forEach(function ([exchange, ticker]) {
        if (TIMEFRAMES.every((timeframe) => isDirNotEmpty(path.join(RAW_DATA, exchange, ticker, 'timeframe', timeframe)))) {
            const [files1Min, files5Min, files30Min, files2Hour, files1Day] = Promise.all([
                getFiles(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[0]))
                    .then(files => files.map(file => file.slice(0, -5))),
                getFiles(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[1]))
                    .then(files => files.map(file => file.slice(0, -5))),
                getFiles(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[2]))
                    .then(files => files.map(file => file.slice(0, -5))),
                getFiles(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[3]))
                    .then(files => files.map(file => file.slice(0, -5))),
                getFiles(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[4]))
                    .then(files => files.map(file => file.slice(0, -5)))]).resolve()
            //----- 1Min -----
            files1Min.forEach(async function (file) {
                const files = [...files1Min].slice(files1Min.indexOf(file) + 2, 6)
                const data = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[0]), file)
                const data1Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[0]), files[0])
                const data2Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[0]), files[1])
                const data3Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[0]), files[2])
                const data4Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[0]), files[3])
                const data5Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[0]), files[4])
                makeJSON(path.join(PROCESSED_DATA, exchange, ticker, 'timeline', '1Min'), file,
                    assignData(data, data1Bar, data2Bar, data3Bar, data4Bar, data5Bar, result))})
            //----- 5Min -----
            files5Min.forEach(async function (file) {
                const files = [...files5Min].slice(files5Min.indexOf(file) + 2, 6)
                const data = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[1]), file)
                const data1Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[1]), files[0])
                const data2Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[1]), files[1])
                const data3Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[1]), files[2])
                const data4Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[1]), files[3])
                const data5Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[1]), files[4])
                makeJSON(path.join(PROCESSED_DATA, exchange, ticker, 'timeline', '5Min'), file, assignData(data, data1Bar, data2Bar, data3Bar, data4Bar, data5Bar, result))})
            //----- 30Min ----
            files30Min.forEach(async function (file) {
                const files = [...files30Min].slice(files30Min.indexOf(file) + 2, 6)
                const data = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[2]), file)
                const data1Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[2]), files[0])
                const data2Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[2]), files[1])
                const data3Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[2]), files[2])
                const data4Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[2]), files[3])
                const data5Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[2]), files[4])
                makeJSON(path.join(PROCESSED_DATA, exchange, ticker, 'timeline', '30Min'), file, assignData(data, data1Bar, data2Bar, data3Bar, data4Bar, data5Bar, result))})
            //----- 2Hour ----
            files2Hour.forEach(async function (file) {
                const files = [...files2Hour].slice(files2Hour.indexOf(file) + 2, +6)
                const data = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[3]), file)
                const data1Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[3]), files[0])
                const data2Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[3]), files[1])
                const data3Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[3]), files[2])
                const data4Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[3]), files[3])
                const data5Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[3]), files[4])
                makeJSON(path.join(PROCESSED_DATA, exchange, ticker, 'timeline', '2Hour'), file, assignData(data, data1Bar, data2Bar, data3Bar, data4Bar, data5Bar, result))})
            //----- 1Day -----
            files1Day.forEach(async function (file) {
                const files = [...files1Day].slice(files1Day.indexOf(file) + 2, +6)
                const data = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[4]), file)
                const data1Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[4]), files[0])
                const data2Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[4]), files[1])
                const data3Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[4]), files[2])
                const data4Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[4]), files[3])
                const data5Bar = await readJSON(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[4]), files[4])
                makeJSON(path.join(PROCESSED_DATA, exchange, ticker, 'timeline', '1Day'), file, assignData(data, data1Bar, data2Bar, data3Bar, data4Bar, data5Bar, result))})
}})}

function assignData(data, data1Bar, data2Bar, data3Bar, data4Bar, data5Bar) {
    const result = { long: {}, short: {}, real: {} }
    const getPercentageChange = ( x, y ) => ( ( x - y ) / x ).toFixed( 3 )
    if (data1Bar !== undefined) { 
        result.long[1] = getPercentageChange(data.high, data1Bar.low)
        result.short[1] = getPercentageChange(data.low, data1Bar.high)
        result.real[1] =  getPercentageChange(data.close, data1Bar.close)}
    if (data2Bar !== undefined) { 
        result.long[2] = getPercentageChange(data.high, data2Bar.low)
        result.short[2] = getPercentageChange(data.low, data2Bar.high)
        result.real[2] =  getPercentageChange(data.close, data2Bar.close)}
    if (data3Bar !== undefined) { 
        result.long[3] = getPercentageChange(data.high, data3Bar.low)
        result.short[3] = getPercentageChange(data.low, data3Bar.high)
        result.real[3] =  getPercentageChange(data.close, data3Bar.close)}
    if (data4Bar !== undefined) { 
        result.long[4] = getPercentageChange(data.high, data4Bar.low)
        result.short[4] = getPercentageChange(data.low, data4Bar.high)
        result.real[4] =  getPercentageChange(data.close, data4Bar.close)}
    if (data5Bar !== undefined) { 
        result.long[5] = getPercentageChange(data.high, data5Bar.low)
        result.short[5] = getPercentageChange(data.low, data5Bar.high)
        result.real[5] =  getPercentageChange(data.close, data5Bar.close)}
    return { data, result }
}
processData()
