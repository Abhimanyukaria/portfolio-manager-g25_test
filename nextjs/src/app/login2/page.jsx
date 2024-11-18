// 'use client'

import yahooFinance from 'yahoo-finance2';

import Stocks from 'stocks.js'; // Replace with your own

var stocks = new Stocks(process.env.STOCKS_KEY); // Replace with your own

var myres;

async function request () {
    var result = await stocks.timeSeries({
      symbol: 'TSLA',
      interval: 'monthly',
      amount:5
     });
  
     myres= JSON.stringify(result);
     console.log(result);
  }


export default async function Page(){

    // const results = await yahooFinance.search('AAPL');

    // const results2 = await yahooFinance.search('AAPL', { someOption: true, etc });

    // const quote = await yahooFinance.quote('AAPL');
    // const { regularMarketPrice, currency } = quote;

    request();

    // console.log(quote);

    console.log(myres);

    return (
        <div>
            <h1>Page</h1>

            {/* {results} */}
            <div className='text-black'>

            {myres}
            </div>
            
        </div>
    )
}