import * as mongoose from "mongoose";
import { model } from "mongoose";

const HotelSchema = new mongoose.Schema({
  img: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  guest: { type: Number, required: true },
  bedroom: { type: Number, required: true },
  bathroom: { type: Number, required: true },
  amneties: { type: [String], required: true },
  type: { type: String, required: true },
  status: { type: Number, required: true, default: 1 },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

export default model("hotels", HotelSchema);
