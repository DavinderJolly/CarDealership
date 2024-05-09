import express from "express";
import { authorizeRoute } from "../middleware/authorize.js";
import User from "../models/User.js";

let usersRouter = express.Router();

usersRouter.get("/:username", authorizeRoute, async (req, res, next) => {
  const user = await User.findOne(
    { username: req.params.username },
    { password: 0 },
  );

  res.json(user);
});

export default usersRouter;
