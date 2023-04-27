import connection from "./connection.js";

export default async function () {
  return await connection.getAssets({ status: 'active' }).then((rawTickers) => {
    const tickers = {}
    const exchanges = [...new Set([...rawTickers].map(ticker => ticker.exchange))]  
    return exchanges.forEach(exchange => {tickers[exchange] = [...rawTickers]
      .filter(ticker =>
        ticker.exchange === exchange &&
        ticker.tradable === true &&
        ticker.marginable === true &&
        ticker.shortable === true &&
        ticker.easy_to_borrow === true &&
        ticker.fractionable === true)
      .reduce(function(result, item) {result[item.symbol] = { ...item }; return result;}, {})
      })})}

/*
    SILV: {
      id: 'c86d4aea-b196-4ac3-bb4f-75e09872745d',
      class: 'us_equity',
      exchange: 'AMEX',
      symbol: 'SILV',
      name: 'SilverCrest Metals Inc. Common Shares',
      status: 'active',
      tradable: true,
      marginable: true,
      maintenance_margin_requirement: 30,
      shortable: true,
      easy_to_borrow: true,
      fractionable: true
    },
    FSI: {
      id: 'b9e17620-4841-4574-a755-9ab82c6ec0b2',
      class: 'us_equity',
      exchange: 'AMEX',
      symbol: 'FSI',
      name: 'Flexible Solutions International, Inc.',
      status: 'active',
      tradable: true,
      marginable: true,
      maintenance_margin_requirement: 30,
      shortable: true,
      easy_to_borrow: true,
      fractionable: false
    }
*/