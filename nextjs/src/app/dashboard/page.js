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
import { TopGainersAndLosers } from "../components/top-gnl";
import { InvestmentByYear } from "../components/per-year";
import MyLoader from "../components/loader";
import { useUser } from '@auth0/nextjs-auth0/client';
import { Delete } from "lucide-react";
import { DeleteInvestmentDialogJsx } from "@/components/delete-investment-dialog";
import {SunJs} from "@/components/ui/sun";
import { StockAnalysisCardComponent } from "@/components/stock-analysis-card";


const sectors = ["Tech", "Petroleum", "Finance", "Healthcare", "Defense", "Retail"];




const DashboardJs = () => {


    const [transactions, setTransactions] = useState([]);
    const [currentStock, setCurrentStock] = useState("AAPL");
    const [currentDate, setCurrentDate] = useState("2021-01-01");
    const [totalValue, setTotalValue] = useState(0);
    const [investedAmount, setInvestedAmount] = useState(0);
    const [oneDayChange, setOneDayChange] = useState(0);
    const [allTimeReturns, setAllTimeReturns] = useState(0);
    const [stockDetails, setStockDetails] = useState([]);
    const [topGainers, setTopGainers] = useState([]); // State for top gainers

    const [loading, setLoading] = useState(true);

    // const { user, error, isLoading } = useUser();




    useEffect(() => {
        // Fetch portfolio data
        setLoading(true); // Start loading when fetching begins
    
        fetch("/api/getPortfolio", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ hi: "hi" }),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log("Fetched portfolio data:", data);
                setTransactions(data.transactions);
                setLoading(false); // Stop loading after transactions are fetched
            })
            .catch((error) => {
                console.error("Error fetching portfolio data:", error);
                setLoading(false); // Stop loading even if there is an error
            });
    }, []);
    
    useEffect(() => {
        if (!transactions || transactions.length === 0) {
            return; // No transactions, no need to fetch stock prices
        }
    
        setLoading(true); // Start loading for stock price fetch
    
        const fetchStockPrices = async () => {
            try {
                const stockIds = transactions.map((t) => t.stockId);
    
                // Fetch current stock prices
                const response = await fetch("/api/all-stock-details", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ stockIds }),
                });
    
                const data = await response.json();
    
                // Calculate portfolio values
                let totalCurrentValue = 0;
                let totalInvested = 0;
                let totalDayChange = 0;
    
                transactions.forEach((transaction) => {
                    const stockDetail = data.stockDetails.find((s) => s.stockId === transaction.stockId);
                    if (stockDetail) {
                        const currentPrice = stockDetail.result.price.regularMarketPrice;
                        const previousClose = stockDetail.result.price.regularMarketPreviousClose;
    
                        totalCurrentValue += transaction.quantity * currentPrice;
                        totalInvested += transaction.quantity * transaction.purchasePrice;
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
            } finally {
                setLoading(false); // Stop loading after stock prices are fetched
            }
        };
    
        fetchStockPrices();
    }, [transactions]);
    
    useEffect(() => {
        const fetchTopGainers = async () => {
            try {
                const response = await fetch("/api/get-top-gainers");
                const data = await response.json();
                setTopGainers(data);
            } catch (error) {
                console.error("Error fetching top gainers:", error);
            }
        };
    
        fetchTopGainers();
    }, []);
    

    // console.log('totalvalue',totalValue)


    function AllStocks() {


        if (!transactions || transactions.length === 0) {
            return <div></div>;
        }

        const uniqueTransactions = Array.from(
            transactions.reduce((map, transaction) => {
                if (!map.has(transaction.stockId)) {
                    map.set(transaction.stockId, transaction);
                }
                return map;
            }, new Map()).values()
        );

        //
        return uniqueTransactions.map((transaction) => (




            <TabsTrigger
                key={transaction.stockId}
                value={transaction.stockId}
                onClick={() => {
                    setCurrentStock(transaction.stockId);
                    setCurrentDate(transaction.transactionDate);
                }}
            >
                {transaction.stockId}
            </TabsTrigger>



        ));
    }

    if (loading) {
        return <MyLoader />
    }


    // If no transactions are found, display a message and return

    else if (loading == false && transactions.length === 0) {
        return (
          <div>
            <HeaderJs />
            <div className="my-8 flex items-center justify-between px-5 ">
              <h1 className="text-3xl font-bold">My Portfolio</h1>
              <div className="flex gap-2">
                <InvestmentFormJsx />
              </div>
            </div>
            <div className="min-h-screen flex flex-col text-xl text-bold justify-center items-center bg-gray-100 p-8">
                
                No transactions found
                
                <SunJs/>
                </div>
          </div>
        );
    }


    return (
        (


            <div>

                <HeaderJs />


                        <div className="min-h-screen bg-gray-100 p-8">


                            <div className="mb-8 flex items-center justify-between">


                                <h1 className="text-3xl font-bold">My Portfolio</h1>


                                {/* button to add investment */}
                                <div className="flex gap-2">


                                    <InvestmentFormJsx />

                                    <DeleteInvestmentDialogJsx mytransactions={transactions}/>

                                </div>


                            </div>


                            {/* Combined stats of portfolio */}

                            <div className="mb-8 flex items-center justify-between rounded-lg bg-white p-4 shadow">
                                <div>
                                    <div className="text-sm text-gray-500">CURRENT VALUE</div>
                                    <div className="text-2xl font-bold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                    <div className="text-sm text-gray-500">Invested: ${investedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">1 DAY</div>
                                    <div
                                        className={`text-xl font-bold ${oneDayChange >= 0 ? "text-green-500" : "text-red-500"
                                            }`}
                                    >
                                        ${oneDayChange.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                    <div className={`text-sm ${oneDayChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                                        {((oneDayChange / totalValue) * 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">ALL TIME RETURNS</div>
                                    <div
                                        className={`text-xl font-bold ${allTimeReturns >= 0 ? "text-green-500" : "text-red-500"
                                            }`}
                                    >
                                        ${allTimeReturns.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                    <div className={`text-sm ${allTimeReturns >= 0 ? "text-green-500" : "text-red-500"}`}>
                                        {((allTimeReturns / investedAmount) * 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}% p.a.
                                    </div>
                                </div>
                            </div>


                            {/* List of stocks for graph */}

                            <Tabs defaultValue="dashboard" className="mb-8">
                                <TabsList className="overflow-auto flex-wrap flex">

                                    <AllStocks />
                                </TabsList>
                            </Tabs>

                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">



                                <Card className="col-span-2">
                                    <CardHeader>
                                        <CardTitle>Performance</CardTitle>
                                    </CardHeader>
                                    <MyChart stockId={currentStock} startDate={currentDate} />
                                </Card>

                                <AllocationCard stockDetails={stockDetails} transactions={transactions} />

                                <TopGainersAndLosers stockDetails={stockDetails} transactions={transactions} />


                                <InvestmentByYear transactions={transactions} stockDetails={stockDetails} />





                                <Card className="col-span-2">
                                    <CardHeader>
                                        <CardTitle>Top Gainers Today in the Market</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            { topGainers.error ? 
                                                <div> {topGainers.error} </div>
                                                :
                                            topGainers.map((gainer, index) => (
                                                <div key={index} className="rounded bg-green-100 p-2">
                                                    <div className="font-semibold">{gainer.name} ({gainer.stockId})</div>
                                                    <div className="text-green-600">+{gainer.gain.toFixed(2)}%</div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>



                                <StockAnalysisCardComponent stockDetails={stockDetails} transactions={transactions}/>

                            </div>

                        </div>
                    </div>
            
        )

                );

  };

                export default DashboardJs;