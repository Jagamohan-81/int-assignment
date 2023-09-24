const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModal");
module.exports = {
  userAuthenticateMiddleware: (req, res, next) => {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ status: 5, message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ status: 5, message: "Token invalid or expired" });
      }
      if (decoded.role != "A") {
        return res.status(403).json({
          status: 5,
          message: "Not permitted to acces with this role",
        });
      }
      req.user = decoded;
      next();
    });
  },
};
