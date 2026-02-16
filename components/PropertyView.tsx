"use client";
import { useEffect } from "react";
import { PropertyType } from "@/models/Property";

interface PropertyViewProps {
  property: PropertyType;
}

const PropertyView = ({ property }: PropertyViewProps) => {
  useEffect(() => {
    const propertyId = property._id.toString(); // Forzamos a string para evitar errores

    const incrementView = async () => {
      try {
        const storageKey = "viewed_properties";
        const viewedProperties = JSON.parse(
          localStorage.getItem(storageKey) || "[]",
        );

        // 1. Doble verificación: Si ya está en la lista, salimos volando
        if (viewedProperties.includes(propertyId)) return;

        // 2. Bloqueo preventivo: Lo añadimos al storage ANTES del fetch
        // Esto evita que si el fetch tarda, otra ejecución entre.
        const updatedViews = [...viewedProperties, propertyId];
        localStorage.setItem(storageKey, JSON.stringify(updatedViews));

        const res = await fetch(`/api/properties/${propertyId}/view`, {
          method: "PATCH",
        });

        if (!res.ok) {
        }
      } catch (error) {
        console.error("Error al contar la vista:", error);
      }
    };

    if (propertyId) {
      incrementView();
    }
  }, [property._id]);

  return null;
};

export default PropertyView;
