'use client'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2Icon } from 'lucide-react'

export function DeleteInvestmentDialogJsx({ mytransactions }) {

  const [transactions, setTransactions] = useState(mytransactions);

  // setTransactions(mytransactions);

  useEffect(() => {
    setTransactions(mytransactions)

    console.log("bolobhai",transactions,mytransactions)
  },[]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/delete-transaction`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId: id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }

      // Update the state to remove the deleted transaction
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction._id !== id)
      );

      console.log(`Transaction with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete transactions</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Delete transactions</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stock ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Purchase Price</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Transaction Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions && transactions.map((investment) => (
                <TableRow key={investment._id}>
                  <TableCell>{investment.stockId}</TableCell>
                  <TableCell>{investment.type}</TableCell>
                  <TableCell>{investment.quantity}</TableCell>
                  <TableCell>${investment.purchasePrice.toFixed(2)}</TableCell>
                  <TableCell>${investment.totalValue.toFixed(2)}</TableCell>
                  <TableCell>{new Date(investment.transactionDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(investment._id)}
                    >
                      <Trash2Icon className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
