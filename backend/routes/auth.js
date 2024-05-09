import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username }, { password: 0 });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.cookie(
      "token",
      jwt.sign({ username }, ACCESS_TOKEN_SECRET, { expiresIn: "6000s" }),
      { httpOnly: true },
    );

    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.cookie(
      "token",
      jwt.sign({ username }, ACCESS_TOKEN_SECRET, { expiresIn: "6000s" }),
      { httpOnly: true },
    );

    res.status(200).json({ message: "Signin successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default authRouter;
