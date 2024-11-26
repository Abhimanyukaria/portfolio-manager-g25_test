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
      const response = await fetch(/api/delete-transaction, {
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

      console.log(Transaction with ID ${id} deleted successfully.);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };
}