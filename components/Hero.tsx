import PropertySearchForm from "@/components/PropertySearchForm";

const Hero = () => {
  return (
    <section className="bg-[#0f172a] relative overflow-hidden py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Find Your Next
              <span className="block text-orange-500">Perfect Rental</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
              Discover the perfect property that fits your lifestyle and budget.
              Browse verified listings and move in with confidence.
            </p>
          </div>

          <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/10">
            <PropertySearchForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
