import connectDB from "@/helpers/connectDB"; // Helper to connect to the database
import { NextResponse } from "next/server";
import User from "@/helpers/models/user"; // User model

export async function GET(req, res) {
  // Connect to the database
  await connectDB();

  try {
    // Fetch all users from the database
    const users = await User.find({}, { name: 1, email: 1, createdAt: 1 }); // Select specific fields if needed

    // Return the users in the response
    return NextResponse.json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
