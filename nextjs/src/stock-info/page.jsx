'use client'

import React from 'react'
import { Button } from "@/components/ui/button"

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
        </div>)
    )
}
export default StockInfo
