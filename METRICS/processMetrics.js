import path from 'path'

import calculateADX from './calculateADX.js'
import calculateDIminus from './calculateDI-.js'
import calculateDIplus from './calculateDI+.js'
import calculateRSI from './calculateRSI.js'
import calculateSC from './calculateSC.js'
import calculateSAR from './calculateSAR.js'
import calculateMFI from './calculateMFI.js'
import calculateEOM from './calculateEOM.js'
import calculateFPP from './calculateFPP.js'
import calculateTD from './calculateTD.js'
import calculateCP from './calculateCP.js'
import calculateFIB from './calculateFIB.js'

import { TIMEFRAMES, PROCESSED_DATA } from '../DATA/_locations.js'
import getFiles from '../DATA/getFiles.js'
const exchange = 'AMEX'
const ticker = 'BHB'

//temp
const i = 0
console.log(path.join(PROCESSED_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[i]))
//get file names for each time frame
const filenames = await getFiles(path.join(PROCESSED_DATA, exchange, ticker, 'timeframe', TIMEFRAMES[i]))
console.log(filenames)
//////////////////////////////////////////////////////////////////////////
//GET
const fileName = '1990'
const high28 = []
const low28 = []
const close28 = []
const volume28 = []
const open28 = []
/////////////////////////////////////////////////////////////////////////////

const timeStamp = new Date(fileName)

const high14 = high28.slice(Math.max(high28.length - 14, 0)) 
const low14 = low28.slice(Math.max(low28.length - 14, 0))
const close14 = close28.slice(Math.max(close28.length - 14, 0))
const volume14 = volume28.slice(Math.max(volume28.length - 14, 0))

const [high] = high28.slice(-1)
const [low] =  low28.slice(-1)
const [close] = close28.slice(-1)
const [open] = open28.slice(-1)

console.log('high28', high28.length, high28)
console.log('high14', high14.length, high14)
console.log('high', high.length, high)

const metrics = {
    ADX: {
        a: calculateADX(high14, low14, close14, 14),
        b: calculateADX(high28, low28, close28, 28)
    },
    DIminus: {
        a: calculateDIminus(high14, low14, close14, 14),
        b: calculateDIminus(high28, low28, close28, 28)
    },
    DIplus: {
        a: calculateDIplus(high14, low14, close14, 14),
        b: calculateDIplus(high28, low28, close28, 28),
    },
    RSI: {
        a: calculateRSI(close14),
        b: calculateRSI(close28)
    },
    SC: {
        a: calculateSC(close14),
        b: calculateSC(close28)
    },
    SAR: {
        a: calculateSAR(high14, low14, close14),
        b: calculateSAR(high28, low28, close28)
    },
    MFI: {
        a: calculateMFI(high14, low14, close14, volume14, 14),
        b: calculateMFI(high28, low28, close28, volume28, 28)
    },
    EOM: {
        a: calculateEOM(high14, low14, volume14),
        b: calculateEOM(high28, low28, volume28)
    },
    FPP: calculateFPP(high, low, close),
    TD: calculateTD(high, low, close, open),
    CP: calculateCP(high, low, close),
    FIB: calculateFIB(high, low),
    T: calculateTD(timeStamp),
}

//ADX: 
console.log('ADXa', metrics.ADX.a)
console.log('ADXb', metrics.ADX.b)

//-DI:
console.log('-DIa', metrics.DIminus.a)
console.log('-DIb', metrics.DIminus.b)

//+DI:
console.log('+DIa', metrics.DIplus.a)
console.log('+DIb', metrics.DIplus.b)

//RSI:
console.log('RSIa', metrics.RSI.a)
console.log('RSIb', metrics.RSI.b)

//SC
console.log('SC14a', metrics.SC.a)
console.log('SC14b', metrics.SC.b)

//SAR
//calculateSAR(high, low, close)
//{trend [], sar [], realSAR [], ep [], af []} //needs a lot of QC...TESTING
//test with 14 bars
console.log('SARa', metrics.SAR.a)
//test with 28 bars
console.log('SARb', metrics.SAR.b)

//MFI: money flow index - aka volume rsi
//NEEDS DEEP TESTING
//test with 14 bars
console.log('MFIa', metrics.MFI.a)
//test with 28 bars
console.log('MFIb', metrics.MFI.b)

//EOM:
console.log('EOMa', metrics.EOM.a)
console.log('EOMb', metrics.EOM.b)

//SUPPORT & RESISTANCE///////////////////////////////////////////

    //FPP: //Floor pivot points
    //{ S3, S2, S1, R1, R2, R3 }
    console.log('FPP', metrics.FPP)
    //TD: //Tom Denmark Pivot Points
    //{S, R}
    console.log('TD', metrics.TD)

    //CP: //Camarilla Points
    //{S3, S2, S1, R1, R2, R3}
    console.log('CP', metrics.CP)

    //FIB: //Fibonacci Retracements
    //{S6, S5, S4, S3, S2, S1, R1, R2, R3, R4, R5, R6}
    console.log('FIB', metrics.FIB)

///////////////////////////////////////////////////////////////

//T:
console.log('T', metrics.T)

// Example usage
 //let high = [50, 52, 53, 54, 55, 54, 53, 52, 51, 50];
 //let low = [48, 49, 50, 51, 52, 51, 50, 49, 48, 47];
 //let close = [49, 51, 52, 53, 54, 53, 52, 51, 50, 49];
 //let period = 14;



console.log(metrics)