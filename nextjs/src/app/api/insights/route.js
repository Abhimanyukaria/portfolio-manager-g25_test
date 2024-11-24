import yahooFinance from 'yahoo-finance2';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { stockId } = body;

    if (!stockId) {
      return NextResponse.json({ error: 'StockId is required in the request body' }, { status: 400 });
    }

    // Define the query options
    const queryOptions = {
      lang: 'en-US',
      reportsCount: 5,
      region: 'US',
    };

    // Fetch insights data from Yahoo Finance
    const insightsData = await yahooFinance.insights(stockId, queryOptions);

    // Return the fetched data as a JSON response
    return NextResponse.json(insightsData, { status: 200 });
  } catch (error) {
    console.error('Error fetching insights data:', error);
    return NextResponse.json({ error: 'Error fetching insights data' }, { status: 500 });
  }
}
