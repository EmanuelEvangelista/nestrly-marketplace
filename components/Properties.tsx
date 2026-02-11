"use client";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { PropertyType } from "@/models/Property";

const Properties = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await fetch("/api/properties");

        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.log("Error fetching properties", error);
      } finally {
        setLoading(false);
      }
    };
    getProperties();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties;
