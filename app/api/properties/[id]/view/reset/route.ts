import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser"; // Tu helper para obtener la sesión
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    await connectDB();
    const { id } = params;

    // 1. Verificamos que el usuario esté logueado
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new NextResponse("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;
    const property = await Property.findById(id);

    if (!property)
      return new NextResponse("Property not found", { status: 404 });

    // 2. SEGURIDAD: Solo el dueño puede resetear las vistas
    if (property.owner.toString() !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 3. Reseteamos a 0
    property.views = 0;
    await property.save();

    return NextResponse.json({ message: "Views reset" }, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
