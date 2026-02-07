import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "@/assets/styles/globals.css";
import { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/assets/styles/globals.css";

export const metadata: Metadata = {
  title: "Nestrly | Smart Property Insights & Listings",
  description: "Smart, data-driven insights for the real estate market",
  keywords: "rental, find rentals, find properties",
};

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <NavBar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
