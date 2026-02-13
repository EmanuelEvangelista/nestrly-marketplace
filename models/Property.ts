import { Schema, model, models, InferSchemaType } from "mongoose";

const propertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
    name: {
      type: String,
      required: [true, "Property name is required"],
    },
    type: {
      type: String,
      required: [true, "Property type is required"],
    },
    description: {
      type: String,
    },
    location: {
      street: { type: String, required: [true, "Street is required"] },
      city: { type: String, required: [true, "City is required"] },
      state: { type: String, required: [true, "State is required"] },
      zipCode: { type: String, required: [true, "Zip Code is required"] },
    },
    beds: { type: Number, required: [true, "Number of beds is required"] },
    baths: { type: Number, required: [true, "Number of baths is required"] },
    square_feet: { type: Number, required: [true, "Area is required"] },
    amenities: [{ type: String }],
    rates: {
      nightly: {
        type: Number,
        required: false,
        default: null,
      },
      weekly: {
        type: Number,
        required: false,
        default: null,
      },
      monthly: {
        type: Number,
        required: false,
        default: null,
      },
    },
    seller_info: {
      name: { type: String, required: [true, "Seller name is required"] },
      email: { type: String, required: [true, "Seller contact is required"] },
      phone: { type: String },
    },
    images: [{ type: String }],
    is_featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type PropertyFormData = Omit<
  PropertyType,
  | "_id"
  | "owner"
  | "is_featured"
  | "createdAt"
  | "updatedAt"
  | "images"
  | "beds"
  | "baths"
  | "square_feet"
  | "rates"
> & {
  images: File[];
  // Forzamos a que estos campos acepten string en el formulario
  beds: string | number;
  baths: string | number;
  square_feet: string | number;
  rates: {
    nightly: string | number;
    weekly: string | number;
    monthly: string | number;
  };
};

// Define TypeScript type for Property document
export type PropertyType = InferSchemaType<typeof propertySchema> & {
  _id: string;
};

const Property =
  models.Property || model<PropertyType>("Property", propertySchema);

export default Property;
