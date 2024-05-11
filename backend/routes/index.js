import express from "express";

let indexRouter = express.Router();

indexRouter.get("/", function (req, res, next) {
  res.render("index", { title: "Car Dealership Backend" });
});

export default indexRouter;
