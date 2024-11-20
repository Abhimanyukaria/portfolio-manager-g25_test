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

    // Check if user exists in the MongoDB database
    let existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
      // If the user does not exist, create a new user in MongoDB

      console.log("oyy naya banao")
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

    // Return the user data from MongoDB
    return NextResponse.json({ message: "User retrieved", user: existingUser });


  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
