// pages/api/transactions/addTransaction.js

import connectDB from "@/helpers/connectDB";
import Transaction from "@/helpers/models/transaction";

import { NextResponse } from "next/server";
import { getSession } from '@auth0/nextjs-auth0';

import User from "@/helpers/models/user";
import Portfolio from "@/helpers/models/portfolio";

export async function POST(req, res) {
  // Ensure the database is connected
  await connectDB();

  // var Transaction = mongoose.model('Transaction');

  const body = await req.json(); 

  const transactionId = body.transactionId;




try{
  
    if (!transactionId) {
        return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
      }
  
      // Find and delete the transaction by its ID
      const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
  
      if (!deletedTransaction) {
        return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
      }
  
      // Respond with success
      return NextResponse.json({
        message: "Transaction deleted successfully",
        transaction: deletedTransaction,
      });
  } catch (error) {
    console.error("Error adding transaction:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }

}

