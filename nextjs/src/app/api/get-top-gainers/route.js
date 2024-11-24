import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET(req, res) {
    try {
        // Fetch the daily gainers data
        const result = await yahooFinance.dailyGainers({ count: 4 });

        // Extract relevant data for each stock
        const gainers = result.quotes.map(stock => ({
            name: stock.displayName,
            stockId: stock.symbol,
            gain: stock.regularMarketChangePercent
        }));

        console.log('Extracted gainers:', gainers);

        // Return the array of objects
        return NextResponse.json(gainers);
    } catch (err) {
        console.error('Error fetching daily gainers:', err);
        return NextResponse.json({ error: 'Failed to fetch daily gainers' }, { status: 500 });
    }
}
