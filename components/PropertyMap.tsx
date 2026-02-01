"use client";

import React, { useEffect, useState } from "react";
import Map from "react-map-gl/maplibre";
import { Marker } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Spinner from "./Spinner";

// Definimos la interfaz para la propiedad
interface Property {
  location: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

interface PropertyMapProps {
  property: Property;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ property }) => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [geocodeError, setGeocodeError] = useState<boolean>(false);

  useEffect(() => {
    if (!property?.location) return;

    const fetchCoords = async () => {
      try {
        const { street, city, state, zipCode } = property.location;
        const address = `${street}, ${city}, ${state} ${zipCode}`;

        const res = await fetch(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
        );

        const data = await res.json();

        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          setLat(lat);
          setLng(lng);
          setGeocodeError(false);
        } else {
          setGeocodeError(true);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [property]);

  if (loading) return <Spinner loading={loading} />;

  if (geocodeError || lat === null || lng === null) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-500">
        No se pudo localizar la dirección en el mapa.
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-md">
      <Map
        mapLib={maplibregl}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 14,
        }}
        style={{ width: "100%", height: "100%" }}
        // Estilo predeterminado de MapLibre (Gratis y sin Key)
        mapStyle={`https://api.maptiler.com/maps/streets-v4/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image
            src={pin}
            alt="Ubicación de la propiedad"
            width={40}
            height={40}
            priority
          />
        </Marker>
      </Map>
    </div>
  );
};

export default PropertyMap;
