import { useEffect } from "react";
import { PropertyType } from "@/models/Property";

interface PropertyViewProps {
  property: PropertyType;
}
const PropertyView = ({ property }: PropertyViewProps) => {
  useEffect(() => {
    const incrementView = async () => {
      try {
        // 1. Revisamos si ya existe una marca en el navegador
        const viewedProperties = JSON.parse(
          localStorage.getItem("viewed_properties") || "[]",
        );

        // 2. Si el ID de esta propiedad NO está en la lista, la contamos
        if (!viewedProperties.includes(property._id)) {
          const res = await fetch(`/api/properties/${property._id}/view`, {
            method: "PATCH",
          });

          if (res.ok) {
            // 3. Guardamos el ID para no volver a contar en esta "sesión"
            viewedProperties.push(property._id);
            localStorage.setItem(
              "viewed_properties",
              JSON.stringify(viewedProperties),
            );
          }
        }
      } catch (error) {
        console.error("Error al contar la vista:", error);
      }
    };

    if (property?._id) {
      incrementView();
    }
  }, [property._id]);
  return null;
};

export default PropertyView;
