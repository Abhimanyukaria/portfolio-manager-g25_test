import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from 'lucide-react'

// Mock data for stock analysis
const stockAnalysisData = [
  { stockId: "AAPL", futurePrice: 180.50 },
  { stockId: "GOOGL", futurePrice: 2750.00 },
  { stockId: "MSFT", futurePrice: 340.75 },
  { stockId: "AMZN", futurePrice: 3500.25 },
  { stockId: "FB", futurePrice: 330.00 }
]



export function StockAnalysisCardComponent({stockDetails,transactions}) {

  console.log(stockDetails,transactions)
  const [isLoading, setIsLoading] = useState(false)
  const [showData, setShowData] = useState(false)
  const [isOpen, setIsOpen] = useState(false)


  const stockName = "Apple Inc.";
const stockSymbol = "AAPL";
const currentPrice = 145.50;

  useEffect(() => {
    if (isOpen && isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        setShowData(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, isLoading])

  const handleOpenChange = (open) => {
    setIsOpen(open)
    if (open) {
      setIsLoading(true)
      setShowData(false)
    } else {
      setIsLoading(false)
      setShowData(false)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{stockName} ({stockSymbol})</CardTitle>
      </CardHeader>
      <CardContent>
        {currentPrice !== undefined ? (
          <>
            <p className="text-2xl font-bold">${currentPrice.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Current Price</p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Price not available</p>
        )}
      </CardContent>
      <CardFooter>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button>View Analysis</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Stock Analysis for {stockSymbol}</DialogTitle>
            </DialogHeader>
            {isLoading && (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading analysis...</span>
              </div>
            )}
            {showData && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stock ID</TableHead>
                    <TableHead>Future Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockAnalysisData.map((analysis) => (
                    <TableRow key={analysis.stockId}>
                      <TableCell>{analysis.stockId}</TableCell>
                      <TableCell>${analysis.futurePrice.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}





