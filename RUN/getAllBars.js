import getHistoricalBars from "../API/getHistoricalBars";

import dotenv from 'dotenv';
dotenv.config({ path: `./.env.${process.env.NODE_ENV? process.env.NODE_ENV: 'development'}` })

export default function (symbol = "AAPL", timeframe = "1Day", start = new Date(new Date.setFullYear(date.getFullYear() - 10))) { 
    const end = new Date();
    if (process.env.USER_SUBSCRIBED === 'true') {end.setMinutes(end.getMinutes() - 16)}
    const options = {start, end, timeframe, limit: 10000};
    getHistoricalBars(symbol,options)
}


  
/*
Path Parameters

timeframe   string
One of minute, 1Min, 5Min, 15Min, day or 1D. minute is an alias of 1Min. Similarly, day is of 1D.

symbols stringRequired
One or more (max 200) symbol names split by commas (",").

limit   integer
The maximum number of bars to be returned for each symbol. It can be between 1 and 1000. Default is 100 if parameter is unspecified or 0.

start   timestamp (ISO Format, ex: '2019-04-15T09:30:00-04:00')
Filter bars equal to or after this time. Cannot be used with after.

end timestamp (ISO Format, ex: '2019-04-15T09:30:00-04:00')
Filter bars equal to or before this time. Cannot be used with until.

*/




