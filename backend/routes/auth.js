import express from "express";
import User from "../models/User.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    // const existingUser = await User.findOne({ username });
    console.log(username);

    // if (existingUser) {
    //   return res.status(400).json({ message: "Username already exists" });
    // }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.post("/signin", async (req, res) => {
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

    res.status(200).json({ message: "Signin successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default authRouter;
