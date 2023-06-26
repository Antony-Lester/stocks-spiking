import path from 'path'
import * as fs from 'node:fs'
import { RAW_DATA, TIMEFRAMES } from "../DATA/_locations.js"
import getFiles from '../DATA/getFiles.js'

export default async function processData(processList) {
    await Promise.all(processList.map(
        function ([exchange, ticker]) {

            const filesByTimeframe = (data) => data.map((files, index) => [index, files]);

            const filesByList = data => data
                .map(([timeframe, files]) => files
                .map((_, index, array) => [timeframe, array.slice(index + 0, index + 6)])
                .filter(([_, files]) => files.length == 6)).flat();
            
            const dataFromFiles = (data) => data.map(
                ([timeframe, files]) => {
                    const calculation = assignData(...files.map(
                            file => {
                                const data = JSON.parse(fs.readFileSync(path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[timeframe], file), 'utf8'))
                                return data.hasOwnProperty('data') ? data.data : data}))
                    fs.writeFileSync(
                        path.join(RAW_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[timeframe], files[0]),
                        JSON.stringify(calculation),
                        {encoding:'utf8',flag:'w'})
                })                 
            
            const printResults = (data) => console.log(exchange, ticker, 'results processed')
            
            Promise.all(TIMEFRAMES.map(
                (timeframe) => getFiles(path.join(RAW_DATA, exchange, ticker, 'timeframe', timeframe))
            ))
                .then(filesByTimeframe)
                .then(filesByList)
                .then(dataFromFiles)
                .then(printResults)
        
                
                    
                
        }
    ))  
}


function assignData(data, data1Bar, data2Bar, data3Bar, data4Bar, data5Bar) {
    const result = { long: {}, short: {}, real: {} }
    const getPercentageChange = ( x, y ) => ( ( x - y ) / x ).toFixed(3)
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
        result.real[5] = getPercentageChange(data.close, data5Bar.close)
    }
    return { data, result }
}
