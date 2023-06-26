import path from 'path'
import * as fs from 'node:fs'
import calculateADX from '../METRICS/calculateADX.js'
import calculateDIminus from '../METRICS/calculateDI-.js'
import calculateDIplus from '../METRICS/calculateDI+.js'
import calculateRSI from '../METRICS/calculateRSI.js'
import calculateSC from '../METRICS/calculateSC.js'
import calculateSAR from '../METRICS/calculateSAR.js'
import calculateMFI from '../METRICS/calculateMFI.js'
import calculateEOM from '../METRICS/calculateEOM.js'
import calculateFPP from '../METRICS/calculateFPP.js'
import calculateTD from '../METRICS/calculateTD.js'
import calculateCP from '../METRICS/calculateCP.js'
import calculateT from '../METRICS/calculateT.js'

import { TIMEFRAMES, RAW_DATA } from '../DATA/_locations.js'
import getFiles from '../DATA/getFiles.js'

const metricsStats = {
    ADX: {
        a: {min: 1, max: 0.0},
        b: {min: 1, max: 0.0}
    },
    DIminus: {
        a: {min: 1, max: 0.0},
        b: {min: 1, max: 0.0}
    },
    DIplus: {
        a: {min: 1, max: 0.0},
        b: {min: 1, max: 0.0},
    },
    RSI: {
        a: {min: 1, max: 0.0},
        b: {min: 1, max: 0.0}
    },
    SC: {
        a: {min: 1, max: 0.0},
        b: {min: 1, max: 0.0}
    },
    SAR: {
        a: {min: 1, max: 0.0},
        b: {min: 1, max: 0.0}
    },
    MFI: {
        a: {min: 1, max: 0.0},
        b: {min: 1, max: 0.0}
    },
    EOM: {
        a: {min: 1, max: 0.0},
        b: {min: 1, max: 0.0}
    },
    FPP: {
        S3: {min: 1, max: 0.0},
        S2: {min: 1, max: 0.0},
        S1: {min: 1, max: 0.0},
        R1: {min: 1, max: 0.0},
        R2: {min: 1, max: 0.0},
        R3: {min: 1, max: 0.0}
      },
      TD: { R: {min: 1, max: 0.0}, S: {min: 1, max: 0.0} },
      CP: {
        S3: {min: 1, max: 0.0},
        S2: {min: 1, max: 0.0},
        S1: {min: 1, max: 0.0},
        R1: {min: 1, max: 0.0},
        R2: {min: 1, max: 0.0},
        R3: {min: 1, max: 0.0}
      },
      T: {min: 1, max: 0.0}
}

export default function (processList) {
    processList.forEach(([exchange, ticker]) => {
        TIMEFRAMES.map(async (timeframe, i) => {
              
        const filenames = await getFiles(path.join(RAW_DATA, exchange, ticker, 'timeframe', timeframe))
        filenames.map((filename, index, array) => { 
            
            const files = array.slice(index - 27, index + 1)
            
            const result = files.map((file) => {
                const data = JSON.parse(fs.readFileSync(path.join(RAW_DATA, exchange, ticker, 'timeframe', timeframe, file), 'utf8'))
                return data.hasOwnProperty('data') ? data.data : data
            })

            if (result.length == 28) {
                const high28 = result.map(data => data.high)
                const low28 = result.map(data => data.low)
                const close28 = result.map(data => data.close)
                const volume28 = result.map(data => data.vol)
                const open28 = result.map(data => data.open)
                const timeStamp = new Date(filename.slice(0, filename.length - 5))
                if (
                    !high28.some(isNaN) &&
                    !low28.some(isNaN) &&
                    !close28.some(isNaN) &&
                    !volume28.some(isNaN) &&
                    !open28.some(isNaN)
                ) {
                    const high14 = high28.slice(Math.max(high28.length - 14, 0))
                    const low14 = low28.slice(Math.max(low28.length - 14, 0))
                    const close14 = close28.slice(Math.max(close28.length - 14, 0))
                    const volume14 = volume28.slice(Math.max(volume28.length - 14, 0))

                    const [high] = high28.slice(-1)
                    const [low] = low28.slice(-1)
                    const [close] = close28.slice(-1)
                    const [open] = open28.slice(-1)
                
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
                        T: calculateT(timeStamp),
                    }
                
                    //checks...
                    //ADX: {
                    //    a: calculateADX(high14, low14, close14, 14),
                    metricsStats.ADX.a.min =
                        metrics.ADX.a < metricsStats.ADX.a.min ? metrics.ADX.a : metricsStats.ADX.a.min
                    metricsStats.ADX.a.max =
                        metrics.ADX.a > metricsStats.ADX.a.max ? metrics.ADX.a : metricsStats.ADX.a.max
                    //    b: calculateADX(high28, low28, close28, 28)
                    metricsStats.ADX.b.min =
                        metrics.ADX.b < metricsStats.ADX.b.min ? metrics.ADX.b : metricsStats.ADX.b.min
                    metricsStats.ADX.b.max =
                        metrics.ADX.b > metricsStats.ADX.b.max ? metrics.ADX.b : metricsStats.ADX.b.max
                    //DIminus: {
                    //    a: calculateDIminus(high14, low14, close14, 14),
                    metricsStats.DIminus.a.min =
                        metrics.DIminus.a < metricsStats.DIminus.a.min ? metrics.DIminus.a : metricsStats.DIminus.a.min
                    metricsStats.DIminus.a.max =
                        metrics.DIminus.a > metricsStats.DIminus.a.max ? metrics.DIminus.a : metricsStats.DIminus.a.max
                    //    b: calculateDIminus(high28, low28, close28, 28)
                    metricsStats.DIminus.b.min =
                        metrics.DIminus.b < metricsStats.DIminus.b.min ? metrics.DIminus.b : metricsStats.DIminus.b.min
                    metricsStats.DIminus.b.max =
                        metrics.DIminus.b > metricsStats.DIminus.b.max ? metrics.DIminus.b : metricsStats.DIminus.b.max
                    //DIplus: {
                    //    a: calculateDIplus(high14, low14, close14, 14),
                    metricsStats.DIplus.a.min =
                        metrics.DIplus.a < metricsStats.DIplus.a.min ? metrics.DIplus.a : metricsStats.DIplus.a.min
                    metricsStats.DIplus.a.max =
                        metrics.DIplus.a > metricsStats.DIplus.a.max ? metrics.DIplus.a : metricsStats.DIplus.a.max
                    //    b: calculateDIplus(high28, low28, close28, 28),
                    metricsStats.DIplus.b.min =
                        metrics.DIplus.b < metricsStats.DIplus.b.min ? metrics.DIplus.b : metricsStats.DIplus.b.min
                    metricsStats.DIplus.b.max =
                        metrics.DIplus.b > metricsStats.DIplus.b.max ? metrics.DIplus.b : metricsStats.DIplus.b.max
                    //RSI: {
                    //    a: calculateRSI(close14),
                    metricsStats.RSI.a.min =
                        metrics.RSI.a < metricsStats.RSI.a.min ? metrics.RSI.a : metricsStats.RSI.a.min
                    metricsStats.RSI.a.max =
                        metrics.RSI.a > metricsStats.RSI.a.max ? metrics.RSI.a : metricsStats.RSI.a.max
                    //    b: calculateRSI(close28)
                    metricsStats.RSI.b.min =
                        metrics.RSI.b < metricsStats.RSI.b.min ? metrics.RSI.b : metricsStats.RSI.b.min
                    metricsStats.RSI.b.max =
                        metrics.RSI.b > metricsStats.RSI.b.max ? metrics.RSI.b : metricsStats.RSI.b.max
                    //SC: {
                    //    a: calculateSC(close14),
                    metricsStats.SC.a.min =
                        metrics.SC.a < metricsStats.SC.a.min ? metrics.SC.a : metricsStats.SC.a.min
                    metricsStats.SC.a.max =
                        metrics.SC.a > metricsStats.SC.a.max ? metrics.SC.a : metricsStats.SC.a.max
                    //    b: calculateSC(close28)
                    metricsStats.SC.b.min =
                        metrics.SC.b < metricsStats.SC.b.min ? metrics.SC.b : metricsStats.SC.b.min
                    metricsStats.SC.b.max =
                        metrics.SC.b > metricsStats.SC.b.max ? metrics.SC.b : metricsStats.SC.b.max
                    //SAR: {
                    //    a: calculateSAR(high14, low14, close14),
                    metricsStats.SAR.a.min =
                        metrics.SAR.a < metricsStats.SAR.a.min ? metrics.SAR.a : metricsStats.SAR.a.min
                    metricsStats.SAR.a.max =
                        metrics.SAR.a > metricsStats.SAR.a.max ? metrics.SAR.a : metricsStats.SAR.a.max
                    //    b: calculateSAR(high28, low28, close28)
                    metricsStats.SAR.b.min =
                        metrics.SAR.b < metricsStats.SAR.b.min ? metrics.SAR.b : metricsStats.SAR.b.min
                    metricsStats.SAR.b.max =
                        metrics.SAR.b > metricsStats.SAR.b.max ? metrics.SAR.b : metricsStats.SAR.b.max
                    //MFI: {
                    //    a: calculateMFI(high14, low14, close14, volume14, 14),
                    metricsStats.MFI.a.min =
                        metrics.MFI.a < metricsStats.MFI.a.min ? metrics.MFI.a : metricsStats.MFI.a.min
                    metricsStats.MFI.a.max =
                        metrics.MFI.a > metricsStats.MFI.a.max ? metrics.MFI.a : metricsStats.MFI.a.max
                    //    b: calculateMFI(high28, low28, close28, volume28, 28)
                    metricsStats.MFI.b.min =
                        metrics.MFI.b < metricsStats.MFI.b.min ? metrics.MFI.b : metricsStats.MFI.b.min
                    metricsStats.MFI.b.max =
                        metrics.MFI.b > metricsStats.MFI.b.max ? metrics.MFI.b : metricsStats.MFI.b.max
                    //EOM: {
                    //    a: calculateEOM(high14, low14, volume14),
                    metricsStats.EOM.a.min =
                        metrics.EOM.a < metricsStats.EOM.a.min ? metrics.EOM.a : metricsStats.EOM.a.min
                    metricsStats.EOM.a.max =
                        metrics.EOM.a > metricsStats.EOM.a.max ? metrics.EOM.a : metricsStats.EOM.a.max
                    //    b: calculateEOM(high28, low28, volume28)
                    metricsStats.EOM.b.min =
                        metrics.EOM.b < metricsStats.EOM.b.min ? metrics.EOM.b : metricsStats.EOM.b.min
                    metricsStats.EOM.b.max =
                        metrics.EOM.b > metricsStats.EOM.b.max ? metrics.EOM.b : metricsStats.EOM.b.max
                    //FPP: calculateFPP(high, low, close),
                    //S3: '0.000',
                    metricsStats.FPP.S3.min =
                        metrics.FPP.S3 < metricsStats.FPP.S3.min ? metrics.FPP.S3 : metricsStats.FPP.S3.min
                    metricsStats.FPP.S3.max =
                        metrics.FPP.S3 > metricsStats.FPP.S3.max ? metrics.FPP.S3 : metricsStats.FPP.S3.max
                    //S2: '0.000',
                    metricsStats.FPP.S2.min =
                        metrics.FPP.S2 < metricsStats.FPP.S2.min ? metrics.FPP.S2 : metricsStats.FPP.S2.min
                    metricsStats.FPP.S2.max =
                        metrics.FPP.S2 > metricsStats.FPP.S2.max ? metrics.FPP.S2 : metricsStats.FPP.S2.max
                    //S1: '0.000',
                    metricsStats.FPP.S1.min =
                        metrics.FPP.S1 < metricsStats.FPP.S1.min ? metrics.FPP.S1 : metricsStats.FPP.S1.min
                    metricsStats.FPP.S1.max =
                        metrics.FPP.S1 > metricsStats.FPP.S1.max ? metrics.FPP.S1 : metricsStats.FPP.S1.max
                    //R1: '0.000',
                    metricsStats.FPP.R1.min =
                        metrics.FPP.R1 < metricsStats.FPP.R1.min ? metrics.FPP.R1 : metricsStats.FPP.R1.min
                    metricsStats.FPP.R1.max =
                        metrics.FPP.R1 > metricsStats.FPP.R1.max ? metrics.FPP.R1 : metricsStats.FPP.R1.max
                    //R2: '0.000',
                    metricsStats.FPP.R2.min =
                        metrics.FPP.R2 < metricsStats.FPP.R2.min ? metrics.FPP.R2 : metricsStats.FPP.R2.min
                    metricsStats.FPP.R2.max =
                        metrics.FPP.R2 > metricsStats.FPP.R2.max ? metrics.FPP.R2 : metricsStats.FPP.R2.max
                    //R3: '0.000'
                    metricsStats.FPP.R3.min =
                        metrics.FPP.R3 < metricsStats.FPP.R3.min ? metrics.FPP.R3 : metricsStats.FPP.R3.min
                    metricsStats.FPP.R3.max =
                        metrics.FPP.R3 > metricsStats.FPP.R3.max ? metrics.FPP.R3 : metricsStats.FPP.R3.max
                    //TD: calculateTD(high, low, close, open),
                    //R
                    metricsStats.TD.R.min =
                        metrics.TD.R < metricsStats.TD.R.min ? metrics.TD.R : metricsStats.TD.R.min
                    metricsStats.TD.R.max =
                        metrics.TD.R > metricsStats.TD.R.max ? metrics.TD.R : metricsStats.TD.R.max
                    //S
                    metricsStats.TD.S.min =
                        metrics.TD.S < metricsStats.TD.S.min ? metrics.TD.S : metricsStats.TD.S.min
                    metricsStats.TD.S.max =
                        metrics.TD.S > metricsStats.TD.S.max ? metrics.TD.S : metricsStats.TD.S.max
                    //CP: calculateCP(high, low, close),
                    //S3: '0.000',
                    metricsStats.CP.S3.min =
                        metrics.CP.S3 < metricsStats.CP.S3.min ? metrics.CP.S3 : metricsStats.CP.S3.min
                    metricsStats.CP.S3.max =
                        metrics.CP.S3 > metricsStats.CP.S3.max ? metrics.CP.S3 : metricsStats.CP.S3.max
                    //S2: '0.000',
                    metricsStats.CP.S2.min =
                        metrics.CP.S2 < metricsStats.CP.S2.min ? metrics.CP.S2 : metricsStats.CP.S2.min
                    metricsStats.CP.S2.max =
                        metrics.CP.S2 > metricsStats.CP.S2.max ? metrics.CP.S2 : metricsStats.CP.S2.max
                    //S1: '0.000',
                    metricsStats.CP.S1.min =
                        metrics.CP.S1 < metricsStats.CP.S1.min ? metrics.CP.S1 : metricsStats.CP.S1.min
                    metricsStats.CP.S1.max =
                        metrics.CP.S1 > metricsStats.CP.S1.max ? metrics.CP.S1 : metricsStats.CP.S1.max
                    //R1: '0.000',
                    metricsStats.CP.R1.min =
                        metrics.CP.R1 < metricsStats.CP.R1.min ? metrics.CP.R1 : metricsStats.CP.R1.min
                    metricsStats.CP.R1.max =
                        metrics.CP.R1 > metricsStats.CP.R1.max ? metrics.CP.R1 : metricsStats.CP.R1.max
                    //R2: '0.000',
                    metricsStats.CP.R2.min =
                        metrics.CP.R2 < metricsStats.CP.R2.min ? metrics.CP.R2 : metricsStats.CP.R2.min
                    metricsStats.CP.R2.max =
                        metrics.CP.R2 > metricsStats.CP.R2.max ? metrics.CP.R2 : metricsStats.CP.R2.max
                    //R3: '0.000'
                    metricsStats.CP.R3.min =
                        metrics.CP.R3 < metricsStats.CP.R3.min ? metrics.CP.R3 : metricsStats.CP.R3.min
                    metricsStats.CP.R3.max =
                        metrics.CP.R3 > metricsStats.CP.R3.max ? metrics.CP.R3 : metricsStats.CP.R3.max
                    //T: calculateT(timeStamp),
                    metricsStats.T.min =
                        metrics.T < metricsStats.T.min ? metrics.T : metricsStats.T.min
                    metricsStats.T.max =
                        metrics.T > metricsStats.T.max ? metrics.T : metricsStats.T.max
                    
                    console.clear()
                    console.log(metricsStats)
                }
            } 
        })
        })
    })  
}

/*
  SAR: { a: { min: -0.065, max: 0.065 }, b: { min: -0.135, max: 0.135 } },
  MFI: { a: { min: -936.8924, max: 99.99 }, b: { min: 1, max: 99.99 } },
  EOM: {
    a: { min: -0.49821, max: 0.05238 },
    b: { min: -0.24936, max: 0.02633 }
*/