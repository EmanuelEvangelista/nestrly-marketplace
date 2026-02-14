import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";
import { fetchProperties } from "@/utils/request";
import { PropertyType } from "@/models/Property";

const HomeProperties = async () => {
  const data: any = await fetchProperties();

  const recentProperties = Array.isArray(data?.properties)
    ? [...data.properties].sort(() => 0.5 - Math.random()).slice(0, 3)
    : [];

  return (
    <>
      <section className="px-6 py-24 bg-gradient-to-b from-white via-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-slate-800">Latest</span>{" "}
              <span className="text-indigo-600">Listings</span>
            </h2>

            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Stay updated with the newest properties added to our platform.
              Fresh opportunities, ready for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentProperties.length === 0 ? (
              <p className="text-center text-slate-500 col-span-3">
                No properties available at the moment.
              </p>
            ) : (
              recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-lg mx-auto px-6">
          <Link
            href="/properties"
            className="block text-center py-4 px-8 rounded-2xl font-semibold
                 bg-indigo-600 text-white
                 hover:bg-indigo-700
                 transition-all duration-300
                 shadow-lg shadow-indigo-500/20"
          >
            Explore All Properties
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomeProperties;
