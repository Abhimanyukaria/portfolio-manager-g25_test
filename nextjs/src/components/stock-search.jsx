'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronsUpDownIcon, CheckIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

let stockData = require('@/../public/allstocks.json');

const stocks = stockData.companies;

console.log(stocks);


// Mock data for 500 stocks (you would replace this with your actual JSON data)
// const stocks = Array.from({ length: 500 }, (_, i) => ({
//   id: `STOCK${i + 1}`,
//   name: `Stock ${i + 1}`,
// }))

export function StockSearchJsx({ setStock }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [search, setSearch] = useState("")
  const inputRef = useRef(null)


  setStock(value);

  let filteredStocks = [];

     filteredStocks = stocks.filter(stock => 
      stock.name.toLowerCase().includes(search.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(search.toLowerCase()))

  

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  return (
    (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between">
          {value
            ? `${stocks.find((stock) => stock.symbol === value)?.name} (${value})` 
            : "Select stock..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <div className="p-2">
          <Input
            ref={inputRef}
            placeholder="Search stocks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </div>
        <ScrollArea className="h-[300px]">
          {filteredStocks.length > 0 ? (
            filteredStocks.map((stock) => (
              <Button
                key={stock.symbol}
                onClick={() => {
                  setValue(stock.symbol)
                  setOpen(false)
                  // onSelect(stock.symbol)
                }}
                variant="ghost"
                className="w-full justify-start font-normal">
                <CheckIcon
                  className={cn("mr-2 h-4 w-4", value === stock.symbol ? "opacity-100" : "opacity-0")} />
                 <span className='font-semibold'> {stock.symbol} </span>{stock.name} 
              </Button>
            ))
          ) : (
            <div className="p-2 text-center text-sm text-muted-foreground">
              No stocks found.
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>)
  );
}