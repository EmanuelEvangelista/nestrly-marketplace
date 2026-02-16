"use client";
import { useEffect } from "react";
import { PropertyType } from "@/models/Property";

interface PropertyViewProps {
  property: PropertyType;
}

const PropertyView = ({ property }: PropertyViewProps) => {
  useEffect(() => {
    if (!property?._id) return;

    const propertyId = property._id.toString();

    const incrementView = async () => {
      try {
        const storageKey = "viewed_properties";

        const viewedProperties: string[] = JSON.parse(
          localStorage.getItem(storageKey) || "[]",
        );

        if (viewedProperties.includes(propertyId)) return;

        // Guardamos antes del fetch
        localStorage.setItem(
          storageKey,
          JSON.stringify([...viewedProperties, propertyId]),
        );

        const res = await fetch(`/api/properties/${propertyId}/view`, {
          method: "PATCH",
        });

        if (!res.ok) {
          console.error("Error updating view");
        }
      } catch (error) {
        console.error("Error al contar la vista:", error);
      }
    };

    incrementView();
  }, [property]);

  return null;
};

export default PropertyView;
