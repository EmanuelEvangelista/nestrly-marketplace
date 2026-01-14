export interface Property {
  _id: string;
  name: string;
  type: string;
  beds: number;
  baths: number;
  square_feet: number;
  images: string[];
  rates: { nightly?: number; weekly?: number; monthly?: number };
  location: { city: string; state: string };
}
