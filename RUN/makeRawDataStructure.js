import getAllTickers from "../API/getAllTickers.js";
import { RAW_DATA, TIMEFRAMES } from "../DATA/_locations.js";

import checkHardDrive from "../DATA/checkHardDrive.js";
import makeFolder from "../DATA/makeFolder.js";
import makeJSON from "../DATA/makeJSON.js";

export default async function () { 
    checkHardDrive()
    await makeFolder(RAW_DATA)
    const tickers = await getAllTickers()
    const stats = {exchanges: {}, class: {}, maintenance_margin_requirement: {}}
    for (const [exchange, exchangeData] of Object.entries(tickers)) {
        stats.exchanges[exchange] = 0
        await makeFolder(RAW_DATA, exchange)
        for (let [ticker, tickerData] of Object.entries(exchangeData)) {
            stats.exchanges[exchange] += 1
            ticker = tickerData.symbol
            await makeFolder(RAW_DATA + '/' + exchange, ticker)
            await makeFolder(RAW_DATA + '/' + exchange + '/' + ticker, 'summary')
            await makeFolder(RAW_DATA + '/' + exchange + '/' + ticker, 'timeframe')
            TIMEFRAMES.forEach(timeframe =>
                makeFolder(RAW_DATA + '/' + exchange + '/' + ticker + '/timeframe', timeframe))
            delete tickerData.status
            delete tickerData.tradable
            delete tickerData.marginable
            delete tickerData.shortable
            delete tickerData.easy_to_borrow
            delete tickerData.fractionable
            makeJSON(RAW_DATA + '/' + exchange + '/' + ticker + '/summary', 'details', tickerData, false)
            const _ = ['class', 'maintenance_margin_requirement'].forEach((metric) =>
            { 
                stats[metric][tickerData[metric]] =
                    stats[metric].hasOwnProperty(tickerData[metric]) ?
                        stats[metric][tickerData[metric]] += 1 : 1
            })
        }
    }
    console.log(stats)
    await makeJSON(RAW_DATA, 'summary', stats, false)
    const structure = await getDirectories(RAW_DATA).then(exchanges => exchanges.reduce((acc, curr) => (acc[curr] = {}, acc), {}))
    for (const exchange of Object.keys(structure)) {
        structure[exchange] = await getDirectories(RAW_DATA + '/' + exchange)
        .then(tickers => tickers.reduce((acc, curr) => (acc[curr] = {}, acc), {}))  }
    await makeJSON(RAW_DATA, 'structure', structure) 
}
