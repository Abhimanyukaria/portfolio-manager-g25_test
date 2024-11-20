// pages/api/transactions/addTransaction.js

import connectDB from "@/helpers/connectDB";
import { NextResponse } from "next/server";
import { getSession } from '@auth0/nextjs-auth0';
import User from "@/helpers/models/user";
import Portfolio from "@/helpers/models/portfolio";

export async function GET(req, res) {
  // Ensure the database is connected
  await connectDB();

  try {
    // Retrieve user information from Auth0 session
    const session = await getSession();
    const { user } = session;

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
    } else {
      console.log("User found in database:", existingUser);
    }

    // Fetch all portfolios for the user
      const portfolios = await Portfolio.find({ userId: existingUser._id }).select('_id name');
      const portfolioIds = portfolios.map(portfolio => portfolio._id);

      // Respond with user data and portfolio IDs
      return NextResponse.json({
        message: "User and portfolios retrieved successfully",
        user: existingUser,
        portfolios: portfolioIds,
      });

    // return NextResponse.json({user});    
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
