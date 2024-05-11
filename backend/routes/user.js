import express from "express";
import { authorizeRoute } from "../middleware/authorize.js";

let userRouter = express.Router();

userRouter.get("/", authorizeRoute, async (req, res, next) => {
  res.json(req.user);
});

export default userRouter;
