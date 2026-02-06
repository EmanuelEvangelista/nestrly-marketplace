"use client";

import { useEffect, useState } from "react";
import Map from "react-map-gl/maplibre";
import { Marker, NavigationControl } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Spinner from "./Spinner";
import { PropertyType } from "@/models/Property";
import { GeolocateControl } from "react-map-gl/maplibre";

interface PropertyMapProps {
  property: PropertyType;
}

const PropertyMap = ({ property }: PropertyMapProps) => {
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
          const feature = data.features[0];

          // VALIDACIÓN ESTRICTA:
          // 1. Que tenga buena relevancia (ej. > 0.8)
          // 2. Que el tipo de lugar sea 'address' o 'poi' (Punto de interés/casa específica)
          // Si solo encuentra un 'country' o 'region', lo tomamos como error.
          const isExactAddress =
            feature.place_type.includes("address") ||
            feature.place_type.includes("poi");

          if (feature.relevance > 0.7 && isExactAddress) {
            const [foundLng, foundLat] = feature.center;
            setLat(foundLat);
            setLng(foundLng);
            setGeocodeError(false);
          } else {
            // Si encuentra algo genérico (como todo el país), forzamos el error
            setLat(null);
            setLng(null);
            setGeocodeError(true);
          }
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
        The address could not be located on the map.
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
        mapStyle={`https://api.maptiler.com/maps/streets-v4/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
      >
        <NavigationControl position="top-right" visualizePitch />

        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} alt="Location" width={40} height={40} priority />
        </Marker>
        <GeolocateControl position="top-right" trackUserLocation />
      </Map>
    </div>
  );
};

export default PropertyMap;
