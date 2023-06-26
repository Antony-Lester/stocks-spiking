
import { TESTING } from '../secrets.js';
import results from './results.js';
import metrics from './metrics.js'
export default function () { 
    return TESTING ? one() : console.log('all')//all()
}

function one() {
    const processList = [['NASDAQ', 'AAPL']]
    //results(processList) //working....
    metrics(processList)
}
async function all() {
    //get list from report
    const processes = await readJSON(RAW_DATA, 'structure')
    const processList = []
    for (const exchange of Object.keys(processes)) {let holder = processes[exchange]
        for (const [ticker, _] of Object.entries(holder)) {processList.push([exchange, ticker])}}
    //check if they need to calculate results - and calculate
    results(processList)
//check if they need to calculate metrics - and calculate
}


