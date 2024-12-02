'use client';
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

let stocksData = require('@/../public/allstocks.json');

export function StockTableComponent() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 10


  const filteredStocks = stocksData.companies.filter(stock => 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentStocks = filteredStocks.slice(startIndex, endIndex)

  // console.log(currentStocks)

  return (
    <div className=" mx-auto p-4">

      <h1 className='text-2xl font-extrabold mb-5 '>List of Available Stocks</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search stocks..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className="max-w-sm" />
      </div>


      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Performance Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

        

          {currentStocks.map((stock) => (

            
            <TableRow key={stock.symbol}>
              <TableCell>{stock.name}</TableCell>
              <TableCell>{stock.symbol}</TableCell>
              <TableCell>
                <Link
                  href={`/stock-info/${stock.symbol}`}
                  className="text-blue-600 hover:underline">
                  View Performance
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <div className="mt-4 flex items-center justify-between">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}