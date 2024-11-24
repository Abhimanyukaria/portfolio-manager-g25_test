'use client'

import React from 'react'
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { StarIcon } from 'lucide-react';
import { Button } from '../components/ui/button';




const StockInfo = () => {
    return (
        (<div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold">Angel One Ltd.</h1>
                <div className="flex items-center">
                  <span className="text-3xl font-bold mr-2">₹2,616.30</span>
                  <span className="text-green-500">+₹25.50 (0.98%)</span>
                </div>
                <p className="text-sm text-gray-500">As on 25-Sep-2023 14:59 IST</p>
              </div>
              <div>
                <Button className="mr-2">Stock Card</Button>
                <Button variant="outline" className="mr-2">+</Button>
                <Button variant="outline">Share</Button>
              </div>
            </div>
            <Tabs defaultValue="overview" className="mb-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="key-ratios">Key Ratios</TabsTrigger>
                <TabsTrigger value="peer-comparison">Peer Comparison</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
                <TabsTrigger value="shareholdings">Shareholdings</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
             </TabsList>
           </Tabs>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Value Research Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-semibold">Quality Score</p>
                    <p className="text-lg font-bold text-green-500">8/10</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Growth Score</p>
                    <p className="text-lg font-bold text-yellow-500">6/10</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Valuation Score</p>
                    <p className="text-lg font-bold text-yellow-500">6/10</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Momentum Score</p>
                    <p className="text-lg font-bold text-red-500">2/10</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Angel One Ltd. Share Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div>
                  <span className="font-semibold">High:</span> ₹3875.7
                  <span className="font-semibold ml-4">Low:</span> ₹1840.25
                  <span className="font-semibold ml-4">Return:</span>
                  <span className="text-green-500"> +42.00%</span>
                </div>
                <div>
                  <Button variant="outline" className="mr-2">Price</Button>
                  <Button variant="outline" className="mr-2">P/E Ratio</Button>
                  <Button variant="outline">P/B Ratio</Button>
                </div>
              </div>
              <div className="h-64 bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">Stock price chart placeholder</p>
              </div>
              <div className="flex justify-between mt-4">
                <div>
                  <Button variant="outline" size="sm">NSE</Button>
                  <Button variant="outline" size="sm" className="ml-2">BSE</Button>
                </div>
                <div>
                  <Button variant="outline" size="sm">1D</Button>
                  <Button variant="outline" size="sm" className="ml-2">1M</Button>
                  <Button variant="outline" size="sm" className="ml-2">3M</Button>
                  <Button variant="outline" size="sm" className="ml-2">1Y</Button>
                  <Button variant="outline" size="sm" className="ml-2">3Y</Button>
                  <Button variant="outline" size="sm" className="ml-2">All</Button>
                  <Button variant="outline" size="sm" className="ml-2">Custom</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Stock Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="font-semibold mb-2">Today's Range</p>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: '60%' }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>₹2,551.30</span>
                      <span>₹2,647.65</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-semibold mb-2">52 Week Range</p>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: '80%' }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>₹1,824.05</span>
                      <span>₹3,596.00</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-semibold mb-2">Liquidity</p>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: '90%' }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Low</span>
                      <span>Moderate</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Fundamentals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Market Cap</p>
                  <p className="font-semibold">₹23,506 Cr</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">P/E Ratio</p>
                  <p className="font-semibold">19.63</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">P/B Ratio</p>
                  <p className="font-semibold">4.95</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Industry P/E</p>
                  <p className="font-semibold">19.48</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ROE</p>
                  <p className="font-semibold">42.38 %</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ROCE</p>
                  <p className="font-semibold">-</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Div. Yield</p>
                  <p className="font-semibold">1.34 %</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Book Value</p>
                  <p className="font-semibold">526.96</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>)
    )
}

export default StockInfo
