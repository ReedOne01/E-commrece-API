const bcrypt = require("bcryptjs");
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const { protectAndAdmin } = require("../middleware/authMiddleware");
const emailValidator = require("deep-email-validator");

async function isEmailValid(email) {
  return emailValidator.validate(email);
}

const generateToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const register = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword } = req.body;
    if (!email || !password || !fullname || !confirmPassword)
      throw new Error("please enter the necessary information");
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("user already exists");

    const { valid, reason, validators } = await isEmailValid(email);
    if (!valid)
      return res.status(400).send({
        message: " please enter a valid email address",
        reason: validators[reason].reason,
      });

    //The password has been hashed/encrypted from the userSchema

    // // hash password
    // const salt = await bcrypt.genSalt();
    // const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password,
      confirmPassword,
      fullname,
    });

    res.status(201).json({
      token: await generateToken(user._id),
      message: "user registered successfully",
      data: user,
    });
    console.log("hey there!, welcome to this project");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = await req.body;
    if (!email || !password)
      throw new Error("email or password cannot be empty");

    const user = await User.findOne({ email }).select("+password");
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!user || !comparePassword)
      throw new Error("incorrect email or password");

    res.status(200).json({
      status: "user login successfully",
      token: user.token,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.findOne((token) => {
      return token.token !== req.token;
    });
    // await req.User.save();
    // res.send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const logoutAll = async (req, res) => {
  try {
    req.User.tokens = [];
    await req.User.save();
    res.send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const allUser = async (req, res) => {
  const query = req.query.new;
  try {
    const user = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find().select("-password");
    res.status(200).json({
      Total: user.length,
      users: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userUpdate = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      message: "user updated successfully",
      data: userUpdate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteUser = async (req, res) => {
  if (!protectAndAdmin) throw new Error("you are not authorized to delete");
  const id = req.params.id;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.status(200).json("user deleted successfully");
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// To get the user stats from the DB
const stats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gt: lastYear } } },

      { $project: { month: { $month: "createdAt" } } },
      { $group: { _id: "$month", Total: { $sum: 1 } } },
    ]);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
  logout,
  logoutAll,
  getUser,
  allUser,
  updateUser,
  deleteUser,
  stats,
};
