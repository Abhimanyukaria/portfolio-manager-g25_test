import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function POST(req, res) {
    // Parse the request body
    const body = await req.json();
    console.log(body);

    const stockIds = body.stockIds;

    if (!stockIds || !Array.isArray(stockIds)) {
        return NextResponse.json({ error: 'Invalid stockIds array' }, { status: 400 });
    }

    try {
        const stockDetails = [];

        // Fetch details for each stockId using yahoo-finance2
        for (const stockId of stockIds) {
            try {
                // Fetch stock details for the current stockId
                const result = await yahooFinance.quoteSummary(stockId, { modules: ['price', 'summaryDetail','summaryProfile'] });
                stockDetails.push({
                    stockId,
                    result
                });
            } catch (innerError) {
                console.error(`Error fetching data for stockId: ${stockId}`, innerError);
                stockDetails.push({ stockId, error: 'Failed to fetch data' });
            }
        }

        return NextResponse.json({ stockDetails });
    } catch (error) {
        console.error('Error fetching stock details:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
