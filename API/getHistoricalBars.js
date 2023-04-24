import connection from "./connection.js";

export default async function (symbol, options) { 
  
  return await getBars(symbol, options)
}

async function getBars(symbol, options) {
  let bars = [];
  let resp = connection.getBarsV2(symbol, options)
  for await (let bar of resp) { bars.push(bar) };
  return bars;
}

/*
[{
  Timestamp: '2023-04-17T04:00:00Z',
  OpenPrice: 165.09,
  HighPrice: 165.39,
  LowPrice: 164.03,
  ClosePrice: 165.23,
  Volume: 41531918,
  TradeCount: 484303,
  VWAP: 164.804537
}
{
  Timestamp: '2023-04-18T04:00:00Z',
  OpenPrice: 166.1,
  HighPrice: 167.41,
  LowPrice: 165.65,
  ClosePrice: 166.47,
  Volume: 49948656,
  TradeCount: 495451,
  VWAP: 166.353505
}]
*/







  





