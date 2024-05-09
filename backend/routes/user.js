import express from "express";
import { authorizeRoute } from "../middleware/authorize.js";
import User from "../models/User.js";

let userRouter = express.Router();

userRouter.get("/", authorizeRoute, async (req, res, next) => {
  const user = await User.findOne(
    { username: req.user.username },
    { password: 0 },
  );

  res.json(user);
});

userRouter.get("/:username", authorizeRoute, async (req, res, next) => {
  const user = await User.findOne(
    { username: req.params.username },
    { password: 0 },
  );

  res.json(user);
});

export default userRouter;
