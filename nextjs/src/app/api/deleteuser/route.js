import connectDB from "@/helpers/connectDB"; // Connect to your MongoDB
import User from "@/helpers/models/user"; // User model
import { NextResponse } from "next/server";

export async function POST(req) {
  // Connect to the database
  await connectDB();

  try {
    
    const body = await req.json();

    const userId = body.userId;
    

    if (!userId) {
      return NextResponse.json(
        { error: "User ID not provided" },
        { status: 400 }
      );
    }

    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    return NextResponse.json(
      { message: "User deleted successfully", userId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
