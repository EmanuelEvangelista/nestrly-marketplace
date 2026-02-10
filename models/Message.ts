import { Schema, model, models, Model, InferSchemaType, Types } from "mongoose";

const messageSchema = new Schema(
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
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Obtenemos el tipo base
type MessageBaseType = InferSchemaType<typeof messageSchema>;

// Creamos un tipo que sea amigable con el Frontend (donde los IDs llegan como strings)
export type MessageType = Omit<
  MessageBaseType,
  "sender" | "recipient" | "property"
> & {
  _id: string; // InferSchemaType a veces no incluye el _id explícitamente como string
  sender: string | Types.ObjectId;
  recipient: string | Types.ObjectId;
  property: string | Types.ObjectId;
  createdAt: string; // Los timestamps llegan como ISO strings al cliente
  updatedAt: string;
};

const Message =
  (models.Message as Model<MessageType>) ||
  model<MessageType>("Message", messageSchema);

export default Message;
