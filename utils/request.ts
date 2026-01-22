import { PropertyType } from "@/models/Property";

//Fetch all properties from the API
async function fetchProperties(): Promise<PropertyType[]> {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

  try {
    // Handle case where API domain is not defined
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

//Fetch a single property by ID from the API
async function fetchProperty(id: string): Promise<PropertyType | null> {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

  try {
    // Handle case where API domain is not defined
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
