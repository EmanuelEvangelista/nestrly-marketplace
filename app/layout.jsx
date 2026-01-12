import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "@/assets/styles/globals.css";

export const metadata = {
  title: "Nestrly | Smart Property Insights & Listings",
  description: "Smart, data-driven insights for the real estate market",
  keyword: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <html lant="en">
      <body>
        <NavBar />
        <main>{children}</main>;
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
