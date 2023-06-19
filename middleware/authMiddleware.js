const jwt = require("jsonwebtoken");
const Auth = require("../model/userSchema");

const protect = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    )
      throw new Error("user is not authorized");
    const _token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(_token, process.env.JWT_SECRET);
    if (decoded === null) throw new Error("Invalid authorization");
    if (!decoded.id) throw new Error("token not valid");

    const { id } = decoded;
    const authenticatedUser = await Auth.findById(id)
      .select("-__v")
      .select("-password");
    req.user = authenticatedUser;
    next();
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};
const protectAndAuthorize = (req, res, next) => {
  protect(req, res, () => {
    if (req.Auth.id === req.params.id || req.Auth.isAdmin) {
      next();
    } else {
      res
        .status(403)
        .json("You do not have AUTHORIZATION to perform this action.");
    }
  });
  next();
};

module.exports = { protect, protectAndAuthorize };
