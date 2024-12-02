// pages/api/tsla-data.js
// import Stocks from 'stocks.js'; // Replace with your own
import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';



// var stocks = new Stocks(process.env.STOCKS_KEY); // Replace with your own

export async function POST(req, res) {

    // console.log('hi');

    try{
    const body2 = await req.json();
    // console.log(body2);

    const stockId = body2.stockId;
    const period1 = body2.period1;
    const period2 = body2.period2;
  
    
        // console.log(stockId);
    const result = await yahooFinance.chart(stockId, { period1, period2 });


    // console.log('data from api',result);

    // console.log('bye');
    return NextResponse.json(result);
    }
    catch(err){

        return NextResponse.json(err);
    }
  
}
