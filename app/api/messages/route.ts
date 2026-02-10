import connectDB from "@/config/database";
import { NextRequest, NextResponse } from "next/server";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/messages

export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        {
          status: 401,
        },
      );
    }

    const { userId } = sessionUser;

    const messages = await Message.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      {
        status: 500,
      },
    );
  }
};

// POST /api/messages
export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    const { name, email, phone, body, recipient, property } =
      await request.json();

    // En cada lugar que quiera obtener los datos del usuario que inicio session tengo que usar estas lineas
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json(
        { message: "You must be logged in to sent a message" },
        {
          status: 401,
        },
      );
    }

    const { user } = sessionUser;
    // Hasta áca

    // Can not sent message to self
    if (user.id === recipient) {
      return NextResponse.json(
        { message: "Can not sent message to yourself" },
        {
          status: 400,
        },
      );
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      body,
      name,
      phone,
      email,
      property,
    });

    await newMessage.save();

    return NextResponse.json(
      { message: "Message sent" },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};
