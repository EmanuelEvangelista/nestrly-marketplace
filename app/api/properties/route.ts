import connectDB from "@/config/database";
import { NextRequest, NextResponse } from "next/server";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

//GET /api/properties
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const properties = await (Property as any).find({});

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
    await connectDB();

    // En cada lugar que quiera obtener los datos del usuario que inicio session tengo que usar estas lineas
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json(
        { error: "User Id is required" },
        {
          status: 404,
        },
      );
    }

    const { userId } = sessionUser;
    // Hasta áca

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
      type: formData.get("type") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,

      location: {
        street: formData.get("location.street") as string,
        city: formData.get("location.city") as string,
        state: formData.get("location.state") as string,
        zipCode: formData.get("location.zipCode") as string,
      },

      beds: Number(formData.get("beds")),
      baths: Number(formData.get("baths")),
      square_feet: Number(formData.get("square_feet")),

      amenities,

      rates: {
        weekly: Number(formData.get("rates.weekly")),
        monthly: Number(formData.get("rates.monthly")),
        nightly: Number(formData.get("rates.nightly")),
      },

      seller_info: {
        name: formData.get("seller_info.name") as string,
        email: formData.get("seller_info.email") as string,
        phone: formData.get("seller_info.phone") as string,
      },
      owner: userId,
    };

    // 1. Array para guardar las PROMESAS (no las URLs todavía)
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      const imageBase64 = imageData.toString("base64");

      // 2. IMPORTANTE: No usamos await aquí, solo guardamos la promesa
      const uploadPromise = cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "nestrly",
        },
      );
      imageUploadPromises.push(uploadPromise);
    }

    // 3. Esperamos a que TODAS las subidas terminen
    const uploadResults = await Promise.all(imageUploadPromises);

    // 4. Extraemos solo las secure_url de los resultados de Cloudinary
    // @ts-ignore (si te da error de tipado con images)
    propertyData.images = uploadResults.map((result) => result.secure_url);

    // 5. Ahora sí, creamos y guardamos en Mongo
    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`,
    );
  } catch (error) {
    console.error("POST PROPERTY ERROR:", error);
    return NextResponse.json(
      { message: "Failed to add property" },
      { status: 500 },
    );
  }
};
