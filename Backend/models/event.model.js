import { model, Schema } from "mongoose";

const eventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  imageUrl: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const Event = model("Event", eventSchema);
