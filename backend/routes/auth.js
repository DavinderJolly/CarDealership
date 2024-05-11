import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { Dealership, User } from "../models/index.js";

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const authRouter = express.Router();

authRouter.post("/signup_user", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne(
      { user_email: email },
      { password: 0 }
    );

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Account already exists with this email" });
    }

    const newUser = new User({ user_name: name, user_email: email, password });
    await newUser.save();

    res.cookie(
      "token",
      jwt.sign({ _id: newUser._id, type: "user" }, ACCESS_TOKEN_SECRET, {
        expiresIn: "6000s",
      }),
      { httpOnly: true }
    );

    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.post("/login_user", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ user_email: email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.cookie(
      "token",
      jwt.sign({ _id: user._id, type: "user" }, ACCESS_TOKEN_SECRET, {
        expiresIn: "6000s",
      }),
      { httpOnly: true }
    );

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.post("/signup_dealership", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingDealership = await Dealership.findOne(
      { dealership_email: email },
      { password: 0 }
    );

    if (existingDealership) {
      return res
        .status(400)
        .json({ message: "Account already exists with this email" });
    }

    const newDealership = new Dealership({
      dealership_name: name,
      dealership_email: email,
      password,
    });
    await newDealership.save();

    res.cookie(
      "token",
      jwt.sign(
        { _id: newDealership.id, type: "dealership" },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: "6000s",
        }
      ),
      { httpOnly: true }
    );

    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.post("/login_dealership", async (req, res) => {
  try {
    const { email, password } = req.body;
    const dealership = await Dealership.findOne({ dealership_email: email });

    if (!dealership) {
      return res
        .status(401)
        .json({ message: "Invalid dealership email or password" });
    }

    const isMatch = await dealership.comparePassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid dealership email or password" });
    }

    res.cookie(
      "token",
      jwt.sign(
        { _id: dealership._id, type: "dealership" },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: "6000s",
        }
      ),
      { httpOnly: true }
    );

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default authRouter;
