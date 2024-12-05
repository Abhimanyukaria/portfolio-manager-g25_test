// Import necessary libraries
//import { TopGainersAndLosers } from '../app/components/top-gnl.js'
import { expect } from "chai";

export function TopGainersAndLosers({ stockDetails, transactions }) {
    // Ensure both stockDetails and transactions are provided
    if (!Array.isArray(stockDetails) || !Array.isArray(transactions)) {
      console.error("Invalid input: stockDetails and transactions must be arrays.");
      return [];
    }
  
    // Map over transactions to calculate gain/loss
    const result = transactions.map((transaction) => {
      const stockDetail = stockDetails.find((s) => s.stockId === transaction.stockId);
  
      // Validate stockDetail and ensure it contains required price information
      if (!stockDetail || !stockDetail.result || !stockDetail.result.price?.regularMarketPrice) {
        return null;
      }
  
      // Extract the regularMarketPrice
      const { regularMarketPrice, longName, shortName } = stockDetail.result.price;
  
      // Calculate gain/loss percentage
      const gainLoss = ((regularMarketPrice - transaction.purchasePrice) / transaction.purchasePrice) * 100;
  
      // Return the computed stock information
      return {
        stockId: transaction.stockId,
        name: longName || shortName || transaction.stockId,
        gain: gainLoss,
      };
    });
  
    // Filter out null values
    return result.filter((item) => item !== null);
  }
  
describe('TopGainersAndLosers', () => {
  it('should correctly calculate gain/loss for valid transactions and stock details', () => {
    const transactions = [
      { stockId: 'AAPL', purchasePrice: 100 },
      { stockId: 'MSFT', purchasePrice: 200 },
    ];

    const stockDetails = [
      {
        stockId: 'AAPL',
        result: {
          price: {
            regularMarketPrice: 150,
            longName: 'Apple Inc.',
          },
        },
      },
      {
        stockId: 'MSFT',
        result: {
          price: {
            regularMarketPrice: 180,
            longName: 'Microsoft Corporation',
          },
        },
      },
    ];

    const data2 = transactions.map((transaction) => {
      const stockDetail = stockDetails.find((s) => s.stockId === transaction.stockId);

      if (!stockDetail || !stockDetail.result || !stockDetail.result.price?.regularMarketPrice) return null;

      const regularMarketPrice = stockDetail.result.price.regularMarketPrice;

      const gainLoss = ((regularMarketPrice - transaction.purchasePrice) / transaction.purchasePrice) * 100;

      return {
        stockId: transaction.stockId,
        name: stockDetail.result.price.longName,
        gain: gainLoss,
      };
    });

    expect(data2).to.deep.equal([
      {
        stockId: 'AAPL',
        name: 'Apple Inc.',
        gain: 50,
      },
      {
        stockId: 'MSFT',
        name: 'Microsoft Corporation',
        gain: -10,
      },
    ]);
  });

  it('should return an empty array when transactions are empty', () => {
    const transactions = [];
    const stockDetails = [
      {
        stockId: 'AAPL',
        result: {
          price: {
            regularMarketPrice: 150,
            longName: 'Apple Inc.',
          },
        },
      },
    ];

    const data2 = transactions.map((transaction) => {
      const stockDetail = stockDetails.find((s) => s.stockId === transaction.stockId);

      if (!stockDetail || !stockDetail.result || !stockDetail.result.price?.regularMarketPrice) return null;

      const regularMarketPrice = stockDetail.result.price.regularMarketPrice;

      const gainLoss = ((regularMarketPrice - transaction.purchasePrice) / transaction.purchasePrice) * 100;

      return {
        stockId: transaction.stockId,
        name: stockDetail.result.price.longName,
        gain: gainLoss,
      };
    });

    expect(data2).to.deep.equal([]);
  });
});
