import React from "react";
import Hero from "@/components/Hero";
import { NextPage } from "next";
import InfoBoxes from "@/components/InfoBoxes";

const HomePage: NextPage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
    </>
  );
};

export default HomePage;
