import connectDB from "@/config/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Database connection failed" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
