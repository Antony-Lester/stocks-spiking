import Alpaca from "@alpacahq/alpaca-trade-api"

import { API_KEY, API_SECRET, PAPER } from "../secrets.js";

export default new Alpaca(
    {
        keyId: API_KEY,
        secretKey: API_SECRET,
        paper: PAPER,
    }
);
  
