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

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();

    // Acces all values from amenities and images
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter(
        (image): image is File => image instanceof File && image.name !== "",
      );

    // Create popertyData object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipCode: formData.get("location.zipCode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      images,
    };

    console.log(propertyData);

    return NextResponse.json({
      message: "Success",
      status: "200",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add property" },
      { status: 500 },
    );
  }
};
