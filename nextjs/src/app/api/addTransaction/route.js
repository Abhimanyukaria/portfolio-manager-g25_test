// pages/api/transactions/addTransaction.js

import connectDB from "@/helpers/connectDB";
import Transaction from "@/helpers/models/transaction";

import { NextResponse } from "next/server";
import { Next } from "react-bootstrap/esm/PageItem";

export async function POST(req, res) {
  // Ensure the database is connected
  await connectDB();

//   var Transaction = mongoose.model('Transaction');


  
    try {

        const body = await req.json(); 

      const {
        portfolioId,
        stockId,
        type,
        quantity,
        purchasePrice,
        totalValue,
        transactionDate,
      } = body;

      console.log(body);

      // Validate the required fields
      if (
        !portfolioId ||
        !stockId ||
        !type ||
        !quantity ||
        !purchasePrice ||
        !totalValue ||
        !transactionDate
      ) {
        return NextResponse.json({ error: "Please provide all required fields" });
          
      }

      // Create a new transaction
      const newTransaction = new Transaction({
        portfolioId,
        stockId,
        type,
        quantity,
        purchasePrice,
        totalValue,
        transactionDate,
      });

      // Save to database
      const savedTransaction = await newTransaction.save();

      return NextResponse.json({
        message: "Transaction created successfully",
        transaction: savedTransaction,
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      return NextResponse.json({ error: "Internal Server Error" });
    }
  } 

