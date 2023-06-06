const jwt = require("jsonwebtoken");
const HttpError = require("../healpers/HttpError");

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  if (!authHeader) {
    next(HttpError(401, "Not autorization"));
  }

  const [bearer, token] = await authHeader.split(" ", 2);
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not autorization"));
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      next(HttpError(401, "Not autorization"));
    }
    req.userId = decoded;

    next();
  });
};

module.exports = checkAuth;
