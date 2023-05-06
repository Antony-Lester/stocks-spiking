const TESTING = true //simulated trades only
export const USER_SUBSCRIBED = false //paying for data feed 
export const API_ENDPOINT = TESTING ? "https://paper-api.alpaca.markets" : "https://api.alpaca.markets"
export const API_KEY = TESTING ? "<your testing key>" : "<your live key>"
export const API_SECRET = TESTING ? "<your secret testing key>" : "<your live secret key>"
export const PAPER = TESTING 
export const HDD1 = '<----->'   //root -> raw data save path
export const HDD2 = '<----->'  //processed data save path
export const HDD3 = '<----->'  //results data save path

'https://alpaca.markets/docs/market-data/'