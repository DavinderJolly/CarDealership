import { Schema, model } from "mongoose";
import { hash as _hash, compare } from "bcrypt";

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
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

export default model("user", userSchema, "users");
