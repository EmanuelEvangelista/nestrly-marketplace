import connectDB from "@/config/database";
import { NextRequest, NextResponse } from "next/server";
import Property from "@/models/Property";

//GET /api/properties
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return NextResponse.json(properties);
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
