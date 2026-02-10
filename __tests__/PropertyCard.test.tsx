import { render, screen } from "@testing-library/react";
import PropertyCard from "@/components/PropertyCard";
import { PropertyType } from "@/models/Property";

const mockProperty: Partial<PropertyType> = {
  _id: "1",
  name: "Casa de Lujo",
  type: "House",
  location: {
    street: "Calle Falsa 123",
    city: "Miami",
    state: "FL",
    zipCode: "33101",
  },
  images: ["/image1.jpg", "/image2.jpg"],
  beds: 3,
  baths: 2,
  square_feet: 1500,
  rates: {
    monthly: 5000,
  },
};

test("debe mostrar el nombre y el tipo de la propiedad", () => {
  render(<PropertyCard property={mockProperty as PropertyType} />);

  expect(screen.getByText("Casa de Lujo")).toBeInTheDocument();
  expect(screen.getByText("House")).toBeInTheDocument();
});
