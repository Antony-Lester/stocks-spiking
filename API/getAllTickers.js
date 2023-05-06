import connection from "./connection.js";

export default async function () {
  return await connection.getAssets({ status: 'active' }).then((rawTickers) => {
    let tickers = {}
    const exchanges = [...new Set([...rawTickers].map(ticker => ticker.exchange))]  
    exchanges.forEach(exchange => {tickers[exchange] = [...rawTickers]
      .filter(ticker =>
        ticker.exchange === exchange &&
        ticker.tradable === true &&
        ticker.marginable === true &&
        ticker.shortable === true &&
        ticker.easy_to_borrow === true &&
        ticker.fractionable === true)
      .reduce(function(result, item) {result[item.symbol] = { ...item }; return result;}, {})
    })
    for (const exchange in tickers) { 
      if (!Object.entries(tickers[exchange]).length) {delete tickers[exchange]}}
    return tickers
  })
}