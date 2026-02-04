import connectDB from "@/config/database";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();

    // En cada lugar que quiera obtener los datos del usuario que inicio session tengo que usar estas lineas
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json(
        { error: "User Id is required" },
        {
          status: 401,
        },
      );
    }

    const { userId } = sessionUser;
    // Hasta áca

    // Find user in database
    const user = await User.findOne({ _id: userId });

    // Check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    return NextResponse.json({ isBookmarked }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};
