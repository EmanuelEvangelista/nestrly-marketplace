import { Schema, model, models, Model, Document } from "mongoose";

export interface IUser {
  email: string;
  name: string;
  image?: string;
  bookmarks: Schema.Types.ObjectId[];
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: false,
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User = (models.User as Model<IUser>) || model<IUser>("User", userSchema);

export default User;
