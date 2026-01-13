import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "@/assets/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nestrly | Smart Property Insights & Listings",
  description: "Smart, data-driven insights for the real estate market",
  keywords: "rental, find rentals, find properties",
};

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
