import connectDB from "@/config/database";
import { NextRequest, NextResponse } from "next/server";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

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

//DELETE /api/properties/:id
export const DELETE = async (request: NextRequest, { params }: Props) => {
  const { id } = await params;

  try {
    const propertyId = id;

    const sessionUser = await getSessionUser();

    // Check for session
    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        {
          status: 401,
        },
      );
    }

    const { userId } = sessionUser;

    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        {
          status: 404,
        },
      );
    }

    // Verify ownership
    if (property.owner.toString() !== userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        {
          status: 401,
        },
      );
    }

    await property.deleteOne();

    return NextResponse.json({ message: "Property deleted" }, { status: 200 });
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
