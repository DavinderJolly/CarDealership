import jwt from "jsonwebtoken";

export function authorizeRoute(req, res, next) {
  const token = req.cookies.token;

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error(err);
      return res.sendStatus(403);
    }

    req.user = user;

    next();
  });
}
