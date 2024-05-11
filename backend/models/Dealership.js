import { Schema, model } from "mongoose";

const DealershipSchema = new Schema({
  dealership_email: { type: String, required: true, unique: true },
  dealership_name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cars: [{ type: Schema.Types.ObjectId, ref: "Car" }],
  deals: [{ type: Schema.Types.ObjectId, ref: "Deal" }],
  sold_vehicles: [{ type: Schema.Types.ObjectId, ref: "SoldVehicle" }],
});

DealershipSchema.pre("save", async function (next) {
  const dealership = this;
  if (!dealership.isModified("password")) return next();

  const saltRounds = 10;
  const hash = await _hash(dealership.password, saltRounds);
  dealership.password = hash;
  next();
});

DealershipSchema.methods.comparePassword = async function (candidatePassword) {
  return await compare(candidatePassword, this.password);
};

export const Dealership = model("Dealership", DealershipSchema);
