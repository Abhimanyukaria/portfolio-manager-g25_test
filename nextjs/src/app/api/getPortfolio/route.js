// pages/api/transactions/addTransaction.js

import connectDB from "@/helpers/connectDB";
import { NextResponse } from "next/server";
import { getSession } from '@auth0/nextjs-auth0';
import User from "@/helpers/models/user";
import Portfolio from "@/helpers/models/portfolio";


import Transaction from "@/helpers/models/transaction";

export async function POST(req, res) {
  // Ensure the database is connected

  console.log("this is an api route");

  const session = await getSession();
  const { user } = session;

  // const body  = await req.json();

  // const user = await body.user;

  await connectDB();

  try {
    // Retrieve user information from Auth0 session
   

    if (!user || !user.email) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Check if the user exists in the MongoDB database
    let existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
      // If the user does not exist, create a new user in MongoDB
      console.log("Creating new user...");
      existingUser = new User({
        email: user.email,
        name: user.nickname || "",
        createdAt: new Date(),
      });

      

      await existingUser.save();
      console.log("New user added to database:", existingUser);


      let initPortfolio = new Portfolio({
        userId: existingUser._id,
        name: "My Portfolio",
        createdAt: new Date(),
      });


      console.log("Portfolio initialized:", initPortfolio);
    } else {
      console.log("User found in database:", existingUser);
    }

    // Fetch all portfolios for the user
      const portfolios = await Portfolio.find({ userId: existingUser._id }).select('_id name');

      let portfolioIds = [];

      if(portfolios.length === 0){

        let initPortfolio = new Portfolio({
          userId: existingUser._id,
          name: "My Portfolio",
          createdAt: new Date(),
        });
        await initPortfolio.save();
        console.log("Portfolio initialized:", initPortfolio);
        portfolioIds.push(initPortfolio._id);

      }
      else{
      portfolioIds = portfolios.map(portfolio => portfolio._id);
      }

      console.log("Portfolios found:", portfolios);

      const myportfolio = portfolios[0];

      const transactions = await Transaction.find({portfolioId: myportfolio._id});

      console.log(transactions);


      // Respond with user data and portfolio IDs
      return NextResponse.json({
        message: "User and portfolios retrieved successfully",
        user: existingUser,
        portfolios: portfolioIds,
        transactions: transactions
      });

    // return NextResponse.json({user});    
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 501 });
  }
}
