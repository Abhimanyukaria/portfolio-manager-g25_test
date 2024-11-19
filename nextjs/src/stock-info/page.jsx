'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        </div>)
    )
}
export default StockInfo
