import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
  
  // Register required elements for Chart.js
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  
  export function InvestmentByYear({ transactions, stockDetails }) {
    console.log('Transactions:', transactions);
    console.log('Stock Details:', stockDetails);
  
    // Helper to calculate returns based on stockDetails
    const calculateReturns = (transaction) => {
      const stockDetail = stockDetails.find((s) => s.stockId === transaction.stockId);
      if (!stockDetail || !stockDetail.result?.price?.regularMarketPrice) return 0;
  
      const currentPrice = stockDetail.result.price.regularMarketPrice;
      const investedAmount = transaction.quantity * transaction.purchasePrice;
      const currentValue = transaction.quantity * currentPrice;
  
      return currentValue - investedAmount; // Returns = Current Value - Invested Amount
    };
  
    // Aggregate investments and returns by year
    const investmentsAndReturnsByYear = transactions ? transactions.reduce((acc, transaction) => {
      const year = new Date(transaction.transactionDate).getFullYear();
      const returns = calculateReturns(transaction);
  
      if (!acc[year]) {
        acc[year] = { investment: 0, returns: 0 };
      }
  
      acc[year].investment += transaction.totalValue;
      acc[year].returns += returns;
  
      return acc;
    }, {}) : {};
  
    // Sort years and prepare data for the chart
    const years = Object.keys(investmentsAndReturnsByYear).sort((a, b) => a - b);
    const investments = years.map((year) => investmentsAndReturnsByYear[year].investment);
    const returns = years.map((year) => investmentsAndReturnsByYear[year].returns);
  
    // Prepare chart data
    const chartData = {
      labels: years,
      datasets: [
        {
          label: 'Amount Invested ($)',
          data: investments,
          backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue for investments
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Returns ($)',
          data: returns,
          backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red for returns
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    // Configure chart options
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Amount ($)',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Year',
          },
        },
      },
    };
  
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Investments and Returns by Year</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full flex justify-center items-center">
            <Bar data={chartData} options={options} />
          </div>
        </CardContent>
      </Card>
    );
  }
  