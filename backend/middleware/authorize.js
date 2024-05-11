import jwt from "jsonwebtoken";

import { User, Dealership } from "../models/index.js";

export function authorizeRoute(req, res, next) {
  const token = req.cookies.token;

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
    if (err) {
      console.error(err);
      return res.sendStatus(403);
    }

    if (data.type === "user") {
      const userData = await User.findOne({ _id: data._id }, { password: 0 });
      req.user = userData;
    } else if (data.type === "dealership") {
      const dealershipData = await Dealership.findOne(
        { _id: data._id },
        { password: 0 }
      );
      req.dealership = dealershipData;
    }

    next();
  });
}
