import React from "react";
import InfoBox from "@/components/InfoBox";

const InfoBoxes = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0f172a] via-[#172554] to-[#1e1b4b]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InfoBox
            heading="Looking for a Place?"
            backgroundColor="bg-[#1e293b] border border-slate-600"
            buttonInfo={{
              text: "Explore Rentals",
              link: "/properties",
              backgroundColor: "bg-indigo-500 hover:bg-indigo-600 text-white",
            }}
          >
            <span className="text-slate-200">
              Discover modern apartments and homes that match your lifestyle.
              Compare options, save favorites, and connect directly with
              verified owners.
            </span>
          </InfoBox>

          <InfoBox
            heading="Own a Property?"
            backgroundColor="bg-[#1e293b] border border-slate-600"
            buttonInfo={{
              text: "List Your Property",
              link: "/properties/add",
              backgroundColor: "bg-cyan-500 hover:bg-cyan-600 text-black",
            }}
          >
            <span className="text-slate-200">
              Start earning from your property today. Publish your listing in
              minutes and reach serious tenants actively searching for their
              next home.
            </span>
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
