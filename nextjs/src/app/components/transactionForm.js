'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusIcon, XIcon } from 'lucide-react'

const emptyInvestment = {
  stockId: '',
  type: '',
  quantity: '',
  purchasePrice: '',
  totalValue: '',
  transactionDate: '',
}

export function InvestmentFormJsx() {
  const [investments, setInvestments] = useState([{ ...emptyInvestment }])
  const scrollAreaRef = useRef(null)

  const handleInputChange = (index, e) => {
    const { name, value } = e.target
    setInvestments(prevInvestments => {
      const newInvestments = [...prevInvestments]
      newInvestments[index] = { ...newInvestments[index], [name]: value }
      return newInvestments
    })
  }

  const handleSelectChange = (index, value) => {
    setInvestments(prevInvestments => {
      const newInvestments = [...prevInvestments]
      newInvestments[index] = { ...newInvestments[index], type: value }
      return newInvestments
    })
  }

  const addNewInvestment = () => {
    setInvestments(prevInvestments => [...prevInvestments, { ...emptyInvestment }])
  }

  const removeInvestment = (index) => {
    setInvestments(prevInvestments => prevInvestments.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const submittedData = investments.map(investment => ({
      ...investment,
      quantity: Number(investment.quantity),
      purchasePrice: Number(investment.purchasePrice),
      totalValue: Number(investment.totalValue),
      transactionDate: new Date(investment.transactionDate),
      createdAt: new Date()
    }))
    console.log('Submitted transactions:', submittedData)
    // Here you would typically send this data to your backend
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }, [investments.length])

  return (
    (<Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Investment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Investment(s)</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[60vh] pr-4" ref={scrollAreaRef}>
            {investments.map((investment, index) => (
              <div
                key={index}
                className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Investment {index + 1}</h3>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInvestment(index)}>
                      <XIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`stockId-${index}`}>Stock ID</Label>
                    <Input
                      id={`stockId-${index}`}
                      name="stockId"
                      value={investment.stockId}
                      onChange={(e) => handleInputChange(index, e)}
                      required />
                  </div>
                  <div>
                    <Label htmlFor={`type-${index}`}>Type</Label>
                    <Select
                      name="type"
                      className="bg-slate-100"
                      onValueChange={(value) => handleSelectChange(index, value)}
                      value={investment.type}
                      required>
                      <SelectTrigger id={`type-${index}`}>
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy">Buy</SelectItem>
                        <SelectItem value="sell">Sell</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                    <Input
                      id={`quantity-${index}`}
                      name="quantity"
                      type="number"
                      value={investment.quantity}
                      onChange={(e) => handleInputChange(index, e)}
                      required />
                  </div>
                  <div>
                    <Label htmlFor={`purchasePrice-${index}`}>Purchase Price</Label>
                    <Input
                      id={`purchasePrice-${index}`}
                      name="purchasePrice"
                      type="number"
                      step="0.01"
                      value={investment.purchasePrice}
                      onChange={(e) => handleInputChange(index, e)}
                      required />
                  </div>
                  <div>
                    <Label htmlFor={`totalValue-${index}`}>Total Value</Label>
                    <Input
                      id={`totalValue-${index}`}
                      name="totalValue"
                      type="number"
                      step="0.01"
                      value={investment.totalValue}
                      onChange={(e) => handleInputChange(index, e)}
                      required />
                  </div>
                  <div>
                    <Label htmlFor={`transactionDate-${index}`}>Transaction Date</Label>
                    <Input
                      id={`transactionDate-${index}`}
                      name="transactionDate"
                      type="date"
                      value={investment.transactionDate}
                      onChange={(e) => handleInputChange(index, e)}
                      required />
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="mt-4 space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addNewInvestment}>
              <PlusIcon className="mr-2 h-4 w-4" />
              New Investment
            </Button>
            <Button type="submit" className="w-full">Submit Investments</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>)
  );
}