import connection from "./connection.js";
import makeJSON from "../DATA/makeJSON.js";
import { RAW_DATA } from "../DATA/_locations.js";
import { USER_SUBSCRIBED } from "../secrets.js";
import { RAW } from "../DATA/checkHardDrive.js";
import moment from "moment";

const getStartDateByWeekAndYear = function(week, year, month) {
  return moment({y: year, M: month, d: 1}).add(week-1, 'w').day("Sunday").toDate()}
const getEndDateByWeekAndYear = function(week, year, month) {
  return moment({y: year, M: month, d: 1, }).add(week-1, 'w').day("Saturday").toDate()}
function getFirstDayOfMonth(year, month) {return new Date(year, month, 0)}
function getLastDayOfMonth(year, month) {return new Date(year, month, 0)}

export default function (toDownload) {
  const APIcalls = []
  for (const [exchange, ticker] of toDownload) {
    let exchangeFormatted = RAW_DATA + '/' + exchange + '/'
    const years = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]
    for (const year of years) {
      for (let i = 1; i < 53; i++) {
        const start = getStartDateByWeekAndYear(i, year, 0)
        const end = getEndDateByWeekAndYear(i, year, 0)
        APIcalls.push([exchangeFormatted, ticker, '1Min', start, end])
      }
      for (let i = 1; i < 53; i += 2) {
        const start = getStartDateByWeekAndYear(i, year, 0)
        const end = getEndDateByWeekAndYear(i + 1, year, 0)
        APIcalls.push([exchangeFormatted, ticker, '5Min', start, end])
      }
      const m1start = getFirstDayOfMonth(year, 0);
      const m1end = getLastDayOfMonth(year, 6);
      APIcalls.push([exchangeFormatted, ticker, '30Min', m1start, m1end])
      const m2start = getFirstDayOfMonth(year, 6);
      const m2end = getLastDayOfMonth(year, 12);
      APIcalls.push([exchangeFormatted, ticker, '30Min', m2start, m2end])
      let start = new Date(year, 0, 1);
      let end = new Date(year, 11, 31); !USER_SUBSCRIBED && year === new Date().getFullYear() ?
        end.setMinutes(end.getMinutes() - 30) : null
      APIcalls.push([exchangeFormatted, ticker, '2Hour', start, end])
      APIcalls.push([exchangeFormatted, ticker, '1Day', start, end])
    }
  }
  APIcalls.sort() 
  let rateLimit = setInterval(async function () {
    if (RAW()) {
      const [exchangePath, ticker, timeframe, start, end] = APIcalls.shift()
      if (APIcalls.length === 0) { clearInterval(rateLimit); console.log(exchange, ticker, 'Raw Data Download Completed') }
      const results = await requestBars(ticker, timeframe, start, end)
      for (let result of results) {
        const path = exchangePath + ticker + '/timeframe/' + timeframe
        makeJSON(path, Object.keys(result)[0], result[Object.keys(result)[0]])
      }
    }
    }, 7500)

    async function requestBars(symbol, timeframe, start, end) {
      console.log(symbol, timeframe, start, end)
      const options = { start, end, timeframe, limit: 10000 }
      let bars = [];
      try {
        let resp = connection.getBarsV2(symbol, options)
        for await (let bar of resp) { bars.push(bar) };
        return bars.map((bar) => {
          return {
            [bar.Timestamp]: {
              open: bar.OpenPrice,
              close: bar.ClosePrice,
              high: bar.HighPrice,
              low: bar.LowPrice,
              vol: bar.Volume,
              vwap: bar.VWAP,
              tradeCount: bar.TradeCount
            }
          }
        })
      } catch {
        try {
          let resp = connection.getBarsV2(symbol, options)
          for await (let bar of resp) { bars.push(bar) };
          return bars.map((bar) => {
            return {
              [bar.Timestamp]: {
                open: bar.OpenPrice,
                close: bar.ClosePrice,
                high: bar.HighPrice,
                low: bar.LowPrice,
                vol: bar.Volume,
                vwap: bar.VWAP,
                tradeCount: bar.TradeCount
              }
            }
          })
        } catch { console.log('getBars CATCH TRIGGERED', symbol, timeframe, start, end, resp); return [] }
      }
    }
}
