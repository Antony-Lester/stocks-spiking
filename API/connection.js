import Alpaca from "@alpacahq/alpaca-trade-api"

import dotenv from 'dotenv';
dotenv.config({ path: `./.env.${process.env.NODE_ENV? process.env.NODE_ENV: 'development'}` })

export default new Alpaca(
    {
        keyId: process.env.API_KEY,
        secretKey: process.env.API_SECRET_KEY,
        paper: process.env.NODE_ENV !== 'production',
    }
);
  
