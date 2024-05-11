import { Schema, model } from "mongoose";

const CarSchema = new Schema({
  type: String,
  name: String,
  model: String,
});

export const Car = model("Car", CarSchema);
