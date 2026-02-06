import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextResponse, NextRequest } from "next/server";

// Get /api/properties/search
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location, "i");

    // Match location pattern against database fields
    let query: any = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.state": locationPattern },
        { "location.city": locationPattern },
        { "location.zipCode": locationPattern },
      ],
    };

    // Only chech of property its not all
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return NextResponse.json(properties, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to search properties" },
      {
        status: 500,
      },
    );
  }
};
