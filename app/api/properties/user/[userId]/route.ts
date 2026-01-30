import connectDB from "@/config/database";
import { NextRequest, NextResponse } from "next/server";
import Property from "@/models/Property";

//GET /api/properties/user/userId
export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ userId: string }>;
  },
) => {
  const { userId } = await params;
  const idUser = userId;

  if (!idUser) {
    return NextResponse.json(
      { error: "User Id es required" },
      {
        status: 400,
      },
    );
  }

  try {
    await connectDB();

    const properties = await Property.find({ owner: idUser });

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
