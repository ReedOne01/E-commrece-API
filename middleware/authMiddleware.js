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
    console.log(authenticatedUser);
    next();
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

module.exports = { protect };
