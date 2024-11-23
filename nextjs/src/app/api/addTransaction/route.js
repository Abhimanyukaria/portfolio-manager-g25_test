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

  const user_email = body.user_email;




console.log('hi');
console.log('user_email:', user_email);

if (!user_email) {
  return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
}

let existingUser = await User.findOne({ email: user_email }).select('_id');



console.log('existingUser:', existingUser._id);




  const myportfolio= await Portfolio.findOne({userId: existingUser._id});

  // const { _id } = myportfolio.toObject();

  const portfolioId = myportfolio._id;

  console.log('portfolioId', myportfolio);
  console.log('portfolioId meri:', portfolioId);

  if (!portfolioId) {
    return NextResponse.json({ error: "Portfolio not found" });
  }

  else{

    console.log("Portfolio found in database:", portfolioId);

  }



  try {
    const transactions = body.transactions;
    console.log('transactions se hello:', transactions);
  
    if (!transactions || transactions.length === 0) {
      return NextResponse.json({ error: "No transactions provided" });
    }
  
    // Use Promise.all to wait for all asynchronous save operations
    const allSavedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        const {
          stockId,
          type,
          quantity,
          purchasePrice,
          transactionDate,
        } = transaction;
  
        console.log('Processing transaction:', transaction);
  
        // Validate the required fields
        if (
          !stockId ||
          !type ||
          !quantity ||
          !purchasePrice ||
          !transactionDate
        ) {
          throw new Error("Please provide all required fields");
        }
  
        console.log('stockId:', stockId);
  
        // Create a new transaction
        const newTransaction = new Transaction({
          portfolioId: portfolioId,
          stockId,
          type: "buy",
          quantity,
          purchasePrice,
          totalValue: quantity * purchasePrice,
          transactionDate,
        });
  
        console.log('newTransaction:', newTransaction);
  
        // Save to database and return the saved transaction
        const savedTransaction = await newTransaction.save();
        console.log("Transaction saved:", savedTransaction);
        return savedTransaction;
      })
    );
  
    // Send the response after all transactions are saved
    return NextResponse.json({
      message: "Transactions created successfully",
      transactions: allSavedTransactions,
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }

}

