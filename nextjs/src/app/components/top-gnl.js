import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function TopGainersAndLosers({ stockDetails, transactions }) {
  // console.log('Transactions and Stock Details:', transactions, stockDetails);

  const data2 = transactions ? transactions.map((transaction) => {
    const stockDetail = stockDetails.find((s) => s.stockId === transaction.stockId);

    // Check if stockDetail and the required price information are available
    if (!stockDetail || !stockDetail.result || !stockDetail.result.price?.regularMarketPrice) return null;

    // Extract the regularMarketPrice
    const regularMarketPrice = stockDetail.result.price.regularMarketPrice;

    // Calculate gain/loss percentage
    const gainLoss = ((regularMarketPrice - transaction.purchasePrice) / transaction.purchasePrice) * 100;

    return {
      stockId: transaction.stockId,
      name: stockDetail.result.price.longName || stockDetail.result.price.shortName || transaction.stockId,
      gain: gainLoss,
    };
  }): [];

  // Filter out null or undefined entries and sort by gain/loss
  const data = data2.filter(Boolean).sort((a, b) => b.gain - a.gain);

  // console.log(data, data2);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Your Gainers and Losers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-1">
          {data.map((item, index) => (
            <div
              key={index}
              className={`rounded p-2 ${
                item.gain >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}
            >
              <div className="font-semibold">
                {item.name} ({item.stockId})
              </div>
              <div>
                {item.gain >= 0 ? '+' : ''}
                {item.gain.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
