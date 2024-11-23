'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { HeaderJs } from "../components/header";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { InvestmentFormJsx } from "../components/transactionForm";
import axios from "axios";
import MyChart from "../components/MyChart";
import AllocationCard from "../components/allocation-chart";

const sectors = ["Tech", "Petroleum", "Finance", "Healthcare", "Defense", "Retail"];


 

const DashboardJs = () => {


    const [transactions, setTransactions] = useState([]);
    const [currentStock, setCurrentStock] = useState('AAPL');
    const [currentDate, setCurrentDate] = useState('2021-01-01');
    const [totalValue, setTotalValue] = useState(0);
    const [investedAmount, setInvestedAmount] = useState(0);
    const [oneDayChange, setOneDayChange] = useState(0);
    const [allTimeReturns, setAllTimeReturns] = useState(0);
    const [stockDetails, setStockDetails] = useState([]);


    const [sectorAllocations,setSectorAllocations] = useState([]);


    useEffect(() => {
        if (transactions.length === 0) return;

        const fetchStockPrices = async () => {
            try {
                const stockIds = transactions.map(t => t.stockId);

                // Fetch current stock prices
                const response = await fetch('/api/all-stock-details', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ stockIds }),
                });
                const data = await response.json();
                console.log("Fetched stock details:", data.stockDetails);

                // Calculate portfolio values
                let totalCurrentValue = 0;
                let totalInvested = 0;
                let totalDayChange = 0;

                transactions.forEach(transaction => {
                    const stockDetail = data.stockDetails.find(s => s.stockId === transaction.stockId);
                    if (stockDetail) {
                        const currentPrice = stockDetail.result.price.regularMarketPrice;
                        const previousClose = stockDetail.result.price.regularMarketPreviousClose;

                        totalCurrentValue += transaction.quantity * currentPrice;
                        totalInvested += transaction.quantity * transaction.purchasePrice;

                        // Calculate 1-day change for each stock
                        totalDayChange += transaction.quantity * (currentPrice - previousClose);
                    }
                });

                setTotalValue(totalCurrentValue);
                setInvestedAmount(totalInvested);
                setOneDayChange(totalDayChange);
                setAllTimeReturns(totalCurrentValue - totalInvested);
                setStockDetails(data.stockDetails);
                
            } catch (error) {
                console.error("Error fetching stock prices:", error);
            }
        };

        fetchStockPrices();
    }, [transactions]);


   

    useEffect(() => {
        fetch('/api/getPortfolio')
          .then((res) => res.json())
          .then((data) => {
            console.log("fetched data",data)

            setTransactions(data.transactions)
           
          })
          .catch((error) => {
            console.log(error);
          })
      }, [])


      
      function AllStocks() {
        if (!transactions || transactions.length === 0) {
            return <div></div>;
        }
        return transactions.map((transaction) => (
            <TabsTrigger
                key={transaction.stockId}
                value={transaction.stockId}
                onClick={() => {
                    setCurrentStock(transaction.stockId)
                    setCurrentDate(transaction.transactionDate)
                }}
            >
                {transaction.stockId}
            </TabsTrigger>
        ))
    }
    
    return (
        (
        

        <div>

        <HeaderJs/>
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">My Portfolio</h1>
                <div className="flex gap-2">
                    

                        <InvestmentFormJsx/>
                    
                </div>
            </div>

            <div className="mb-8 flex items-center justify-between rounded-lg bg-white p-4 shadow">
    <div>
        <div className="text-sm text-gray-500">CURRENT VALUE</div>
        <div className="text-2xl font-bold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        <div className="text-sm text-gray-500">Invested: ${investedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
    </div>
    <div>
        <div className="text-sm text-gray-500">1 DAY</div>
        <div
            className={`text-xl font-bold ${
                oneDayChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
        >
            ${oneDayChange.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className={text-sm ${oneDayChange >= 0 ? "text-green-500" : "text-red-500"}}>
            {((oneDayChange / totalValue) * 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
        </div>
    </div>
    <div>
        <div className="text-sm text-gray-500">ALL TIME RETURNS</div>
        <div
            className={`text-xl font-bold ${
                allTimeReturns >= 0 ? "text-green-500" : "text-red-500"
            }`}
        >
            ${allTimeReturns.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className={text-sm ${allTimeReturns >= 0 ? "text-green-500" : "text-red-500"}}>
            {((allTimeReturns / investedAmount) * 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}% p.a.
        </div>
    </div>
</div>

        
        <Tabs defaultValue="dashboard" className="mb-8">
            <TabsList className="overflow-auto flex-wrap flex">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <AllStocks/>
            </TabsList>
        </Tabs> 

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Performance</CardTitle>
            </CardHeader>
            <MyChart stockId={currentStock} startDate={currentDate} />
        </Card>

       <AllocationCard stockDetails={stockDetails} transactions={transactions}/>

        <Card>
            <CardHeader>
                <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="h-[200px]">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                    <rect x="10" y="20" width="10" height="60" fill="#4f46e5" />
                    <rect x="30" y="30" width="10" height="50" fill="#4f46e5" />
                    <rect x="50" y="40" width="10" height="40" fill="#4f46e5" />
                    <rect x="70" y="50" width="10" height="30" fill="#4f46e5" />
                </svg>
            </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Estimated Tax</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="h-[200px]">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                    <rect x="10" y="40" width="80" height="20" fill="#4f46e5" />
                    <rect x="10" y="70" width="40" height="20" fill="#10b981" />
                </svg>
            </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Returns by Investment Type</CardTitle>
            </CardHeader>
            <CardContent>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="1 Day" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1day">1 Day</SelectItem>
                    <SelectItem value="1week">1 Week</SelectItem>
                    <SelectItem value="1month">1 Month</SelectItem>
                </SelectContent>
            </Select>
            <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                    <span>Mutual Funds</span>
                    <span className="text-green-500">₹+4,562 (1.45%)</span>
                </div>
                <div className="flex justify-between">
                    <span>Stocks</span>
                    <span className="text-red-500">₹-1,700 (-0.92%)</span>
                </div>
            </div>
            </CardContent>
        </Card>

        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Top Gainers & Losers</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                <h3 className="mb-2 font-semibold">Top Gainers</h3>
                <div className="rounded bg-green-100 p-2">
                    <div className="font-semibold">Axis ELSS Tax Saver-G</div>
                    <div className="text-green-600">₹4,562 (1.45%)</div>
                </div>
                </div>
                <div>
                <h3 className="mb-2 font-semibold">Top Losers</h3>
                <div className="rounded bg-red-100 p-2">
                    <div className="font-semibold">Infosys</div>
                    <div className="text-red-600">₹-1,675 (-0.85%)</div>
                </div>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>VR's Analysis</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                <div>
                    <div className="font-semibold">Quality Score</div>
                    <div className="h-2 w-full rounded bg-gray-200">
                        <div className="h-2 w-3/4 rounded bg-green-500"></div>
                    </div>
                </div>
                <div>
                    <div className="font-semibold">Asset Allocation</div>
                    <div>95.6% of your investments are in equities.</div>
                </div>
                <div>
                    <div className="font-semibold">Equity Sector Diversity</div>
                    <div>You have invested a high amount in just one sector. You should be more diversified.</div>
                </div>
                </div>
            </CardContent>
        </Card>

        </div>

        </div>
        </div>
            
        )
    );
  };
  
  export default DashboardJs;