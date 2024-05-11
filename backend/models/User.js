import { Schema, model } from "mongoose";
import { hash as _hash, compare } from "bcrypt";

const userSchema = new Schema({
  user_name: { type: String, required: true },
  user_email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vehicle_info: [{ type: Schema.Types.ObjectId, ref: "SoldVehicle" }],
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const saltRounds = 10;
  const hash = await _hash(user.password, saltRounds);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await compare(candidatePassword, this.password);
};

export const User = model("user", userSchema, "users");
