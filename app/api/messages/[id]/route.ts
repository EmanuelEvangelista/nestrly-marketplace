import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>; // Importante: Es una Promesa
};

// PUT /api/message/:id
export const PUT = async (request: NextRequest, { params }: Props) => {
  const { id } = await params;

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

    // Get property to update
    const message = await Message.findById(id);

    if (!message) {
      return NextResponse.json(
        { message: "Message not found" },
        {
          status: 404,
        },
      );
    }

    // Verify ownership
    if (message.recipient.toString() !== userId) {
      return NextResponse.json(
        { error: "Message not found" },
        {
          status: 401,
        },
      );
    }

    // Update message to read/unread dependig on the current status
    message.read = !message.read;

    await message.save();

    return NextResponse.json(message, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};
