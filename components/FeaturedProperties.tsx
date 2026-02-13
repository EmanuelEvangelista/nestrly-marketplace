import { fetchProperties } from "@/utils/request";
import FeaturePropertyCard from "@/components/FeaturePropertyCard";
import Property from "@/models/Property";

const FeaturedProperties = async () => {
  const properties = await fetchProperties({
    showFeatured: true,
  });
  console.log(properties);

  return (
    properties.length > 0 && (
      <section className="relative px-6 pt-24 pb-28 bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-slate-800">Discover</span>{" "}
              <span className="text-indigo-600">Exceptional Homes</span>
            </h2>

            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Browse a curated collection of beautiful properties designed for
              comfort, style, and modern living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {properties.map((property) => (
              <FeaturePropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default FeaturedProperties;
