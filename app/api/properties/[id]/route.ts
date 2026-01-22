import connectDB from "@/config/database";
import { NextRequest, NextResponse } from "next/server";
import Property from "@/models/Property";

type Props = {
  params: Promise<{ id: string }>; // Importante: Es una Promesa
};

//GET /api/properties/:id
export const GET = async (request: NextRequest, { params }: Props) => {
  const { id } = await params;

  try {
    await connectDB();

    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(property);
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
