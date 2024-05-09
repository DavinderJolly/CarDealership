import express from "express";

let usersRouter = express.Router();

usersRouter.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

export default usersRouter;
