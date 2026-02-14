import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaBath,
  FaBed,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";
import { PropertyType } from "@/models/Property";

interface PropertyCardProps {
  property: PropertyType;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const getRateDisplay = () => {
    const { rates } = property;

    if (rates?.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
    return "N/A";
  };

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative group">
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <Image
          src={property.images[0]}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* PRICE BADGE */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-indigo-600 font-bold shadow-sm">
          ${getRateDisplay()}
        </div>
      </div>

      <div className="p-5">
        {/* TITLE SECTION */}
        <div className="text-left md:text-center lg:text-left mb-5">
          <div className="text-gray-500 text-sm mb-1">{property.type}</div>

          <h3 className="text-xl font-semibold text-gray-800">
            {property.name}
          </h3>
        </div>

        {/* FEATURES */}
        <div className="flex justify-center gap-6 text-gray-600 mb-5 text-sm">
          <p className="flex items-center">
            <FaBed className="mr-2 text-indigo-500" />
            {property.beds}
            <span className="md:hidden lg:inline ml-1">Beds</span>
          </p>

          <p className="flex items-center">
            <FaBath className="mr-2 text-indigo-500" />
            {property.baths}
            <span className="md:hidden lg:inline ml-1">Baths</span>
          </p>

          <p className="flex items-center">
            <FaRulerCombined className="mr-2 text-indigo-500" />
            {property.square_feet}
            <span className="md:hidden lg:inline ml-1">sqft</span>
          </p>
        </div>

        {/* RATE TYPES */}
        <div className="flex justify-center gap-4 text-emerald-600 text-xs font-medium mb-5">
          {property.rates.nightly > 0 && (
            <p className="flex items-center">
              <FaMoneyBill className="mr-1" />
              Nightly
            </p>
          )}

          {property.rates.weekly > 0 && (
            <p className="flex items-center">
              <FaMoneyBill className="mr-1" />
              Weekly
            </p>
          )}

          {property.rates.monthly > 0 && (
            <p className="flex items-center">
              <FaMoneyBill className="mr-1" />
              Monthly
            </p>
          )}
        </div>

        <div className="border-t border-gray-100 mb-5"></div>

        {/* FOOTER */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <FaMapMarker className="text-indigo-500" />
            <span className="text-gray-600 text-sm">
              {property.location.city} {property.location.state}
            </span>
          </div>

          <Link
            href={`/properties/${property._id}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
