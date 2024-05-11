import { Schema, model } from "mongoose";

const SoldVehicleSchema = new Schema({
  vehicle_id: { type: String, required: true, unique: true },
  car_id: { type: Schema.Types.ObjectId, ref: "Car", required: true },
  vehicle_info: Schema.Types.Mixed,
});

export const SoldVehicle = model("SoldVehicle", SoldVehicleSchema);
