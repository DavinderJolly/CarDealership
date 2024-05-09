import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import createError from "http-errors";
import mongoose from "mongoose";
import logger from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";

import authRouter from "./routes/auth.js";
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";

dotenv.config();

let app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (err.status === 404) {
    res.status(err.status).send("Not Found");
  } else if (err.status >= 500) {
    res.status(err.status).send("Internal Server Error");
  } else {
    res.status(err.status || 500).send("Something went wrong");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`hosting on https://localhost:${PORT}`);
});
