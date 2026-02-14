import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextResponse, NextRequest } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    await connectDB();
    const { id } = await params;

    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 },
      );
    }

    // Incrementamos el contador de vistas
    property.views = (property.views || 0) + 1;
    await property.save();

    return NextResponse.json({ views: property.views }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating views" },
      { status: 500 },
    );
  }
};
