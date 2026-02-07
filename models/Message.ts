import { Schema, model, models, Model, Types } from "mongoose";

export interface IMessage {
  sender: Types.ObjectId; // Referencia al usuario que envía
  recipient: Types.ObjectId; // Referencia al usuario que recibe
  property: Types.ObjectId; // Referencia a la propiedad en cuestión
  name: string;
  email: string;
  phone?: string; // Opcional con ? porque no tiene 'required: true'
  body?: string; // Opcional
  red: boolean;
  createdAt?: Date; // Añadido por timestamps: true
  updatedAt?: Date; // Añadido por timestamps: true
}

const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
    },
    body: {
      type: String,
    },
    red: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Message =
  (models.Message as Model<IMessage>) ||
  model<IMessage>("Message", messageSchema);

export default Message;
