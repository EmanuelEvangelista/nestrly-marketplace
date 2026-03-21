import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextResponse, NextRequest } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

export const PATCH = async (request: NextRequest, { params }: Props) => {
  const { id } = await params;

  try {
    await connectDB();
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true },
    );

    if (!updatedProperty) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ views: updatedProperty.views }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Error updating views" },
      { status: 500 },
    );
  }
};
