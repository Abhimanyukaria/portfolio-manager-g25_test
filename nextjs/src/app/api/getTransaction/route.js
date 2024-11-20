// pages/api/transactions/addTransaction.js

import connectDB from "@/helpers/connectDB";
import { NextResponse } from "next/server";
import { getSession } from '@auth0/nextjs-auth0';
import User from "@/helpers/models/user";
import Portfolio from "@/helpers/models/portfolio";
import Transaction from "@/helpers/models/transaction";

export async function POST(req, res) {
  // Ensure the database is connected
  await connectDB();

  const data = await req.json();

//   const portfolioId = data.portfolioId;

  console.log(data);

    try{
    // Fetch all portfolios for the user
      const transactions = await Transaction.find({ portfolioId: '636d72cfd43b7e001e8a5b3a' });
    //   const portfolioIds = portfolios.map(portfolio => portfolio._id);

      // Respond with user data and portfolio IDs
      return NextResponse.json({
        message: "Transactions Succesfully recieved",
        
        transactions,
      });

    // return NextResponse.json({user});    
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
