import getBars from "../API/getBars.js"


const tickers = ['TSLA', 'AMD', 'AAPL', 'NVDA', 'INTC', 'GOOGL', 'GOOG', 'MSFT', 'CSCO', 'CMCSA', 'WBD',
    
    'SIRI', 'MU', 'CSX', 'PYPL', 'MRVL', 'JD', 'PDD', 'KDP', 'ATVI', 'EXC', 'WBA', 'BKR', 'QCOM', 'NFLX',
    'AMAT', 'KHC', 'MDLZ', 'ABNB', 'SBUX', 'GILD', 'TMUS', 'EBAY', 'TXN', 'FTNT', 'MCHP', 'CRWD', 'ENPH',
    'AZN', 'PEP', 'ZM', 'PANW', 'CTSH', 'FISV', 'MRNA', 'ADI', 'FAST', 'PCAR', 'ADBE', 'HON', 'AEP',
    'XEL', 'MNST', 'ZS', 'FANG', 'DXCM', 'AMGN', 'EA', 'ROST', 'CSGP', 'AVGO', 'CEG', 'DLTR', 'CPRT',
    'NXPI', 'TEAM', 'PAYX', 'WDAY', 'ADP', 'MAR', 'COST', 'CDNS', 'LULU', 'ISRG', 'SGEN', 'INTU', 'GFS',
    'ADSK', 'ILMN', 'LRCX', 'VRTX', 'VRSK', 'CHTR', 'KLAC'] //AVE QUARTERLY VOL 1MILL+ https://www.finscreener.org/screener/most-active/stocks/nq100
const exchange = 'NASDAQ'


await getBars(exchange, tickers)


//automate with structure file, checking if object is empty