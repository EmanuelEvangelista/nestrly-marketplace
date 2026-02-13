import { withAuth } from "next-auth/middleware";

// Esto exporta la función que Next.js está buscando
export default withAuth({
  // Puedes dejar esto vacío o añadir callbacks si los necesitas
});

export const config = {
  matcher: [
    "/properties/add",
    "/properties/bookmarks",
    "/profile",
    "/properties/saved",
    "/messages",
  ],
};
