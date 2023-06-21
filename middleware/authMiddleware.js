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
const protectAndAdmin = (req, res, next) => {
  protect(req, res, () => {
    if (!req.user.isAdmin) {
      res.status(403).send("you are not authorized to perform this action");
    } else {
      return next();
      // throw new Error("You do not have AUTHORIZATION to perform this action.");
    }
    // res
    //   .status(403)
    //   .json("You do not have AUTHORIZATION to perform this action.");
    // console.log(req.user);
  });
  // next();
};

module.exports = { protect, protectAndAdmin };
