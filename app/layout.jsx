import React from "react";
import "./../assets/styles/globals.css";

export const metadata = {
  title: "Nestrly | Smart Property Insights & Listings",
  description: "Smart, data-driven insights for the real estate market",
  keyword: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <html lant="en">
      <body>
        <div>{children}</div>;
      </body>
    </html>
  );
};

export default MainLayout;
