// pages/api/tsla-data.js
// import Stocks from 'stocks.js'; // Replace with your own
import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';



// var stocks = new Stocks(process.env.STOCKS_KEY); // Replace with your own

export async function GET(req, res) {

    console.log('hi');
  
    // var result = await stocks.timeSeries({
    //   symbol: 'TSLA',
    //   interval: 'weekly',
    //   amount: 10,
    // });

    const result = await yahooFinance.historical('AAPL', { period1: '2020-01-01', period2: '2021-01-01' });


    console.log('data from api',result);

    console.log('bye');
    return NextResponse.json(result);
  
}
