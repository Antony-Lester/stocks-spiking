import { PROCESSED_DATA, RAW_DATA, TIMEFRAMES } from "../DATA/_locations.js";
import checkHardDrive from "../DATA/checkHardDrive.js";
import makeFolder from "../DATA/makeFolder.js";
import readJSON from "../DATA/readJSON.js";
export default async function make() { 
    checkHardDrive()
    await makeFolder(PROCESSED_DATA)
    const structure = await readJSON(RAW_DATA, 'structure')
    for (const [exchange, exchangeData] of Object.entries(structure)) {
        await makeFolder(PROCESSED_DATA, exchange)
        for (let [ticker, _] of Object.entries(exchangeData)) {
            await makeFolder(PROCESSED_DATA + '/' + exchange, ticker)
            await makeFolder(PROCESSED_DATA + '/' + exchange + '/' + ticker, 'summary')
            await makeFolder(PROCESSED_DATA + '/' + exchange + '/' + ticker, 'timeframe')
            TIMEFRAMES.forEach(timeframe =>
                makeFolder(PROCESSED_DATA + '/' + exchange + '/' + ticker + '/timeframe', timeframe))
        }
    }
    console.log('Processed Data Structure Complete')
    
}
make()
